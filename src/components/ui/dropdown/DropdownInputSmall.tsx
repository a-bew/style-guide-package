import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, type SetStateAction, type ReactNode } from 'react'
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './namesearchabledropdown.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { type ItemProps } from './dropdowninputtype';
import DropdownItem from './DropdownItem';
import useWindowDimensions from '@/globalHooks/useWindowDimensions';

import { camelCaseToSentenceCase } from '@/utils/functions';
import useCurentTheme from '@/globalHooks/useCurentThem';

export interface DropdownInputSmallProps {
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
                   maxHeight?: string;
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
  defaultIndex?: number | null;
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
  autoDropdownPosition?: boolean;
  showSelectedActiveOnly?: boolean;
  displayErrorBorder?: string;
  alignDropdownTo?: 'left' | 'right';
  dropdownWidth?: number;
  placeholderIcon?: ReactNode;
  onHandleBlur?: ( name: string, value: string)=>void;
}

export const useWindowScrollPositions = () => {

  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 })

  useEffect(() => {
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export const useDefaultValueFeatures = ({ defaultValue, setInputValue, filterState }: { defaultValue: string, setInputValue: Dispatch<SetStateAction<string>>, filterState: ItemProps[] }) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const resetState = useCallback((defaultValue: string) => {
    setInputValue(camelCaseToSentenceCase(defaultValue));
  }, [setInputValue]);

  const getIndexOfDefaultValue = useCallback((value: string) => {
    return filterState.findIndex((item) => item.word === camelCaseToSentenceCase(value))
  }, [filterState])

  useEffect(() => {
    typeof defaultValue === 'string' && resetState(defaultValue);
    typeof defaultValue === 'string' && setSelectedIndex(getIndexOfDefaultValue(defaultValue))
  }, [defaultValue, getIndexOfDefaultValue, resetState]);

  return { selectedIndex, setSelectedIndex }

}

const DropdownInputSmall = React.memo(({onHandleBlur, items, fieldName, className, index, mainFromProxyInput,displayErrorBorder, totalFields, displayIndexInfo = false, dropdownSide = 'bottom', onChangeForm, label, setShow, placeholder, maxWidth = '100%', height, maxHeight = "55vh", setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 35, dropdownContainerMarginTop = '0px', hasTextShortener, onInputChange, defaultValue = '', allowDirection = false, onBlur, inputClassName, width, disableOnchanged = false, autoDropdownPosition = true, defaultIndex, alignDropdownTo = 'left', dropdownWidth = 250, placeholderIcon }: DropdownInputSmallProps) => {

  const [filterState, setFilterState] = useState<ItemProps[]>([]);//items
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHovered, setIsHovered] = useState(false)

  const [selectedInput, setSelectedInput] = useState('');

  const [isMobileMedia, setIsMobileMedia] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { color } = useCurentTheme();

  const [isFixed, setIsFixed] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return; // If dropdown is closed, do nothing

    let timeoutId: any = null;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // setIsFixed(false);
      }, 0);
    };

    

    switch (event.keyCode) {
      // Enter pressed
      case 13:
        setShowDropdown(false);
        break;
      // Arrow Down pressed
      case 40:
        // event.preventDefault(); // Prevent default behavior
        // Handle the Arrow Down key press here
        setIsFixed(true);
        resetTimeout()
        break;
      case 38:
        // event.preventDefault(); // Prevent default behavior
        // You can implement logic to navigate within the dropdown options, for example, selecting the previous item.
        setIsFixed(true);
        // Call resetTimeout whenever you want to reset the timeout
        resetTimeout();
        break;

      // if (event.key === 'Escape' || event.keyCode === 27) {
      case 27:
        // Handle the Escape key press
        // event.preventDefault()
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

  const onClose = (e:any) => {
    // Set selected index to zero at every new focus
    setFilterState([]);
    setShowDropdown(false);
  }

  const onClickSelect = ({ target, currentTarget }: any) => {
    const { textContent } = target;
    setInputValue(textContent);
    setSelectedInput(textContent);
    setShowDropdown(false);
    setShow && setShow(true);

    const currentIndex = currentTarget.getAttribute('data-id')
    /**
     * Update App State from dropdown selection
     * */
    console.log(".getAttribute('data-id')", items[currentIndex].item)
    onChangeForm({ name: fieldName, value: textContent, item: items[currentIndex].item });

  }

  const onClickSelect2 = useCallback((textContent: any, item: any) => {
    setInputValue(textContent);
    setSelectedInput(textContent);


    /**
     * Update App State from dropdown selection
     * */
    onChangeForm({ name: fieldName, value: textContent, item: item.item });
  }, [fieldName, onChangeForm])

  useEffect(() => {
    if (defaultIndex !== null && defaultIndex !== undefined) {
      const foundIndex = items.findIndex((item:ItemProps, index:number)=>index === defaultIndex);
      console.log()
      if (foundIndex > -1) {
        onClickSelect2(items[defaultIndex].word, items[defaultIndex])
      }
  }
    
  }, [defaultIndex])
  
  const onKeyUp = (e: any) => {
    let userData = e.target.value; //user enetered data
    let emptyArray: any = [];
    if (userData) {
      emptyArray = items.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);

      setFilterState(emptyArray);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */
      onChangeForm({ name: fieldName, value: userData, item: null });

      if (emptyArray.length === 0) {
        //  setActiveDiv(false);
        // setShowDropdown(false);
      }

    } else {
      onFocusInput(e)
      // setFilterState([]);

    }
  }

  const onChange = (e: any) => {
    const { name, value, dataset } = e.target;
    // dataset.value
    setInputValue(value);
    !value && onFocusInput(e);
    onKeyUp && onKeyUp(e);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    setIsMobileMedia(mediaQuery.matches);
    mediaQuery.addListener(() => setIsMobileMedia(mediaQuery.matches));
    return () => mediaQuery.removeListener(() => setIsMobileMedia(mediaQuery.matches));
  }, []);


  const onFocus = (e: any) => {
    e.preventDefault()

    //  setSelectedInput('');
    setInputValue('') // !filterState.length && 
    setFilterState([]);

    if (inputRef.current) {
      inputRef.current.focus();
    };

    if (isMobileMedia) {
      setShow && setShow(false);
    }

    onFocusInput(e);

    e.stopPropagation()

  }

  /**
  * Outside - click enabled 
  * */

  const wrapperRef: any = useRef(null);

  useOutsideAlerter({ ref: wrapperRef, setToggleMenu: setShowDropdown, toggleMenu:showDropdown });

  /**
   * Proxy - main exchange functionality
   * */

  // useEffect(() => {    
  //   mainFromProxyInput && onClickSelect2(mainFromProxyInput);
  // }, [mainFromProxyInput, onClickSelect2])

  const { handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, filterState, allowDirection);

  /**
   * Set/update default input value for dropdown
   * */
  useEffect(() => {
    defaultValue && setInputValue(defaultValue);
  }, [defaultValue]);

  const inputStyle = disableOnchanged ? { cursor: 'pointer', caretColor: 'transparent', } : {};

  // const [dropdownPositionsBottom, setDropdownPositionsBottom]:any = useState({});  


  const [containerWidth, setContainerWidth] = useState(0);

  const { width: widthDim } = useWindowDimensions()

  useEffect(() => {
    if (!wrapperRef?.current) return;
    let clientWidth: any = wrapperRef?.current?.clientWidth;
    clientWidth && setContainerWidth(clientWidth);
  }, [wrapperRef?.current?.clientWidth, widthDim])

  const primaryRef: any = useRef(null);

  const handlePatrolizeClick = useCallback((showDropdown: boolean) => {

    if (!showDropdown) return;

    if (dropdownRef && !dropdownRef.current) return;
    if (!primaryRef.current) return;

    const dropdownHeight = dropdownRef && dropdownRef.current?.getBoundingClientRect().height;

    if (dropdownHeight) {

      const inputTop = primaryRef.current?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - primaryRef.current!.offsetHeight;

      if (distanceFromBottom >= dropdownHeight) return;

      if (showDropdown && wrapperRef.current) {

        const pos = wrapperRef.current.style.position;
        const top = wrapperRef.current.style.top;
        wrapperRef.current.style.position = 'relative';
        wrapperRef.current.style.top = '-0px';
        wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        wrapperRef.current.style.top = top;
        wrapperRef.current.style.position = pos;
      }
    }
  }, [wrapperRef]);

  useEffect(() => {
    // widthDim > 1000 && handlePatrolizeClick(showDropdown);

  }, [showDropdown])

  if (defaultValue) {
    placeholder = defaultValue;
  }

  // const [dropdownHeight, setDropdownHeight] = useState(0);
  // console.log("dropdownHeight", dropdownHeight);

  // const [displayDirection, setDisplaydirection] = useState<'top'|'bottom'>('bottom');
  let displayDirection = 'bottom';
  const getPositionStyle = () => {
    if (!autoDropdownPosition) return {};

    if (!showDropdown) return;

    if (dropdownRef && !dropdownRef.current) return;
    if (!primaryRef.current) return;

    const dropdownHeight = dropdownRef &&  dropdownRef.current?.getBoundingClientRect().height;

    if (dropdownHeight){

      const inputTop = primaryRef.current?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = inputTop || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - primaryRef.current!.offsetHeight;

      //       if (distanceFromTop < dropdownHeight && distanceFromBottom > dropdownHeight) {
      const isTrue = distanceFromBottom >=  (filterState.length+0) * (height || 35)
      if (distanceFromTop < distanceFromBottom  || isTrue) {
        // Dropdown would overlap with top of screen, display below input
        displayDirection = 'bottom';
        return {
          // top: `${primaryRef.current?.getBoundingClientRect().height}px`,
          // bottom: "auto",
          // marginTop: '-25px',
          // // paddingTop: '35px',
          // paddingBottom: '10px'

        };
      } else  {
        // Dropdown would overlap with bottom of screen, display above input
        displayDirection = 'top';
        if (inputRef.current) {
          inputRef.current.focus();
        };
        return {
          top: "auto",
          bottom: `${primaryRef.current?.getBoundingClientRect().height}px`,
          marginBottom: '0px',
          paddingTop: '0px',
          // paddingBottom: '35px'

        };
      }

    }
  };


// Simulation of onFocus && onBlur on Input
const [firstOnFocus, setFirstOnFocus] = useState(false);
const [lockIsValid, setLockIsValid] = useState(false);
useEffect(()=>{
  if (showDropdown && !inputValue){
    setFirstOnFocus(true);
  }
  if (inputValue){
    setFirstOnFocus(false)
    setLockIsValid(true)
  }

  if (!lockIsValid){
    if (firstOnFocus && !inputValue && !showDropdown){
      onHandleBlur?.(fieldName, '')
    } else if (firstOnFocus && inputValue && !showDropdown){
      onHandleBlur?.(fieldName, inputValue)
    }
  }
}, [showDropdown, firstOnFocus, inputValue, fieldName])

// End Simulation of onFocus && onBlur on Input

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      };
    }, 100)   
  }, [showDropdown, inputRef])

  // Hover Controller State
  const [onHoverId, setOnHoverId] = useState<number|null>(null)

  return (
    <div ref={wrapperRef} className={`${s['dropdown-container']} `} onKeyDown={handleKeyDown} style={{ marginTop: dropdownContainerMarginTop, width,  }} onClick={
      (e:any)=>{
        e.preventDefault()
        e.stopPropagation()
      }}>

      {<div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${s['form_control']} ${s['input-clickable']} ${className}`}
        style={{ 
          background: !selectedInput && placeholder ? '' :(showDropdown ? '#f3f3f3' : ''), 
          position: 'relative', display: 'flex', alignItems: 'center', width: '100%', padding: '7px 5px',  
          borderColor: selectedInput && showDropdown?'transparent':displayErrorBorder ? 
          ''
          // red
          : (isHovered && !showDropdown ?color:'#ddd'), 
          // borderColor: ''
          // background: 'red',
          height
 
        }}
          onClick={(e) => { 
           !showDropdown ? onFocus(e) : onClose(e) }}
           ref={primaryRef}
        >
        <div style={{ width: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: "0 10px 0 5px",   }}>
          {!selectedInput ? <> {(placeholder ? <div style={{ opacity: 0.4, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{placeholder}</div> : '')} </> : <>{selectedInput}</>}
        </div>

        <div className={s['up-down-icon']} style={{ padding: '0px 5px', paddingTop: 0, right: 0,
            display: 'flex',
            justifyContent: 'flex-end'             
            // background: !selectedInput && placeholder ? '#f3f3f3' :(showDropdown ? '#f3f3f3' : ''), 
        }}>        
          { placeholderIcon?
            placeholderIcon
           : (showDropdown
              ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={() => setShowDropdown(false)} />
              : <CaretDownIcon className={s["dropdown-small-caret-icon"]} onClick={(e) => onFocus(e)} />)
            
          }
        </div>
      </div>}
      <div
        style={{ position: 'relative', width: '100%', height: '100%' ,             
      }}
      >
        <div
          ref={dropdownRef}
          className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}
          style={{
              // width: wrapperRef.current?.getBoundingClientRect().width,
            width: width?wrapperRef.current?.getBoundingClientRect().width: (containerWidth > dropdownWidth ? containerWidth : dropdownWidth),
            color: '#000',
            //  ...fasdfas
            position: 'absolute',
            transform: 'transformY(-100%)',
            maxHeight: showDropdown?maxHeight:'',
            // marginTop: -dropdownHeight,
            //  ...dynamicPosition
            ...getPositionStyle(),
            // align dropdown-item to left/right of the display input element 
            // right: alignDropdownTo === 'right'?`${-primaryRef?.current?.clientWidth}px`:0 
            // marginTop: `${dropdownItemsPaddingTop}px`,
            // left: alignDropdownTo === 'right'?'':0,
            marginLeft: alignDropdownTo === 'right'?`-${dropdownWidth - primaryRef?.current?.clientWidth}px`:0,
            // right: 0
            visibility: showDropdown?'visible':'hidden'
          }}
          onScroll={e => e.stopPropagation()}
        >
          <div className={``} style={{ borderColor: 'white', marginTop: 0 }}></div>
          {displayDirection === 'bottom' && <input
            onClick={(e) => !showDropdown ? onFocus(e) : () => { }}
            autoComplete='off'
            ref={inputRef}
            value={inputValue}
            data-value={inputValue}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            onBlur={onBlur}
            className={`${s['form_control']} ${showDropdown ? s['isfocus'] : ""} ${inputClassName}`}
            placeholder={!showDropdown ? placeholder : ''}
            name={fieldName}
            style={{ height, ...inputStyle, border: 'transparent', borderBottom: '1px solid #f5f5f5', borderRadius: 0 }}
          />}

          <div className={g['message-label-items']}>
            {filterState?.map((item, index) => (
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
                   index != 0 && item?.section && item?.section != filterState[index-1]?.section ? 
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
                  keyId={index}
                  autoDropdownPosition = {autoDropdownPosition}
                  textAlight = {alignDropdownTo}
                  className={s['dropdown-item']}
                  onClick={onClickSelect}
                  focusedIndex={focusedIndex}
                  handleSelection={handleSelection}
                  text={item.word}
                  length = {filterState.length}
                  onHoverId = {onHoverId} 
                  setOnHoverId = {setOnHoverId}    
                />
              </Fragment>
            ))}
          </div>
          {displayDirection === 'top' && <input
            onClick={(e) => {
              !showDropdown ? onFocus(e) : () => { }
            }}
            autoComplete='off'
            ref={inputRef}
            value={inputValue}
            data-value={inputValue}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            onBlur={onBlur}
            className={`${s['form_control']} ${showDropdown ? s['isfocus'] : ""} ${inputClassName}`}
            placeholder={!showDropdown ? placeholder : ''}
            name={fieldName}
            style={{ height, ...inputStyle, border: 'transparent', borderTop: '1px solid #f5f5f5', borderRadius: 0 }}
          />}

        </div>

      </div>
    </div>
  )
})

export default DropdownInputSmall;