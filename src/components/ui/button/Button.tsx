import React, { memo, useState } from 'react';
import useCurentTheme from '@/globalHooks/useCurentThem';
import s from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  text: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent|React.FormEvent) => void;
  className?: string;
  iconPosition?: 'left' | 'right';
}

const Button = ({
  style, 
  iconPosition = 'left', 
  size = 'md',
  text, 
  icon, 
  disabled, 
  onClick, 
  className, 
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { color: bgColor, darkenedColor } = useCurentTheme();
  const disabledFilterColor = '#aaa';
  const color = disabled ? disabledFilterColor : undefined;

  const sizeClasses = {
    sm: s['button-sm'],
    md: s['button-md'],
    lg: s['button-lg']
  };

  return (
    <button 
      {...props}
      onClick={onClick}
      className={`
        ${s['copy-url-button']} 
        ${sizeClasses[size]} 
        ${className || ''}
      `}
      style={{
        background: disabled 
          ? color 
          : (isHovered ? darkenedColor : bgColor),
        ...style,
      }}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconPosition === 'left' && icon}
      <span className={s['button-text']}>{text}</span>
      {iconPosition === 'right' && icon}
    </button>
  );
}

export default memo(Button);