import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../context/MotionContext';

export const YarnCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or if reduced motion is enabled
    if (
      reducedMotion ||
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Points array for the yarn trail
    const points: { x: number; y: number; age: number }[] = [];
    const maxPoints = 28;
    let mouse = { x: width / 2, y: height / 2, moved: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;

      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.length > maxPoints) {
        points.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (points.length > 2 && mouse.moved) {
        // Draw yarn strand with soft organic fiber texture
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.strokeStyle = 'rgba(61, 43, 31, 0.22)';
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Subtle fiber halo
        ctx.strokeStyle = 'rgba(212, 163, 115, 0.15)';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Increment age and fade out tail
        for (let i = 0; i < points.length; i++) {
          points[i].age++;
        }
      }

      // Small yarn bead at mouse position
      if (mouse.moved) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#3D2B1F';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(61, 43, 31, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 hidden md:block"
      aria-hidden="true"
    />
  );
};
