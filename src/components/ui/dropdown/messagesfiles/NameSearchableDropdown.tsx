import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './namesearchabledropdown.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { type ItemProps } from '../dropdowninputtype';
import DropdownItem from './DropdownItem';
import {  shortenText } from '@/utils/functions';
import useWindowDimensions from '@/globalHooks/useWindowDimensions';

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
  mainFromProxyInput?: string;

  dropdownItemsPaddingTop?: number;
  dropdownContainerMarginTop?: string;
  className?: string;
  hasTextShortener?: boolean;
  onInputChange?: () => void 

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
  dropdownSide?: 'right' | 'bottom';

  /**
   * This is a sub component 
   * */ 
  isSub?: boolean;
  placeholderIcon?: ReactNode;
}

const NameSearchableDropdownInputSmall = ({items, fieldName, className, index, totalFields, displayIndexInfo = false, onChangeForm, label, setShow, placeholder, maxWidth = '100%', minWidth, height, setShowMobileDropdown, showMobileDropdown, mainFromProxyInput, dropdownItemsPaddingTop = 5, dropdownContainerMarginTop='0px', hasTextShortener, onInputChange, defaultValue, allowDirection=false, onBlur, inputClassName, width, disableOnchanged = false, dropdownSide = 'bottom', isSub = false, placeholderIcon }:Props) => {

  const [filterState, setFilterState] = useState<ItemProps[]>([]);//items
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedInput, setSelectedInput] = useState('');

  const [isMobileMedia, setIsMobileMedia] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
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

  const onClose = () => {
    // Set selected index to zero at every new focus
    setFilterState([]);
    setShowDropdown(false);
  }

  const onClickSelect = ({ target }: any) => {
    const { textContent } = target;
    setInputValue(textContent);
    setSelectedInput(textContent);
    setShowDropdown(false);
    setShow && setShow(true);

    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent});

  }

  const onClickSelect2 = useCallback((textContent:any) => {
    setInputValue(textContent);
    setSelectedInput(textContent);
    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent});
  }, [fieldName, onChangeForm])

  const onKeyUp = (e:any)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray:any = [];
    if(userData){
      emptyArray = items.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);

      setFilterState(emptyArray);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */ 
      onChangeForm({name:fieldName, value:userData});

      if (emptyArray.length === 0){
          //  setActiveDiv(false);
         // setShowDropdown(false);
      }
        
    }else{
      onFocusInput(e)
      // setFilterState([]);

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

    //  setSelectedInput('');
     setInputValue('') // !filterState.length && 
     setFilterState([]);

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

  useEffect(()=>{
    mainFromProxyInput && onClickSelect2(mainFromProxyInput);
  }, [mainFromProxyInput, onClickSelect2])

  const {handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, filterState, allowDirection);
    
  const style={paddingTop: `${dropdownItemsPaddingTop}px`, ...position};

  /**
   * Set/update default input value for dropdown
   * */ 
  useEffect(()=>{
    defaultValue && setSelectedInput(defaultValue);
  }, [defaultValue]);

  // const [disableOnchanged, setDisableOnchanged] = useState(false);

  /**
   * Input styles
   * */

  const inputStyle = disableOnchanged?{cursor: 'pointer', caretColor: 'transparent',}: {};

  const [hoveredItem, setHoveredItem] = useState<string|null>(null);
  
  const [dropdownPositionsRight, setDropdownPositionsRight]:any = useState({});  
  const [dropdownPositionsBottom, setDropdownPositionsBottom]:any = useState({});  

  const handleHover = (event: any, itemId: string) => {
      if (itemId) { 
        
        let { top, left, width, right, bottom, height } = event.currentTarget.getBoundingClientRect();

        const dropdownLeft = left + width; // Calculate the right end of the li

        setDropdownPositionsRight({ ...dropdownPositionsRight, [itemId]: { top, left: dropdownLeft } });
        setDropdownPositionsBottom({ ...dropdownPositionsBottom, [itemId]: { top : top + height, left:left } });
      }
      setHoveredItem(itemId);
  };

  const onMouseHover = (event:any) => {
    
    console.log("fieldName", fieldName);
    handleHover(event, fieldName)


  };

  let dropdownPositions = dropdownPositionsRight;

  const [containerWidth, setContainerWidth] = useState(0);

  const { width: widthDim } = useWindowDimensions()

  useEffect(() => {
    if (!wrapperRef?.current) return;
    let clientWidth: any = wrapperRef?.current;
    clientWidth && setContainerWidth(clientWidth.clientWidth);

  }, [wrapperRef?.current, widthDim])

  if (dropdownSide ==='bottom'){
    dropdownPositions = dropdownPositionsBottom;
  }


  return (
      <div ref={wrapperRef} className={`${s['dropdown-container']} ${className}`}  onKeyDown = {handleKeyDown} style = {{maxWidth, minWidth, marginTop: dropdownContainerMarginTop, width }} >
      
        {/* {<div 
          className = {`${s['form_control']} ${s['input-clickable']}`} 
          style = {{    background: (!isSub && showDropdown)?'#fff':'', padding: "5px", border: !isSub? '':'none',  zIndex: 0
        }} 
          onClick={(e)=>{!showDropdown? onFocus(e): onClose() }}
          onMouseEnter={(event: any)=> onMouseHover(event)}
        >
          
              <span  style = {{display: 'flex', justifyContent: 'flex-start', padding: "0 10px 0 5px"}}>
                {!selectedInput ?<span style = {{color: placeholderColor, }}> { placeholder } </span>:<span style = {{color: '', }}>{selectedInput}</span>}
              </span>
              <span className={s['up-down-icon']} style = {{display: 'flex', justifyContent: 'flex-end'}}>
                {
                  showDropdown
                          ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={()=>setShowDropdown(false)} />
                          : <CaretDownIcon className={s["dropdown-small-caret-icon"]}  onClick={(e)=>onFocus(e)}/>
                }          
              </span>              
            </div>} */}

{<div
        // tabIndex={0}
        className={`${s['form_control']} ${s['input-clickable']} ${g['responsive_form']}`}
        style={{ zIndex: 200, background: showDropdown ? '#eee' : '', padding: 5, alignItems: 'center', gap: 5 }}
        onClick={(e) => {
          e.preventDefault()
          !showDropdown ? onFocus(e) : onClose(); 
          e.stopPropagation()
        }}

        onMouseEnter={(event: any) => onMouseHover(event)}

        onKeyDown={handleKeyPress}
        
      >
        {/* <span style={{ display: 'flex', justifyContent: 'flex-start', padding: "0 10px 0 5px", }}> */}
          {!selectedInput ? <span style={{ color: '', }}> {placeholder} </span> : <span style={{whiteSpace: 'nowrap'}}>{selectedInput}</span>}
        {/* </span> */}
        <span className={s['up-down-icon']} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          { placeholderIcon?
            placeholderIcon
           : (showDropdown
              ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={() => setShowDropdown(false)} />
              : <CaretDownIcon className={s["dropdown-small-caret-icon"]} onClick={(e) => onFocus(e)} />)
            
          }
        </span>
      </div>}
      <div style={{position: 'relative',}}>
        <div ref={dropdownRef} className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}  style  = {{
          position: 'fixed',
          width: containerWidth > 100 ? containerWidth+50 : "fit-content",
          color: '#000',
          marginTop: `${dropdownItemsPaddingTop}px`,
          ...dropdownPositions[fieldName],  
        }}>
          <div className = {``} style = {{borderColor: 'white',}}>
          </div>

          <input
            onClick={(e)=> !showDropdown? onFocus(e): ()=>{}}
            autoComplete='off' 
            ref={inputRef}

            value={(hasTextShortener?shortenText(inputValue, 11): inputValue)}
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

            className={`${s['form_control']} ${showDropdown?s['isfocus']:""} ${inputClassName}`}
            placeholder =  {!showDropdown? placeholder: ''}
            name = {fieldName}
            style = {{ height, ...inputStyle,  borderColor: '#ccc', borderWidth: '1px', borderStyle: 'solid'}}          
          />

      <div className = {g['message-label-items']}>

          { filterState?.map((item, index) => (
            <Fragment key={index}>
              <DropdownItem
                keyId = {index}
                className={s['dropdown-item']}
                onClick={onClickSelect}
                focusedIndex = { focusedIndex }
                handleSelection={ handleSelection }
                text = { item.word }
              />              
            </Fragment>
          ))}
          </div>
        </div>
          
        </div>

      </div>
  )
}

export default NameSearchableDropdownInputSmall;