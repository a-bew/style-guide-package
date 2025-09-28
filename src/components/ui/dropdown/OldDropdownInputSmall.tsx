import React, { type Dispatch, Fragment, useState, useEffect, useRef } from 'react'
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './olddropdownsmall.module.scss';
import OldDropDownItem from './OldDropDownItem';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import { shortenText } from '@/utils/functions';
import { type ItemPropsGroup } from '@/types/common';

interface Variation {
  id: number;
  word: string;
}

interface VariationGroup {
  [key: string]: Variation[];
}

type Option = Variation | VariationGroup;

export interface ItemProps {
    id: string|number; 
    word: string;
    key?: string | number; 
    section?: string;
    selected?: boolean;
    removeable?: boolean;
}

export interface onChangeDropdownInputProps {
  name:string; 
  value:string;
  item: ItemPropsGroup[]; 
}

/**
 * Example Data
 * */
export const items: ItemProps[] = [
  { id: 1, word: 'item 1' },
  { id: 2, word: 'item 2' },
  { id: 3, word: 'item 3' },
];

interface Props {
  items: ItemProps[];
  fieldName?: string;
  totalFields?: number;
  index?: number;
  displayIndexInfo?: boolean; 
  onChangeForm: Function;
  label?: string;
  setShow?: any;
  placeholder?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: number;  /*
                    * Represent input height
                    */
  setShowMobileDropdown?: Dispatch<boolean>;
  showMobileDropdown?: boolean;

  dropdownItemsPaddingTop?: number;
  dropdownContainerMarginTop?: string;
  className?: string;
  hasTextShortener?: boolean;
  onInputChange?: () => void;

  /**
   * defaultValue can set initialValue of Input
   * It is an optional argument;
   * */
  defaultValue?: string;
  allowDirection?: boolean;

  // Function called when the input loses focus
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Add a className for dropdown input element
  inputClassName?: string;
  width?: string;

  /**
   * This should disable typing into the input element of the dropdown component
   * */ 
  disableOnchanged?: boolean;
  textLimit?: number;

  autoDropdownPosition?: boolean;
}

const OldDropdownInputSmall = ({items, fieldName, className, index, totalFields, displayIndexInfo = false, onChangeForm, label, setShow, placeholder, maxWidth = '100%', minWidth = '130px', height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 35, dropdownContainerMarginTop='0px', hasTextShortener, onInputChange, defaultValue = '', allowDirection=false, onBlur, inputClassName, width, disableOnchanged = false, textLimit = 11, autoDropdownPosition = true }:Props) => {
  const variations: Variation|ItemProps[] = [];

  for (const option of items) {
    if ('id' in option && 'word' in option) {
      // variations.push(option);
       // Ensure the id is a number before pushing to variations
        variations.push(option);
    } else {
      const variationGroup = option as Variation;
      for (const variation of Object.values(variationGroup)) {
        variations.push(variation);
      }
    }
  }

  const [filterState, setFilterState] = useState<ItemProps[]>(variations);
  /**
   * show or hide dropdown
  */
  const [closeToBottom, setCloseToBottom] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMobileMedia, setIsMobileMedia] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(false);
  const [detectClickOnDropdown, setDetectClickOnDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [position, setPosition] = useState<{ top?: number; bottom?: number; left: number }>({ left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.keyCode) {
      // Enter pressed
      case 13:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const onFocusInput = (e: any) => {
    // Set selected index to zero at every new focus
    setFilterState(items);
    setShowDropdown(true);
  }

  const onClickSelect = ({ target }: any) => {
    const { textContent, dataset } = target;
    setInputValue(textContent);
    setShowDropdown(false);
    setShow && setShow(true);
    /**
     * Update App State from dropdown selection
     * */ 
    // const item = filterState.find((data:any)=>data.id===dataset.id);
    const item = filterState[parseInt(dataset.id)];
    onChangeForm({name:fieldName, value:textContent, item});
  }

  const onClickSelect2 = (textContent:any, item: any) => {
    setInputValue(textContent);
    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent, item});
  }

  const onKeyUp = (e:any)=>{
    let { value: userData, dataset } = e.target; //user enetered data
    let emptyArray:any = [];
    if(userData){
      emptyArray = filterState.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);
      setFilterState(emptyArray);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */ 

      onChangeForm({name:fieldName, value:userData, item:null });

      if (emptyArray.length === 0){
          //  setActiveDiv(false);
          setShowDropdown(false);
      }
        
    }else{
      onFocusInput(e)
    }
  }

  const onChange = (e:any)=>{
    const {name, value, dataset} = e.target;
    // dataset.value
    setInputValue(value);
    !value && onFocusInput(e);
    onKeyUp && onKeyUp(e);
    // onChangeForm({name, value});
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    setIsMobileMedia(mediaQuery.matches);
    mediaQuery.addListener(() => setIsMobileMedia(mediaQuery.matches));
    return () => mediaQuery.removeListener(() => setIsMobileMedia(mediaQuery.matches));
  }, []);

  const onFocus = (e:any) => {

    if (inputRef.current) {
      inputRef.current.focus();
    };

    if (isMobileMedia){
     setShow && setShow(false);
    }

    onFocusInput(e);

  }

  /**
  * Outside - click enabled 
  * */ 

  const wrapperRef = useRef(null);

  useOutsideAlerter({ref:wrapperRef, setToggleMenu: setShowDropdown, toggleMenu: showDropdown});

  /**
   * Proxy - main exchange functionality
   * */ 

  const {handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, filterState, allowDirection);
    
  const style={paddingTop: `${dropdownItemsPaddingTop}px`, ...position};

  /**
   * Set/update default input value for dropdown
   * */ 
  // const [,setTime] = useState(new Date())
  const resetState = (defaultValue: string) => {
    setInputValue(defaultValue);
  };

  useEffect(()=>{
    typeof defaultValue === 'string' && resetState(defaultValue);
  }, [defaultValue]);

  // const [disableOnchanged, setDisableOnchanged] = useState(false);

  /**
   * Input styles
   * */ 

  const inputStyle = disableOnchanged?{cursor: 'pointer', caretColor: 'transparent'}: {};

  const getPositionStyle = () => {
    if (!autoDropdownPosition) return style;

    if (!showDropdown) return;

    if (dropdownRef && !dropdownRef.current) return;
    if (!inputRef.current) return;

    const dropdownHeight = dropdownRef &&  dropdownRef.current?.getBoundingClientRect().height;

    if (dropdownHeight){

      const inputTop = inputRef.current?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = inputTop || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - inputRef.current!.offsetHeight;

      if (distanceFromTop < dropdownHeight && distanceFromBottom > dropdownHeight) {
        // Dropdown would overlap with top of screen, display below input
        return {
          top: `${inputRef.current?.getBoundingClientRect().height}px`,
          bottom: "auto",
          marginTop: '-25px',
          paddingTop: '35px',
          paddingBottom: '10px'

        };
      } else if (distanceFromBottom < dropdownHeight) {
        // Dropdown would overlap with bottom of screen, display above input
        return {
          top: "auto",
          bottom: `${inputRef.current?.getBoundingClientRect().height}px`,
          marginBottom: '-25px',
          paddingTop: '10px',
          paddingBottom: '35px'

        };
      } else {
        // Dropdown fits in viewport, display below input
        return {
          top: `${inputRef.current?.getBoundingClientRect().height }px`,
          bottom: "auto",
          marginTop: '-25px',
          paddingTop: '35px',
          paddingBottom: '10px'
        };
      }

    }
  };

  return (
      <div 
        ref={wrapperRef} 
        className={`${s['dropdown-container']} ${className}`}
        onKeyDown = {handleKeyDown} 
        style = {{maxWidth, minWidth, marginTop: dropdownContainerMarginTop, width,}} 
        onClick = {()=>{
          !detectClickOnDropdown && setDetectClickOnDropdown(true);
          setTimeout(()=>{
            setDetectClickOnDropdown(false);
          }, 2000);
        }
        }
      >

        <span 
          className={s['up-down-icon']} 
          style = {{display: 'flex', position: 'absolute', right: 0, top:!!height?`${height/6}px`:'10px', paddingRight: '7px', flex:1, zIndex: showDropdown?105:'inherit'}}
        >
          {
            showDropdown
              ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={()=>setShowDropdown(false)} />
              : <CaretDownIcon className={s["dropdown-small-caret-icon"]}  onClick={(e)=>onFocus(e)}/>
          }          
        </span>

        <div style = {{display: 'flex', justifyContent: 'space-between'}}>
          {label && <label>{label}</label>}
         {(displayIndexInfo && index) && <span>{` ${index+1} of ${totalFields}`}</span>}
        </div>

        <input
          onClick={(e)=> !showDropdown? onFocus(e): ()=>{}}
          autoComplete='off' 
          ref={inputRef}
          value={(hasTextShortener?shortenText(inputValue, textLimit): inputValue)}
          data-value = { inputValue }
          onChange={!disableOnchanged ?onChange: (e)=>null}
          onKeyDown={handleKeyPress}
          onFocus={e => {
            if (isMobileMedia){
              if (setShowMobileDropdown){
                setShowMobileDropdown(true); 
              }
             setShow && setShow(false);
              // const input = e.target as HTMLInputElement;
              // const parent = input.parentElement as HTMLElement;
              // parent.style.marginTop = '50px'  
            }
            onFocusInput(e);
          }}

          onBlur={onBlur}

          className={`${s['dropdown-input']} ${s['form_control']} ${showDropdown?s['isfocus']:""} ${inputClassName}`}

          placeholder =  {placeholder}
          name = {fieldName}
          style = {{ height, ...inputStyle}}          
        />

        {<div ref={dropdownRef} className={`${s['dropdown-items']} ${showDropdown ?s.show: ''}`} style={showDropdown?getPositionStyle():style}>
          {
            filterState?.map((item, index) => {            
              return (
                <Fragment key={index}>
                  {
                    index === 0 && item.section && <div
                        style = 
                        {{
                            position: "relative",
                            width: '100%',
                            color: '#aaa',
                            padding: '10px',
                        }}
                        className = {s['dropdown-item']}
                    >
                        {item.section}
                    </div>
                  }
                  {
                   index != 0 && item?.section && item?.section != filterState[index-1]?.section 
                   ? 
                      <div
                          style = 
                          {{
                              position: "relative",
                              width: '100%',
                              //background: '#aaa',
                              padding: '10px',
                              color: '#aaa'
                          }}
                          className = {s['dropdown-item']}
                      >
                          {item.section}
                      </div>
                      :null
                  }
                  <OldDropDownItem
                    keyId = {index}
                    // key={item.id}
                    // className={`${s['dropdown-item']} ${index === selectedIndex ? s['selected'] : ''}`}
                    className={s['dropdown-item']}
                    onClick={onClickSelect}
                    focusedIndex = { focusedIndex }
                    handleSelection={ handleSelection }
                    hasSection = { !!item?.section }
                    text = { item.word }
                  />              
                </Fragment>
            )})
          }
        </div>
        }
      </div>
  )
}

export default OldDropdownInputSmall;