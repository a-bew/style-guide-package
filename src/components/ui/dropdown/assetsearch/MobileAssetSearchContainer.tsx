import React, { type Dispatch, type SetStateAction } from 'react'
import FileSearch, { type FileSearchProps } from '../messagesfiles/FileSearch';
import SliderPane from '@/components/ui/allfilter/SliderPane';
import g from '@/globalStyles/globalStyles.module.scss';
import s from './mobileassetsearchcontainer.module.scss';
import { BiArrowBack } from 'react-icons/bi';

export interface Props extends FileSearchProps {
    label?: string;
    setShowMobileDropdown: Dispatch<SetStateAction<boolean>>;
    showMobileDropdown: boolean;
}

const MobileAssetSearchContainer = React.memo((props: Props) => {


    return (
        <SliderPane top={0} startAnimation={props.showMobileDropdown} slideType='up'>
            <div className={`${s.header} `} style={{ height: '50px', display: 'flex', gap: 20, alignItems: 'center' }} onClick={() => { props.setShowMobileDropdown(!props.showMobileDropdown) }} >
                <BiArrowBack className={s.backArrrowIcon} />
                <h1 className={`${g['main-title']}`} >Back </h1>
            </div>
            <FileSearch
                {...props}
            />
        </SliderPane>
    )
})

export default MobileAssetSearchContainer;