import React, {type SetStateAction, type Dispatch, Fragment, useState, useEffect, useRef, useCallback } from 'react'
import s from './MobileDropdownContainer.module.scss';
import DropdownItem from './DropdownItem';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import { shortenText } from '@/utils/functions';
import { camelCaseToSentenceCase } from '@/utils/functions';
import { type ItemProps } from './dropdowninputtype';
import OutsideClickComponent from './dropdownsmall/OutsideClickComponent';
import DropdownComponent from './dropdownsmall/DropdownComponent';
import { type ItemPropsGroup } from '@/types/common';

export interface onChangeDropdownInputProps {
  name:string; 
  value:string;
  item: ItemPropsGroup[]; 
}

interface Props {
  items: ItemProps[];
  fieldName: string;
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

  showSelectedActiveOnly?: boolean;
}

export const useDefaultValueFeatures = ({ defaultValue, setInputValue, filterState }:{ defaultValue: string, setInputValue: Dispatch<SetStateAction<string>>, filterState: ItemProps[] })=>{
  
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const resetState = useCallback((defaultValue: string) => {
      setInputValue(camelCaseToSentenceCase(defaultValue));
    }, [setInputValue]);

    const getIndexOfDefaultValue = useCallback((value: string)=>{
      return filterState.findIndex((item) => item.word === camelCaseToSentenceCase(value))
    }, [filterState])

    useEffect(()=>{
      typeof defaultValue === 'string' && resetState(defaultValue);
      typeof defaultValue === 'string' && setSelectedIndex(getIndexOfDefaultValue(defaultValue))
    }, [defaultValue, getIndexOfDefaultValue, resetState]);

    return { selectedIndex, setSelectedIndex }

}

const DropdownInputSmall = ({items, fieldName, className, index, totalFields, displayIndexInfo = false, onChangeForm, label, setShow, placeholder, maxWidth = '100%', minWidth = '130px', height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 35, dropdownContainerMarginTop='0px', hasTextShortener, onInputChange, defaultValue = '', allowDirection=false, onBlur, inputClassName, width, disableOnchanged = false, textLimit = 11, autoDropdownPosition = true, showSelectedActiveOnly =  false }:Props) => {

  const [filterState, setFilterState] = useState<ItemProps[]>(items);
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMobileMedia, setIsMobileMedia] = useState(false);

  const { selectedIndex, setSelectedIndex } = useDefaultValueFeatures({ defaultValue, setInputValue, filterState });

  const inputRef = useRef<HTMLInputElement>(null);

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

    // Item re
    if (showSelectedActiveOnly){
      setShowDropdown(false);      
      return;
    }

    const { textContent, dataset } = target;
    setInputValue(textContent);
    setShowDropdown(false);
    setShow && setShow(true);
    
    setSelectedIndex(textContent);

    /**
     * Update App State from dropdown selection
     * */ 
    // const item = filterState.find((data:any)=>data.id===dataset.id);
    const item = filterState[parseInt(dataset.id)];
    onChangeForm({name:fieldName, value:textContent, item});
  }

  const onClickSelect2 = (textContent:any, item: any) => {
    setInputValue(textContent);
    setSelectedIndex(textContent);
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

  const { handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, filterState, allowDirection);
    
  const style = { paddingTop: `${dropdownItemsPaddingTop}px` };

  /**
   * Input styles
   * */ 

  const inputStyle = disableOnchanged?{cursor: 'pointer', caretColor: 'transparent'}: {};

  return (
      <OutsideClickComponent
      className = { className }
      maxWidth = { maxWidth }
      minWidth = {  minWidth }
      dropdownContainerMarginTop = { dropdownContainerMarginTop }
      width = {  width }
      handleKeyDown = {handleKeyDown}
      setShowDropdown = { setShowDropdown }
      showDropdown = {showDropdown}
      showSelectedActiveOnly = { showSelectedActiveOnly }
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
            }
            onFocusInput(e);
          }}

          onBlur={onBlur}

          className={`${s['dropdown-input']} ${s['form_control']} ${showDropdown?s['isfocus']:""} ${inputClassName}`}
          placeholder =  {placeholder}
          name = {fieldName}
          style = {{ height, ...inputStyle}}          
        />

        {
          <DropdownComponent
            showDropdown={showDropdown}
            autoDropdownPosition={autoDropdownPosition}
            style={style}
            inputRef={inputRef}
          >
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
                   index !== 0 && item?.section && item?.section !== filterState[index-1]?.section 
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
                  <DropdownItem
                    keyId = {index}
                    className={s['dropdown-item']}
                    onClick={onClickSelect}
                    focusedIndex = { focusedIndex > -1 ? focusedIndex : selectedIndex }
                    handleSelection={ handleSelection }
                    hasSection = { !!item?.section }
                    text = { item.word }
                    showSelectedActiveOnly = { showSelectedActiveOnly }
                  />              
                </Fragment>
            )})
          }
         </DropdownComponent>
        }
      </OutsideClickComponent>
  )
}

export default DropdownInputSmall;