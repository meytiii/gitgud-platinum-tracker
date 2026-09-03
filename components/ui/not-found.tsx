'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowButton } from './flow-button';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const numberVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
    y: 15,
    rotate: direction * 5
  }),
  visible: {
    opacity: 0.9,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const ghostVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    y: 15,
    rotate: -5
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.1,
    y: -10,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      rotate: {
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  },
  floating: {
    y: [-6, 6],
    transition: {
      y: {
        duration: 2.2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }
};

export interface NotFoundProps {
  homeHref?: string;
  onExplainClick?: () => void;
  className?: string;
}

export function NotFound({
  homeHref = '/',
  onExplainClick,
  className = ''
}: NotFoundProps) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg-base,#0c0b0a)] text-[var(--text-primary,#f0eae1)] selection:bg-[var(--accent)] selection:text-[var(--bg-base)] ${className}`}
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(22, 20, 18, 0.9) 0%, var(--bg-base, #0c0b0a) 85%)'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="text-center max-w-xl mx-auto flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 md:mb-12">
            <motion.span
              className="text-[80px] md:text-[130px] font-bold font-serif text-[var(--accent,#d4a359)] select-none leading-none drop-shadow-[0_0_30px_var(--accent-glow-subtle,rgba(212,163,89,0.2))]"
              variants={numberVariants}
              custom={-1}
            >
              4
            </motion.span>

            <motion.div
              variants={ghostVariants}
              whileHover="hover"
              animate={['visible', 'floating']}
              className="relative cursor-pointer"
            >
              <Image
                src="https://cdn.21st.dev/assets/mirror/88/8848c4fd858052c49c5a5d7267489c02b021c6cf3e31bfec02787e16f1ab7d0e.png"
                alt="Ghost"
                width={130}
                height={130}
                className="w-[84px] h-[84px] md:w-[130px] md:h-[130px] object-contain select-none filter drop-shadow-[0_0_20px_var(--accent-glow-subtle,rgba(212,163,89,0.25))]"
                draggable="false"
                priority
              />
            </motion.div>

            <motion.span
              className="text-[80px] md:text-[130px] font-bold font-serif text-[var(--accent,#d4a359)] select-none leading-none drop-shadow-[0_0_30px_var(--accent-glow-subtle,rgba(212,163,89,0.2))]"
              variants={numberVariants}
              custom={1}
            >
              4
            </motion.span>
          </div>

          <motion.h1
            className="text-3xl md:text-5xl font-bold font-serif text-[var(--text-heading,#fdfbf7)] mb-4 md:mb-6 select-none tracking-wide"
            variants={itemVariants}
          >
            Boo! Page missing!
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-[var(--text-secondary,#c4b9aa)] mb-8 md:mb-12 select-none max-w-md font-sans leading-relaxed"
            variants={itemVariants}
          >
            Whoops! This page must be a ghost - it&apos;s not here!
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.04,
              transition: {
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
          >
            <Link href={homeHref} className="inline-block">
              <FlowButton text="Find shelter" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 md:mt-12"
            variants={itemVariants}
          >
            {onExplainClick ? (
              <button
                type="button"
                onClick={onExplainClick}
                className="text-sm text-[var(--text-muted,#8a7e72)] hover:text-[var(--accent,#d4a359)] transition-colors underline underline-offset-4 select-none cursor-pointer bg-transparent border-0"
              >
                What means 404?
              </button>
            ) : (
              <Link
                href="#what-means-404"
                className="text-sm text-[var(--text-muted,#8a7e72)] hover:text-[var(--accent,#d4a359)] transition-colors underline underline-offset-4 select-none"
              >
                What means 404?
              </Link>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default NotFound;
