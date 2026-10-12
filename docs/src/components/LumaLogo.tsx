import React from 'react';

interface LumaLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LumaLogo: React.FC<LumaLogoProps> = ({
  size = 36,
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <defs>
        <linearGradient id="lumaBgGradComp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9C82E8" />
          <stop offset="100%" stopColor="#7654C8" />
        </linearGradient>

        <filter id="lumaShadowComp" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4F378B" floodOpacity="0.32" />
        </filter>

        <path id="lumaLetterLComp" d="M 37 31 L 46 31 L 46 60 L 63 60 L 63 69 L 37 69 Z" />
      </defs>

      {/* Squircle Background */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="22"
        ry="22"
        fill="url(#lumaBgGradComp)"
        filter="url(#lumaShadowComp)"
      />

      {/* Cyan Offset (Left) */}
      <use href="#lumaLetterLComp" x="-1.8" y="0" fill="#00E5FF" opacity="0.9" />

      {/* Magenta Offset (Right) */}
      <use href="#lumaLetterLComp" x="1.8" y="0" fill="#FF3366" opacity="0.85" />

      {/* White Base Letter L */}
      <use href="#lumaLetterLComp" x="0" y="0" fill="#FFFFFF" />
    </svg>
  );
};
