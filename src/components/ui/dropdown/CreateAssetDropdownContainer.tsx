import useWindowDimensions from '../../globalHooks/useWindowDimensions'
import { DropdownInputSmallProps } from './DropdownInputSmall';
import MobileDropdown from './MobileDropdown';
import DropdownInput from './DropdownInput';

export interface Props extends DropdownInputSmallProps {
  label?: string;
}

function CreateAssetDropdownContainer(props: Props) {
  const { label } = props;
  const { width: windowWidth } = useWindowDimensions()

  if (windowWidth > 600) {
    return (
      <DropdownInput {...props} />
    )
  }

  return (
    <MobileDropdown {...props} />
  )
}

export default CreateAssetDropdownContainer