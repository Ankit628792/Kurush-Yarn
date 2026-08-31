import React, { useEffect, useRef } from 'react';

interface FiberCanvasProps {
  stage: number; // 0 to 4 (Yarn, Fiber, Pattern, Structure, Form)
}

export const FiberCanvas: React.FC<FiberCanvasProps> = ({ stage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let frameId: number | null = null;
    let time = 0;

    const drawStage = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      if (stage === 0) {
        // Stage 0: YARN - Single continuous undulating wavy yarn strand
        ctx.beginPath();
        ctx.moveTo(0, centerY);

        for (let x = 0; x < width; x += 5) {
          const y =
            centerY +
            Math.sin(x * 0.015 + currentTime * 1.5) * 45 +
            Math.cos(x * 0.03 - currentTime) * 15;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = '#3D2B1F';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Fluffy fiber halo
        ctx.strokeStyle = 'rgba(212, 163, 115, 0.25)';
        ctx.lineWidth = 12;
        ctx.stroke();
      } else if (stage === 1) {
        // Stage 1: FIBER - Multiple organic filament strands interweaving
        const strandCount = 12;
        for (let i = 0; i < strandCount; i++) {
          ctx.beginPath();
          const offset = (i - strandCount / 2) * 18;
          ctx.moveTo(0, centerY + offset);

          for (let x = 0; x < width; x += 8) {
            const y =
              centerY +
              offset +
              Math.sin(x * 0.02 + currentTime * 2 + i * 0.5) * 30 +
              Math.cos(x * 0.01 - currentTime + i) * 15;
            ctx.lineTo(x, y);
          }

          ctx.strokeStyle =
            i % 2 === 0 ? 'rgba(61, 43, 31, 0.45)' : 'rgba(212, 163, 115, 0.4)';
          ctx.lineWidth = 2.2;
          ctx.stroke();
        }
      } else if (stage === 2) {
        // Stage 2: PATTERN - Repeating geometric crochet loops & stitches
        const cols = 8;
        const rows = 6;
        const spacingX = width / (cols + 1);
        const spacingY = height / (rows + 1);

        ctx.strokeStyle = '#3D2B1F';
        ctx.lineWidth = 2;

        for (let r = 1; r <= rows; r++) {
          ctx.beginPath();
          for (let c = 1; c <= cols; c++) {
            const x = c * spacingX;
            const y = r * spacingY + Math.sin(c * 0.5 + currentTime + r) * 8;
            ctx.arc(x, y, 14, 0, Math.PI * 1.6);
          }
          ctx.stroke();
        }
      } else if (stage === 3) {
        // Stage 3: STRUCTURE - 3D self-supporting interconnected mesh dome
        const rings = 7;
        const pointsPerRing = 16;

        for (let r = 1; r <= rings; r++) {
          const radius = r * 22 + Math.sin(currentTime + r) * 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(61, 43, 31, ${0.15 + (r / rings) * 0.5})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Interconnecting radial tension spokes
          for (let p = 0; p < pointsPerRing; p++) {
            const angle = (p / pointsPerRing) * Math.PI * 2 + currentTime * 0.2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#D4A373';
            ctx.fill();
          }
        }
      } else {
        // Stage 4: FORM - Completed floral / spherical harmonic sculpture
        const petals = 8;
        const maxRadius = Math.min(width, height) * 0.38;

        ctx.save();
        ctx.translate(centerX, centerY);

        for (let i = 0; i < petals; i++) {
          ctx.rotate((Math.PI * 2) / petals);

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            maxRadius * 0.4,
            -maxRadius * 0.35 + Math.sin(currentTime) * 4,
            maxRadius * 0.7,
            -maxRadius * 0.25,
            maxRadius + Math.sin(currentTime + i) * 6,
            0
          );
          ctx.bezierCurveTo(
            maxRadius * 0.7,
            maxRadius * 0.25,
            maxRadius * 0.4,
            maxRadius * 0.35 - Math.sin(currentTime) * 4,
            0,
            0
          );

          ctx.fillStyle =
            i % 2 === 0 ? 'rgba(61, 43, 31, 0.22)' : 'rgba(212, 163, 115, 0.25)';
          ctx.fill();
          ctx.strokeStyle = '#3D2B1F';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Center spiral core
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#3D2B1F';
        ctx.fill();

        ctx.restore();
      }
    };

    const render = () => {
      time += 0.015;
      drawStage(time);
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [stage]);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#F7F5F2] rounded-3xl overflow-hidden border border-[#3D2B1F]/15">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
