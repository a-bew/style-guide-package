import React, { useRef, useState } from 'react';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from '../MobileDropdownContainer.module.scss';

type OutsideClickComponentProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  minWidth?: string;
  dropdownContainerMarginTop?: string;
  width?: string;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
  setShowDropdown: Function;
  showSelectedActiveOnly: boolean;
   showDropdown: boolean;
};

// </OutsideClickComponent>
const OutsideClickComponent: React.FC<OutsideClickComponentProps> = ({
  children,
  className,
  maxWidth,
  minWidth,
  dropdownContainerMarginTop,
  width,
  handleKeyDown,
  setShowDropdown,
   showDropdown,
  showSelectedActiveOnly
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [detectClickOnDropdown, setDetectClickOnDropdown] = useState(false);

  const handleOutsideClick = () => {
    if (!detectClickOnDropdown) {
      setDetectClickOnDropdown(true);
      setTimeout(() => {
        setDetectClickOnDropdown(false);
      }, 2000);
    }
  };

  useOutsideAlerter({ ref: wrapperRef, setToggleMenu: setShowDropdown, toggleMenu: showDropdown });

  return (
    <div
      ref={wrapperRef}
      className={`${s['dropdown-container']} ${className}`}
      onKeyDown={!showSelectedActiveOnly?handleKeyDown:()=>{}}
        // onKeyDown = {handleKeyDown}
    style={{ maxWidth, minWidth, marginTop: dropdownContainerMarginTop, width }}
      onClick={handleOutsideClick}
    >
      {children}
    </div>
  );
};

export default OutsideClickComponent;
