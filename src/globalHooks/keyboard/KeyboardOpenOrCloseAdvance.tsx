import { useState, useEffect } from 'react';

interface KeyboardState {
  isOpen: boolean;
  viewportHeight: number;
}

const KeyboardOpenOrCloseAdvanace = () => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isOpen: false,
    viewportHeight: window.visualViewport?.height || window.innerHeight,
  });

  useEffect(() => {
    // Initial viewport height (when keyboard is closed)
    const initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleResize = () => {
      if (!window.visualViewport) return;

      const currentViewportHeight = window.visualViewport.height;
      
      // Calculate height difference
      const heightDifference = initialViewportHeight - currentViewportHeight;
      
      // Consider keyboard open if height difference is more than 150px
      // This threshold can be adjusted based on your needs
      const isKeyboardOpen = heightDifference > 150;

      setKeyboardState({
        isOpen: isKeyboardOpen,
        viewportHeight: currentViewportHeight,
      });
    };

    // Use visualViewport API if available (modern browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', handleResize);
    }

    // Cleanup
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return keyboardState;
};

export default KeyboardOpenOrCloseAdvanace;