import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glareColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  id,
  glareColor = "rgba(245, 158, 11, 0.1)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values to keep tracking fast and fluent without triggering heavy React re-renders
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Springs for silky physics damping, eliminating jerky changes
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 180, damping: 20 });
  const scale = useSpring(1, { stiffness: 180, damping: 25 });

  // Mouse position-dependent gradient highlights
  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), { stiffness: 150, damping: 25 });
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse coordinates relative to the card dimensions (between 0 and 1)
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    scale.set(1.03); // Warm pop in
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
    scale.set(1); // Normal state
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale,
      }}
      className={`relative overflow-hidden cursor-pointer rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-6 shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* 3D reflection highlight overlay */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 z-10"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Actual elements nested in 3D scale container */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full relative z-20">
        {children}
      </div>
    </motion.div>
  );
}
