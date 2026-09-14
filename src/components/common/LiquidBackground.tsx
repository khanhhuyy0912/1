import React from 'react';
import { motion } from 'motion/react';

export const LiquidBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none motion-reduce:hidden"
    >
      {/* Background base tone */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-zinc-950 transition-colors duration-500" />

      {/* Floating Fluid Orb 1 - Violet/Indigo top right */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -right-32 w-[280px] h-[280px] sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-pink-500/15 dark:from-indigo-600/25 dark:via-purple-700/20 dark:to-transparent blur-[50px] sm:blur-[120px]"
      />

      {/* Floating Fluid Orb 2 - Sky/Cyan center left */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -left-40 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-sky-400/25 via-teal-400/15 to-indigo-400/20 dark:from-sky-500/20 dark:via-cyan-600/15 dark:to-transparent blur-[55px] sm:blur-[130px]"
      />

      {/* Floating Fluid Orb 3 - Rose/Fuchsia bottom right (desktop only: 4 simultaneous blurred layers is too heavy for mobile GPUs) */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden sm:block absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-pink-400/20 via-indigo-500/15 to-purple-400/15 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-transparent blur-[120px]"
      />

      {/* Floating Fluid Orb 4 - Emerald/Teal bottom left (desktop only) */}
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden sm:block absolute -bottom-32 left-1/3 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-teal-400/15 via-sky-400/15 to-indigo-400/10 dark:from-emerald-950/20 dark:via-sky-950/20 dark:to-transparent blur-[130px]"
      />

      {/* Subtle iridescent noise/grid shimmer (optional high-tech iOS feel) */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  );
};
