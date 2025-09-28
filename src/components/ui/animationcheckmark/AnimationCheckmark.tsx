import React from 'react';
import useCurentTheme from '@/globalHooks/useCurentThem';
import s from './animationcheckmark.module.scss';

const AnimatedCheckmark: React.FC = () => {
    const { color } = useCurentTheme();

  return (
    <div className={s["checkmark-container"]}>
      <svg className={s["checkmark"]} viewBox="0 0 52 52">
        <circle className={s["checkmark-circle"]} style = {{stroke: color}} cx="26" cy="26" r="25" fill="none" />
        <path className={s["checkmark-check"]} style = {{stroke: color}} fill="none" d="M14.1 27.2l7.1 7.1 16.7-16.7" />
      </svg>
    </div>
  );
};

export default AnimatedCheckmark;
