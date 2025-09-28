import { useState, type ReactNode } from 'react';
import styles from './ToolTip.module.scss';
import useCurrentTheme from '@/globalHooks/useCurentThem';
import ExclamationIcon from '@/assets/ExclamationIcon';

// Define icon options and themes
export type IconType = 'info' | 'help' | 'alert' | 'success' | 'error';
export type PositionType = 'top' | 'right' | 'bottom' | 'left';
export type ThemeType = 'default' | 'info' | 'success' | 'warning' | 'error';


const HelpIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const AlertIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const SuccessIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ErrorIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

// Props interface
interface ToolTipProps {
  message: string | ReactNode;
  icon?: IconType;
  position?: PositionType;
  theme?: ThemeType;
  className?: string;
  iconSize?: number;
  showOnClick?: boolean;
  alwaysVisible?: boolean;
}

const ToolTip: React.FC<ToolTipProps> = ({
  message,
  icon = 'info',
  position = 'top',
  theme = 'default',
  className = '',
  iconSize = 16,
  showOnClick = true,
  alwaysVisible = false
}) => {

  const { color } = useCurrentTheme();

  const [isVisible, setIsVisible] = useState<boolean>(alwaysVisible);

  // Map icon type to the SVG component
  const getIcon = (): ReactNode => {
    switch (icon) {
      case 'help':
        return <HelpIcon size={iconSize} />;
      case 'alert':
        return <AlertIcon size={iconSize} />;
      case 'success':
        return <SuccessIcon size={iconSize} />;
      case 'error':
        return <ErrorIcon size={iconSize} />;
      case 'info':
      default:
        return <ExclamationIcon size={iconSize}  />
        //<InfoIcon size={iconSize} />;
    }
  };

  // Map theme type to CSS class
  const getThemeClass = (): string => {
    if (theme === 'default') return '';
    return styles[`tooltip-theme-${theme}`];
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    if (!alwaysVisible) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (!alwaysVisible) setIsVisible(false);
  };

  const handleClick = () => {
    if (showOnClick && !alwaysVisible) setIsVisible(!isVisible);
  };

  const styleQ: any = {'--background': color}

  return (
    <div 
      className={`${styles['tooltip-container']} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles['tooltip-icon']} aria-label={typeof message === 'string' ? message : 'tooltip'}>
        {getIcon()}
      </div>
      
      <div 
        className={`
          ${styles['tooltip-content']} 
          ${styles[position]} 
          ${isVisible ? styles.visible : ''} 
          ${getThemeClass()}
        `}
        role="tooltip"
        style={styleQ}
      >
        {message}
      </div>
    </div>
  );
};

export default ToolTip;