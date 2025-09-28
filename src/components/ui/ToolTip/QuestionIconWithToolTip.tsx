import { useState, type ReactNode } from 'react';
import { AiFillQuestionCircle,  } from 'react-icons/ai';
import s from './questioniconwithtooltippopup.module.scss';
import { type IconType } from 'react-icons';
import useCurentTheme from '@/globalHooks/useCurentThem';

interface Props {
  message: string;
  position?: string;
  topInPx?: string;
}

export const ToolTipPopUp = ({ 
  message, 
  position,
  topInPx,
}: Props) => {

  let className = 'normal';

  if (position === 'top'){
    className = 'moveToTop';
  }

  return (
        <div 
          className = {`${s['tooltip-popup']} ${s[className]}`}
          style = {topInPx?{top: topInPx}: {}}
        >
          <p className = {s['text-align-hyphen']}>{message}</p>
        </div>
  );
};


interface QuestionIconWithToolTipProps {
  message: string;
  position?: 'normal' | 'top';
  hoverActive?: boolean;
  icon?: IconType;
  children?: ReactNode;
  showToolTip?: boolean;
  topInPx?: string;
}

const iconSize = 16;
const iconColor = "#000";

const QuestionIconWithToolTip = ({ children, message, position  = 'normal', hoverActive, icon, showToolTip = true, topInPx}: QuestionIconWithToolTipProps)=>{
  const [topElem, setTopElem] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { color } = useCurentTheme();

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  let Icon = AiFillQuestionCircle

  if (icon){
    Icon = icon;
  }

  if (!showToolTip) return null;

  return (
     <div 
        className={` ${s["question-icon-with-tooltip"]} ${topElem? s['q'] : '' }`} 
        onMouseEnter = {(e)=>setIsHovered(!isHovered)}
        onMouseLeave = {(e)=>handleMouseOut()}
      >     
        {!children?<Icon 
                size = {iconSize} 
                color = {(isHovered )?color:iconColor} 
                className = {s['tooltip-icon']}
              />:<span className = {s['tooltip-icon']}>{children}</span>}
        {!hoverActive && 
        <ToolTipPopUp 
                message={message} 
                position = {position}
                topInPx = { topInPx }
              />}
      </div>
  )

}

export default QuestionIconWithToolTip;