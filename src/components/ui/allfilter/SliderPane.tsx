import { ReactNode, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import useVisible from '@/globalHooks/useVisible';
import s from "./sliderpane.module.scss";
import g from '@/globalStyles/globalStyles.module.scss';
import { selectUserAuth } from '@/redux/userControl/userAuthReducer';
import React from 'react';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  startAnimation: boolean;
  top?: number | string | 'inherit';
  bottom?: number | string | 'inherit';
  height?: string;
  maxHeight?: string;
  slideType?: 'up' | 'down' | 'left' | 'right' | 'drawer';
  setStateAnimation?: Function;
  width?: string
}

const SliderPane = React.memo(({style, width= '100%', children, top,bottom, height, maxHeight, startAnimation, slideType = 'up', setStateAnimation }: Props) => {
  const userAuthData = useSelector(selectUserAuth);
  const seconds = userAuthData.isAuthenticated ? 4000 : 500
  let { isVisible } = useVisible(true, seconds)

  const sliderRef = useRef<HTMLDivElement>(null); // Ref for the slider pane


  useEffect(() => {

    if (startAnimation) {
      // Prevent scrolling on the body element when the pane is open
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling on the body element when the pane is closed
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [startAnimation]);

  
  let drawerClasses = s['side-' + slideType]

  if (startAnimation) {
    drawerClasses = `${s['side-' + slideType]} ${s['open']} ${g['hide-scrollbar']}`
  }

  if (startAnimation && isVisible && userAuthData.isAuthenticated) {
    // drawerClasses = s['side-'+slideType]
    setTimeout(() => {
      drawerClasses = `${s['side-' + slideType]} ${s['open']}`
    }, 1000);
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  const startY = e.touches[0].clientY;
  const startX = e.touches[0].clientX;
  let deltaY = 0;
  let deltaX = 0;
  let isVerticalMove = false;
  let lock = false;

  const handleTouchMove = (e: TouchEvent) => {
    deltaY = e.touches[0].clientY - startY;
    deltaX = e.touches[0].clientX - startX;

    // Lock only if the vertical movement is stronger
    if (!lock) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isVerticalMove = true;
        lock = true;
      } else {
        isVerticalMove = false;
        lock = true;
      }
    }

    if (!isVerticalMove) return;

    // Prevent scroll bouncing / page scroll
    e.preventDefault();

    // Trigger close gesture if downward swipe
    if (deltaY > 70) {
      setStateAnimation && setStateAnimation(false);
      cleanup();
    }
  };

  const handleTouchEnd = () => {
    cleanup();
  };

  const cleanup = () => {
    sliderRef.current?.removeEventListener('touchmove', handleTouchMove);
    sliderRef.current?.removeEventListener('touchend', handleTouchEnd);
  };

  sliderRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
  sliderRef.current?.addEventListener('touchend', handleTouchEnd);
};

  


  return (
    <div 
      className={drawerClasses} 
      style={{ ...style, top: top, height: height, visibility: isVisible ? 'visible' : 'hidden', width, bottom, maxHeight }}
      ref={sliderRef} // Attach the ref to the slider pane
      onTouchStart={handleTouchStart} // Attach touch event handler

    >{children}</div>
  )
})

export default SliderPane;