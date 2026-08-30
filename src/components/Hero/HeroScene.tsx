import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../context/MotionContext';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglError, setWebglError] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationId: number | null = null;
    const yarnStrands: THREE.Mesh[] = [];
    const particlesGroup = new THREE.Group();

    try {
      scene = new THREE.Scene();
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      container.appendChild(renderer.domElement);

      // Lighting matching the brand palette
      const ambientLight = new THREE.AmbientLight(0xfdfcfb, 1.4);
      scene.add(ambientLight);

      const warmDirLight = new THREE.DirectionalLight(0xffffff, 1.8);
      warmDirLight.position.set(5, 8, 5);
      scene.add(warmDirLight);

      const subtleFillLight = new THREE.DirectionalLight(0x3d2b1f, 0.9);
      subtleFillLight.position.set(-6, -4, 3);
      scene.add(subtleFillLight);

      // Create procedural organic 3D floating Yarn Curves
      const yarnColors = [0x3d2b1f, 0x8c5e45, 0xd4a373, 0xa67c52, 0xc29b8c];

      for (let i = 0; i < 7; i++) {
        const points: THREE.Vector3[] = [];
        const numPoints = 8;
        const radius = 3.5 + (i % 3) * 0.8;
        const yOffset = (i - 3) * 1.1;

        for (let j = 0; j < numPoints; j++) {
          const theta = (j / numPoints) * Math.PI * 2 + (i * Math.PI) / 3;
          const x = Math.cos(theta) * radius + Math.sin(j + i) * 0.6;
          const y = yOffset + Math.sin(theta * 2 + i) * 1.4;
          const z = Math.sin(theta) * radius + Math.cos(j * 0.8) * 0.8;
          points.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(points, true);
        const geometry = new THREE.TubeGeometry(curve, 70, 0.08 + (i % 2) * 0.03, 8, true);

        const material = new THREE.MeshStandardMaterial({
          color: yarnColors[i % yarnColors.length],
          roughness: 0.85,
          metalness: 0.05,
          transparent: true,
          opacity: 0.85
        });

        const strand = new THREE.Mesh(geometry, material);
        strand.userData = {
          rotationSpeedX: (0.5 - (i % 2)) * 0.0015,
          rotationSpeedY: 0.0012 + (i % 3) * 0.0006,
          rotationSpeedZ: (0.5 - (i % 3)) * 0.0008
        };

        yarnStrands.push(strand);
        scene.add(strand);
      }

      // Add delicate floating fiber dust particles
      const particleCount = reducedMotion ? 20 : 45;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = ((i * 17) % 20) - 10;
        positions[i + 1] = ((i * 23) % 16) - 8;
        positions[i + 2] = ((i * 31) % 12) - 6;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x8c5e45,
        size: 0.08,
        transparent: true,
        opacity: 0.35
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      particlesGroup.add(particleSystem);
      scene.add(particlesGroup);

      // Mouse Parallax variables
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        if (reducedMotion) return;
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      if (!reducedMotion) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      // Resize observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            if (reducedMotion) {
              renderer.render(scene, camera);
            }
          }
        }
      });

      resizeObserver.observe(container);

      // Initial static render
      renderer.render(scene, camera);

      // If reduced motion is NOT requested, run continuous gentle loop
      if (!reducedMotion) {
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Smooth mouse damping
          targetX += (mouseX * 1.2 - targetX) * 0.04;
          targetY += (mouseY * 1.0 - targetY) * 0.04;

          camera.position.x = targetX;
          camera.position.y = targetY;
          camera.lookAt(0, 0, 0);

          // Rotate yarn loops
          yarnStrands.forEach((strand) => {
            strand.rotation.x += strand.userData.rotationSpeedX;
            strand.rotation.y += strand.userData.rotationSpeedY;
            strand.rotation.z += strand.userData.rotationSpeedZ;
          });

          // Drift particles
          particlesGroup.rotation.y += 0.0004;

          renderer.render(scene, camera);
        };

        animate();
      }

      return () => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener('mousemove', handleMouseMove);
        resizeObserver.disconnect();

        // Three.js resource cleanup
        yarnStrands.forEach((strand) => {
          strand.geometry.dispose();
          if (Array.isArray(strand.material)) {
            strand.material.forEach((m) => m.dispose());
          } else {
            strand.material.dispose();
          }
        });

        particleGeo.dispose();
        particleMat.dispose();

        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn('WebGL initialization fallback activated:', err);
      setWebglError(true);
    }
  }, [reducedMotion]);

  if (webglError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCFB] via-[#F7F5F2]/40 to-[#FDFCFB] pointer-events-none" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
