// MiniDropdown.tsx
import { useState, useRef, useEffect, type ReactNode } from 'react';
import styles from './MiniDropdown.module.scss';
import { FaCaretDown } from 'react-icons/fa6';
import useCurentTheme from '@/globalHooks/useCurentThem';
import { lightenColor } from '@/utils/functions';

export type MiniDropdownOption<T extends string = string> = {
  value: T;
  label: string;
};

interface MiniDropdownProps<T extends string = string> {
  options: MiniDropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  buttonClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  children?: ReactNode; 
}

function MiniDropdown<T extends string = string>({ 
  options, 
  value, 
  onChange,
  buttonClassName = '',
  menuClassName = '',
  itemClassName = '',
  children
}: MiniDropdownProps<T>) {

  const { color, secondaryColor } = useCurentTheme()
  const customStyles: any = {
    "--theme-secondary-color": lightenColor(secondaryColor, 0.4)
  }
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value) || options[0];

  const handleSelect = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {/*  */}
        {children? <span 
          onClick={() => setIsOpen(!isOpen)}
        > {children}</span>
         : <button 
            className={`${styles.dropdownButton} ${buttonClassName}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            style={customStyles}
          >
            {selectedOption.label}
            <FaCaretDown 
              className={`${styles.chevronIcon} ${isOpen ? styles.rotated : ''}`} 
            />
        </button>}
        
      {/* </button> */}
      
      {isOpen && (
        <div 
          className={`${styles.dropdownContent} ${menuClassName}`}
          role="menu"
          
        >
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.menuItem} ${value === option.value ? styles.active : ''} ${itemClassName}`}
              onClick={() => handleSelect(option.value)}
              role="menuitem"
              style = {{color: value === option.value ? color : '', minWidth:'5rem'}}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MiniDropdown;