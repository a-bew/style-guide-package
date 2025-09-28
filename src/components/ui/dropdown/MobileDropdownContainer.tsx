import { memo } from 'react'
import useWindowDimensions from '@/globalHooks/useWindowDimensions'
import DropdownInputSmall, { type DropdownInputSmallProps } from './DropdownInputSmall';
import SimpleDropdown from './messagesfiles/SimpleDropdown';
import MobileDropdown from './MobileDropdown';
import { type ItemPropsGroup } from '@/types/common';

export interface onChangeDropdownInputProps {
  name:string; 
  value:string;
  item: ItemPropsGroup[]; 
}

export interface Props extends DropdownInputSmallProps {
  label?: string;
}

const MobileDropdownContainer = memo((props: Props) => {
  const { width: windowWidth } = useWindowDimensions()

  if (windowWidth > 550) {
    return (
      props.disableOnchanged ? <SimpleDropdown {...props} /> : <DropdownInputSmall {...props} />
    )
  }

  return (
    <MobileDropdown {...props} />
  )
})

export default memo(MobileDropdownContainer)