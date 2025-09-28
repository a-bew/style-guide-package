import useWindowDimensions from '@/globalHooks/useWindowDimensions'
import useToggle from '@/globalHooks/useToggle';
import { type DropdownInputSmallProps } from './DropdownInputSmall';
import SimpleDropdown from './messagesfiles/SimpleDropdown';
import MobileDropdown from './MobileDropdown';
import NameSearchableDropdownInputSmall from './messagesfiles/NameSearchableDropdown';

export interface Props extends DropdownInputSmallProps {
  label?: string;
}

function MobileNameSearchableDropdownContainer(props: Props) {
  const { width: windowWidth } = useWindowDimensions()
   useToggle()

  if (windowWidth > 550) {
    return (
      props.disableOnchanged ? <SimpleDropdown {...props} /> : <NameSearchableDropdownInputSmall {...props} />
    )
  }

  return (
    <MobileDropdown {...props} />
  )
}

export default MobileNameSearchableDropdownContainer