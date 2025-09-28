import React from "react";
import { Fragment } from "react";
import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import uuid from "react-uuid";
import { Cross1Icon } from '@radix-ui/react-icons';
import { IoMdArrowDropdown } from "react-icons/io";

import s from "./allfilterbox.module.scss";
import g from "@/globalStyles/globalStyles.module.scss";

import DetectOutsideClick from '@/globalContainers/wrappers/DetectOutsideClick';
import { setTrackAllFilterClick } from '@/pages/home/onboarding/redux/trackState';
import SectionComponentWrapper from './sectioncomponentwrapper/SectionComponentWrapper';
import { tabsStage3 } from "@/data/subMenuData";
import useCurrentSubMenuKey from "@/globalHooks/useCurrentSubMenuKey";
import { setBottomTab } from "@/redux/bottomTabForUser";
import { iconSize } from "@/utils/constants";

interface AllFilterBoxProps {
  setStartAnimation: Dispatch<SetStateAction<boolean>>;
  startAnimation: boolean;
}

const AllFilterBox = React.memo(({ setStartAnimation, startAnimation }: AllFilterBoxProps) => {

  const dispatch = useDispatch();

  const { currentKey, filterable } = useCurrentSubMenuKey()

  const handleClearNav = () => {
    dispatch(setBottomTab({}));
  };

  const handleTrackAllFilterClick = (data: boolean) => {
    dispatch(setTrackAllFilterClick(data));
  };

  const onClick = () => {
    handleClearNav();
    setStartAnimation(false);
    handleTrackAllFilterClick(false);
  }

  return (
    <div className={`${s.box} ${s['box-vertical']}`}>
      <DetectOutsideClick setToggleMenu={setStartAnimation} toggleMenu = {startAnimation} >
        <div className={s["space-between"]}>
          <div className={s['box-horizontal']}>
            <div className={g.title}>Filter only</div>
            &nbsp;

            <IoMdArrowDropdown
              size={iconSize}
              style={{ marginTop: '1px' }}
            />
            &nbsp;

            <div className={g.title}>by</div>
          </div>
          <Cross1Icon onClick={onClick} style={{ marginRight: '30px' }} />
        </div>

        <div className={s['horizontal-line']}></div>

        <div className={` ${s['box-vertical']} ${s['overflow-main']}`}>

          {
            filterable[currentKey]?.viewScreen === true && filterable[currentKey]?.showSubMenu === true
            &&
            tabsStage3[currentKey]?.data?.map((item: any, index: any) => <Fragment key={index}><SectionComponentWrapper data={item} title={item.name} type={"radio"} horizontal={false} /></Fragment>)
          }

        </div>

        <div className={s.footer}>
          <div className={s['horizontal-line']}></div>
          <div className={`${s["space-between"]} ${s.button} `}>
            <button className={`${g['ml-15']} ${s['textBold-16']}`}><p className={s.h2}>Reset</p></button>
            <button className={` ${g.button} ${s.buttonStyle} ${g.borderBtn} ${g.shadow_on_hover}  ${g['button-search']}`} onClick={onClick}>Go</button>
          </div>
        </div>
      </DetectOutsideClick>
    </div>
  )
})

export default AllFilterBox;