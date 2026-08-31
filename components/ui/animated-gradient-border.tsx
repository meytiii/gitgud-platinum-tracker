import React, { CSSProperties, ReactNode, HTMLAttributes } from 'react';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: string;
 
  // Animation customization
  animationMode?: AnimationMode;
  animationSpeed?: number; // Duration in seconds
 
  // Color customization
  gradientColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor?: string;
 
  // Border customization
  borderWidth?: number;
  borderRadius?: number;
 
  // Container styling
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#584827',
  secondary: '#c7a03c',
  accent: '#f9de90'
};

const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = '#2d230f',
  borderWidth = 2,
  borderRadius = 20,
  style = {},
  ...props
}) => {
  // Get animation class based on mode
  const getAnimationClass = () => {
    switch (animationMode) {
      case 'auto-rotate':
        return 'gradient-border-auto';
      case 'rotate-on-hover':
        return 'gradient-border-hover';
      case 'stop-rotate-on-hover':
        return 'gradient-border-stop-hover';
      default:
        return '';
    }
  };
 
  const combinedStyle: CSSProperties = {
    '--gradient-primary': gradientColors.primary,
    '--gradient-secondary': gradientColors.secondary,
    '--gradient-accent': gradientColors.accent,
    '--bg-color': backgroundColor,
    '--border-width': `${borderWidth}px`,
    '--border-radius': `${borderRadius}px`,
    '--animation-duration': `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 30%,
        ${gradientColors.secondary} 33%,
        ${gradientColors.primary} 40%,
        ${gradientColors.primary} 50%,
        ${gradientColors.secondary} 77%,
        ${gradientColors.accent} 80%,
        ${gradientColors.secondary} 83%,
        ${gradientColors.primary} 90%
      )
    `,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    ...style,
  } as CSSProperties;
 
  return (
    <div
      className={`gradient-border-component ${getAnimationClass()} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export { BorderRotate };
