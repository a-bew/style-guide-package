import React, { useState, useEffect, useRef } from "react";

const KeyboardOpenOrClose = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const prevWindowHeight = useRef(window.innerHeight);

  useEffect(() => {
    const resizeListener = () => {
      if (window.innerHeight < prevWindowHeight.current) {
        setKeyboardOpen(true);
      } else {
        setKeyboardOpen(false);
      }
      prevWindowHeight.current = window.innerHeight;
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return keyboardOpen;
};

export default KeyboardOpenOrClose;
