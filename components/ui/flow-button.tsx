'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FlowButton({
  text = 'Modern Button',
  children,
  className = '',
  ...props
}: FlowButtonProps) {
  const content = children || text;

  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-full border-[1.5px] border-[var(--accent-border,rgba(212,163,89,0.35))] bg-[var(--card-surface,#1c1916)] px-8 py-3 text-sm font-semibold tracking-wide text-[var(--accent,#d4a359)] cursor-pointer shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[var(--accent,#d4a359)] hover:text-[var(--bg-base,#0c0b0a)] hover:rounded-[14px] hover:shadow-[0_0_20px_var(--accent-glow,rgba(212,163,89,0.4))] active:scale-[0.95] ${className}`}
      {...props}
    >
      <ArrowRight
        className="absolute w-4 h-4 left-[-25%] fill-none z-[9] text-[var(--accent,#d4a359)] group-hover:left-4 group-hover:text-[var(--bg-base,#0c0b0a)] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        aria-hidden="true"
      />

      <span className="relative z-[1] -translate-x-3 font-serif uppercase tracking-wider group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {content}
      </span>

      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--accent,#d4a359)] opacity-0 group-hover:w-[260px] group-hover:h-[260px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        aria-hidden="true"
      />

      <ArrowRight
        className="absolute w-4 h-4 right-4 fill-none z-[9] text-[var(--accent,#d4a359)] group-hover:right-[-25%] group-hover:text-[var(--bg-base,#0c0b0a)] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        aria-hidden="true"
      />
    </button>
  );
}

export default FlowButton;
