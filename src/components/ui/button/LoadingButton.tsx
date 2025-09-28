import React, { memo, useState } from 'react';
import useCurrentTheme from '@/globalHooks/useCurentThem';
import s from './loadingButton.module.scss';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties; 
  text: string; 
  size?: number; 
  icon?: any; 
  loading?: boolean; // New prop for loading state
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconPosition?: 'left' | 'right';
};

const LoadingButton = ({style, iconPosition = 'left', size: fontSize, text, icon, loading = false, disabled, onClick, className, ...props}: LoadingButtonProps) => {

  const [isHovered, setIsHovered] = useState(false);

  const { color: bgColor, darkenedColor } = useCurrentTheme();

  const disabledFilterColor = '#aaa';

  // Determine the color based on the disabled or loading state
  const color = disabled || loading ? disabledFilterColor : undefined;

  return (
    <button 
      {...props} 
      onClick={onClick} 
      className={`${s['copy-url-button']} ${loading ? s['loading'] : ''} ${className}`} 
      style={{
        ...style,
        background: color || (isHovered ? darkenedColor : bgColor),
        cursor: loading ? 'not-allowed' : 'pointer',
      }} 
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {iconPosition === 'left' ? icon : null}
      <span style={{fontSize, color: 'white', whiteSpace: 'nowrap'}}>{text}</span>
      {iconPosition === 'right' ? icon : null}
    </button>
  );
}

export default memo(LoadingButton);