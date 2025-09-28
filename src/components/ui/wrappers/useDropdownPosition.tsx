import { useEffect, useRef, useState } from 'react';

const useDropdownPosition = (ref: React.RefObject<HTMLElement|null>, showDropdown: boolean) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [positionStyles, setPositionStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.stopPropagation(); // Prevent scrolling propagation
    };

    const getPositionStyle:any = () => {
      if (!showDropdown) return {};

      if (!dropdownRef.current) return;
      if (!ref.current) return;

      const dropdownHeight = dropdownRef.current.getBoundingClientRect().height;

      const inputTop = ref.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = inputTop || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - ref.current.offsetHeight;

      if (distanceFromTop < distanceFromBottom) {
        return {};
      } else {
        // Dropdown would overlap with bottom of screen, display above input
        return {
          top: 'auto',
          bottom: `${ref.current.offsetHeight}px`,
          marginBottom: '0px',
          paddingTop: '10px',
        };
      }
    };

    if (showDropdown) {
      document.body.classList.add('disableScroll');
      window.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.body.classList.remove('disableScroll');
      window.removeEventListener('scroll', handleScroll);
    }

    setPositionStyles(getPositionStyle());

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDropdown, ref]);

  return { dropdownRef, positionStyles };
};

export default useDropdownPosition;
