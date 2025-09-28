import React, { memo } from 'react';
import s from './borderedbutton.module.scss';
import useCurentTheme from '@/globalHooks/useCurentThem';

interface BorderedButtonProps {
  style?: React.CSSProperties;
  text: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e?: any) => void;
  iconLeftPrRight?: 'left' | 'right'; 
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BorderedButton: React.FC<BorderedButtonProps> = ({ style, text, icon, disabled, onClick, iconLeftPrRight = 'left', ...props  }) => {
  const {color: bgColor, darkenedColor} = useCurentTheme();
  const disabledFilterColor = '#aaa';
  const color = disabled ? disabledFilterColor : undefined;

  const someStyle = {
    color, 
    borderColor: disabled ? color : style?.color,
    "--background": bgColor,
    ...style
  }

  const lIcon = iconLeftPrRight === 'left' ? icon : null;
  const rIcon = iconLeftPrRight === "right" ? icon : null;

  return (
    <button
      className={s['copy-url-button']}
      style={ someStyle}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >

      {lIcon || props.leftIcon } 
        <span >{ text }</span>
      {rIcon || props.rightIcon}

    </button>
  );
};

export default memo(BorderedButton);
