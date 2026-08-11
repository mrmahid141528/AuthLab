"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface InteractiveCatProps {
    isCoveringEyes: boolean;
}

export function InteractiveCat({ isCoveringEyes }: InteractiveCatProps) {
    // We use Framer Motion's motion values for smooth mouse tracking over the SVG
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs on the mouse values
    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Map mouse position to pupil offset bounds
    const pupilX = useTransform(smoothX, [-1, 1], [-5, 5]);
    const pupilY = useTransform(smoothY, [-1, 1], [-3, 3]);

    // Track head rotation slightly
    const headRotate = useTransform(smoothX, [-1, 1], [-3, 3]);

    // Make ears twitch slightly on hover
    const earsTwitch = useTransform(smoothX, [-1, 1], [-2, 2]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize from -1 to 1 based on window size
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="relative w-32 h-32 mx-auto mb-[-8px] flex flex-col items-center justify-end pointer-events-none select-none z-30">

            {/* Cat Base */}
            <motion.div
                className="w-28 h-28 relative"
                style={{ rotate: headRotate }}
            >
                {/* Head & Ears SVG Background */}
                <svg className="w-full h-full text-white/90 drop-shadow-xl" viewBox="0 0 100 100" fill="currentColor">
                    {/* Ears */}
                    <motion.polygon points="15,40 10,5 40,25" style={{ rotate: earsTwitch, transformOrigin: '20px 30px' }} />
                    <motion.polygon points="85,40 90,5 60,25" style={{ rotate: earsTwitch, transformOrigin: '80px 30px' }} />
                    {/* Outer Head */}
                    <ellipse cx="50" cy="50" rx="42" ry="32" />
                </svg>

                {/* Facial Features Layer */}
                <div className="absolute inset-0 z-10 text-black">
                    {/* Left Eye Whites */}
                    <div className="absolute top-[38%] left-[24%] w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center overflow-hidden border-[1.5px] border-black/80">
                        <motion.div
                            className="w-[8px] h-[8px] bg-black rounded-full"
                            style={{ x: pupilX, y: pupilY }}
                            animate={{ scale: isCoveringEyes ? 0.3 : 1 }}
                        />
                    </div>

                    {/* Right Eye Whites */}
                    <div className="absolute top-[38%] right-[24%] w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center overflow-hidden border-[1.5px] border-black/80">
                        <motion.div
                            className="w-[8px] h-[8px] bg-black rounded-full"
                            style={{ x: pupilX, y: pupilY }}
                            animate={{ scale: isCoveringEyes ? 0.3 : 1 }}
                        />
                    </div>

                    {/* Nose */}
                    <svg className="absolute top-[58%] left-[50%] -translate-x-[50%] w-4 h-3 text-black/80" viewBox="0 0 10 10" fill="currentColor">
                        <polygon points="1,2 9,2 5,8" />
                    </svg>

                    {/* Mouth */}
                    <svg className="absolute top-[67%] left-[50%] -translate-x-[50%] w-6 h-3 text-black/80" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M 1,1 Q 5,8 10,1 Q 15,8 19,1" />
                    </svg>

                    {/* Whiskers */}
                    <div className="absolute top-[52%] left-[-2%] w-8 h-4 opacity-30 space-y-1">
                        <div className="w-[110%] h-[1px] bg-black rotate-[-10deg]"></div>
                        <div className="w-[120%] h-[1px] bg-black"></div>
                        <div className="w-[105%] h-[1px] bg-black rotate-[10deg]"></div>
                    </div>
                    <div className="absolute top-[52%] right-[-10%] w-8 h-4 opacity-30 space-y-1">
                        <div className="w-[105%] h-[1px] bg-black rotate-[10deg]"></div>
                        <div className="w-[120%] h-[1px] bg-black"></div>
                        <div className="w-[110%] h-[1px] bg-black rotate-[-10deg]"></div>
                    </div>
                </div>

            </motion.div>

            {/* Covering Paws */}
            <motion.div
                className="absolute w-full h-full inset-0 z-20 flex justify-center items-center gap-2"
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: isCoveringEyes ? -5 : 90, opacity: isCoveringEyes ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
                {/* Left Paw */}
                <div className="w-11 h-11 bg-white shadow-[0_-2px_15px_rgba(0,0,0,0.15)] rounded-full border border-black/10 flex items-end justify-center pb-2.5 overflow-hidden">
                    <div className="flex gap-[4px] h-3.5 opacity-20 relative top-1">
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                    </div>
                </div>

                {/* Right Paw */}
                <div className="w-11 h-11 bg-white shadow-[0_-2px_15px_rgba(0,0,0,0.15)] rounded-full border border-black/10 flex items-end justify-center pb-2.5 overflow-hidden">
                    <div className="flex gap-[4px] h-3.5 opacity-20 relative top-1">
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                        <div className="w-[2px] h-full bg-black rounded-full"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
