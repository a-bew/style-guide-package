import React, { useRef } from 'react';
import s from '../MobileDropdownContainer.module.scss';

type DropdownComponentProps = {
  showDropdown: boolean;
  autoDropdownPosition: boolean;
  style: React.CSSProperties;
  inputRef: React.RefObject<HTMLInputElement | null> | null;
  children: React.ReactNode;
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  showDropdown,
  autoDropdownPosition,
  style,
  inputRef,
  children
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getPositionStyle = () => {
    if (!autoDropdownPosition) return style;

    if (!showDropdown) return;

    if (dropdownRef && !dropdownRef.current) return;
    if (!inputRef  || !inputRef.current) return;

    const dropdownHeight = dropdownRef &&  dropdownRef.current?.getBoundingClientRect().height;

    if (dropdownHeight){

      const inputTop = inputRef.current?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = inputTop || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - inputRef.current!.offsetHeight;

      if (distanceFromTop < dropdownHeight && distanceFromBottom > dropdownHeight) {
        // Dropdown would overlap with top of screen, display below input
        return {
          top: `${inputRef.current?.getBoundingClientRect().height}px`,
          bottom: "auto",
          marginTop: '-25px',
          paddingTop: '35px',
          paddingBottom: '10px'

        };
      } else if (distanceFromBottom < dropdownHeight) {
        // Dropdown would overlap with bottom of screen, display above input
        return {
          top: "auto",
          bottom: `${inputRef.current?.getBoundingClientRect().height}px`,
          marginBottom: '-25px',
          paddingTop: '10px',
          paddingBottom: '35px'

        };
      } else {
        // Dropdown fits in viewport, display below input
        return {
          top: `${inputRef.current?.getBoundingClientRect().height }px`,
          bottom: "auto",
          marginTop: '-25px',
          paddingTop: '35px',
          paddingBottom: '10px'
        };
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}
      style={showDropdown ? getPositionStyle() : style}
    >
      { children }
    </div>
  );
};

export default DropdownComponent;