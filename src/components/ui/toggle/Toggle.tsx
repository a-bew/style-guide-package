import React from 'react';
import s from './toggle.module.scss';

import useCurentTheme from '@/globalHooks/useCurentThem';

interface ToggleProps {
  onChange: any;
  toggled: boolean;
  active: boolean;
  slider?: any;
  leftLabel?: string;
  rightLabel?: string;
  xternalStylesheet?: CSSModuleClasses;
}

const Toggle = React.memo(({ onChange, toggled, active, slider, leftLabel = "Patronize", rightLabel = "About", xternalStylesheet }:ToggleProps) => {

  const { color: background } = useCurentTheme();

  function handleClick(event:any) {
    const { clientX, clientY } = event;
    const element = event.target;
    const { left, top, width, height } = element.getBoundingClientRect();
    
    if (clientX < left + width / 2 && clientY < top + height) {
      // The click occurred in the first half of the element
      !toggled && event.preventDefault();
    } else {
      // The click occurred in the second half of the element
      toggled  && event.preventDefault();
    }
  }

  let classname:any = s;

  if (xternalStylesheet){
    classname = xternalStylesheet;
  }

  const themeBackground = background;
  const someStyle = {
    ...slider,
    "--background": themeBackground,
  }

  return (
    <label className={classname.inputWrapper} id = {"labelNav"}>
        <input type="checkbox" className={classname["input-checkbox"]} checked = {toggled} onChange = {onChange} disabled={!active} />
       { <span className={classname.slider} style={someStyle} onClick = {handleClick}>{!toggled?leftLabel:rightLabel}</span>}
    </label>
  )
})

export default Toggle