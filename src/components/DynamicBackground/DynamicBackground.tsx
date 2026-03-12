import React, { useEffect, useRef } from 'react';
import './DynamicBackground.css';

const DynamicBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let w: number, h: number;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        // Maximum density wave properties - very clear and distributed
        const waves = [
            { amplitude: 70, period: 0.004, phase: 0, speed: 0.008, color: 'rgba(0, 160, 176, 0.12)', yOffset: 0.1 },
            { amplitude: 90, period: 0.003, phase: 1, speed: 0.006, color: 'rgba(0, 212, 231, 0.1)', yOffset: 0.25 },
            { amplitude: 110, period: 0.002, phase: 2, speed: 0.004, color: 'rgba(0, 160, 176, 0.08)', yOffset: 0.4 },
            { amplitude: 80, period: 0.005, phase: 3, speed: 0.009, color: 'rgba(0, 137, 155, 0.12)', yOffset: 0.55 },
            { amplitude: 60, period: 0.006, phase: 4, speed: 0.012, color: 'rgba(0, 160, 176, 0.1)', yOffset: 0.7 },
            { amplitude: 100, period: 0.0035, phase: 5, speed: 0.007, color: 'rgba(0, 212, 231, 0.08)', yOffset: 0.85 },
            { amplitude: 50, period: 0.007, phase: 6, speed: 0.01, color: 'rgba(0, 160, 176, 0.12)', yOffset: 0.15 },
            { amplitude: 120, period: 0.0025, phase: 7, speed: 0.005, color: 'rgba(0, 212, 231, 0.06)', yOffset: 0.45 },
            { amplitude: 85, period: 0.0045, phase: 8, speed: 0.008, color: 'rgba(0, 137, 155, 0.1)', yOffset: 0.75 },
            { amplitude: 95, period: 0.003, phase: 9, speed: 0.006, color: 'rgba(0, 160, 176, 0.09)', yOffset: 0.95 },
        ];

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 1.2; // Back to a delicate thin look

                for (let x = 0; x < w; x += 2) {
                    // Distributed across the vertical axis using yOffset
                    const y = (h * wave.yOffset) + Math.sin(x * wave.period + wave.phase) * wave.amplitude;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.stroke();
                wave.phase += wave.speed;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="dynamic-bg-wrapper">
            <canvas ref={canvasRef} className="waves-canvas" />
            <div className="noise-overlay"></div>
        </div>
    );
};

export default DynamicBackground;
