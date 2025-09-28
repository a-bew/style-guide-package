import Toggle from '../Toggle'
import { memo } from 'react';

interface ToggleContainerProps {
  active: boolean;
  slider?: any;
  setToggled?: any;
  toggled: boolean;
}

const ToggleContainer = ({active, slider, setToggled, toggled}:ToggleContainerProps) => {
  
  return (
    <Toggle slider={slider} onChange={setToggled} toggled={toggled} active={active} />
  )
}

export default memo(ToggleContainer)