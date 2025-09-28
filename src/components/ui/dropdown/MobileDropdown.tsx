import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback } from 'react'
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './mobiledropdown.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { type ItemProps } from './dropdowninputtype';
import DropdownItem from './DropdownItem';
import useWindowDimensions from '@/globalHooks/useWindowDimensions';
import SliderPane from '../allfilter/SliderPane';
import { BiArrowBack } from 'react-icons/bi';
import KeyboardOpenOrClose from '@/globalHooks/keyboard/KeyboardOpenOrClose';
import { useDispatch } from 'react-redux';
import useQueryStringBack from '@/globalHooks/useQueryStringBack';
import useCurentTheme from '@/globalHooks/useCurentThem';
import {  type DropdownInputSmallProps } from './DropdownInputSmall';

export interface MobileDropdownProps {
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
  displayErrorBorder?: boolean;

  /**
   * This should disable typing into the input element of the dropdown component
   * */
  disableOnchanged?: boolean;
  dropdownSide?: 'right' | 'bottom';
  showSelectedActiveOnly?: boolean;
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

const MobileDropdown = React.memo(({ items, fieldName, className, index, mainFromProxyInput, totalFields, displayIndexInfo = false, dropdownSide = 'bottom', onChangeForm, label, setShow, placeholder, maxWidth = '100%', height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 35, dropdownContainerMarginTop = '0px', hasTextShortener, onInputChange, defaultValue = '', allowDirection = false, onBlur, inputClassName, width, disableOnchanged = false, showSelectedActiveOnly =  false, displayErrorBorder }: DropdownInputSmallProps) => {

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

  const [position, setPosition] = useState<{ top?: number; bottom?: number; left: number }>({ left: 0 });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { color } = useCurentTheme();

  const [isFixed, setIsFixed] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        event.preventDefault(); // Prevent default behavior
        // Handle the Arrow Down key press here
        setIsFixed(true);
        resetTimeout()
        break;
      case 38:
        event.preventDefault(); // Prevent default behavior
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

  const onClose = () => {
    // Set selected index to zero at every new focus
    setFilterState([]);
    setShowDropdown(false);
  }

  const onClickSelect = ({ target, currentTarget }: any) => {
    if (showSelectedActiveOnly){
      setShowDropdown(false);
      
      return;
    }

    const { textContent, dataset } = target;
    setInputValue(textContent);
    setSelectedInput(textContent);
    setShowDropdown(false);
    setShow && setShow(true);

    const currentIndex = currentTarget.getAttribute('data-id');
    
    console.log("currentIndex", items[currentIndex])
    /**
     * Update App State from dropdown selection
     * */
    onChangeForm({ name: fieldName, value: textContent, item: items[currentIndex]?.item || items[currentIndex] });

  }

  const onClickSelect2 = useCallback((textContent: any, item: any) => {
    setInputValue(textContent);
    setSelectedInput(textContent);
    /**
     * Update App State from dropdown selection
     * */
    onChangeForm({ name: fieldName, value: textContent, item: item.item });
  }, [fieldName, onChangeForm])

  const onKeyUp = (e: any) => {
    let userData = e.target.value; //user enetered data
    let emptyArray: any = [];
    if (userData) {
      emptyArray = items.filter((item: any) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);

      setFilterState(emptyArray);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */
      onChangeForm({ name: fieldName, value: userData,  });

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

  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    };
  })

  /**
  * Outside - click enabled 
  * */

  const wrapperRef: any = useRef(null);

  useOutsideAlerter({ ref: wrapperRef, setToggleMenu: setShowDropdown, toggleMenu: showDropdown });

  /**
   * Proxy - main exchange functionality
   * */

  // useEffect(() => {
  //   mainFromProxyInput && onClickSelect2(mainFromProxyInput);
  // }, [mainFromProxyInput, onClickSelect2])

  const { handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, filterState, allowDirection);

  const style = { paddingTop: `${dropdownItemsPaddingTop}px`, ...position };

  /**
   * Set/update default input value for dropdown
   * */
  useEffect(() => {
    defaultValue && setInputValue(defaultValue);
  }, [defaultValue]);

  const [dropdownPositionsBottom, setDropdownPositionsBottom]: any = useState({});

  let dropdownPositions = dropdownPositionsBottom; //dropdownPositionsRight;

  const [containerWidth, setContainerWidth] = useState(0);

  const { width: widthDim } = useWindowDimensions()

  useEffect(() => {
    if (!wrapperRef?.current) return;
    let clientWidth: any = wrapperRef?.current?.clientWidth;
    clientWidth && setContainerWidth(clientWidth);

  }, [wrapperRef?.current?.clientWidth, widthDim])

  const primaryRef = useRef(null);

  const handleScroll = useCallback((e: any) => {

    if (!dropdownRef.current) return;

    if (primaryRef.current) {
      const node: any = primaryRef.current;
      const adjacentElement = dropdownRef.current; // Replace with the correct ID or selector

      const { top, left, width, height } = node.getBoundingClientRect();
      const dropdownHeight = adjacentElement.getBoundingClientRect().height;

      let position: any = {};

      if (top < dropdownHeight) {
        position = {
          top: top + height,
          left: left,
          position: 'fixed'
          // bottom: 'inherit',
        };
      } else {
        position = {
          bottom: height,
          left: left,
          position: 'fixed',
          // top: 'inherit',
        };
      }

      adjacentElement.style.bottom = position.bottom;
      adjacentElement.style.left = position.left;
      adjacentElement.style.top = position.top;

      setDropdownPositionsBottom({ ...dropdownPositionsBottom, [fieldName]: position, });

    }
  },
    [dropdownRef, primaryRef])

  useEffect(() => {

    // const dropdown = dropdownRef.current;
    if (showDropdown) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('touchmove', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchmove', handleScroll)
      };
    }
  }, [showDropdown]);

  const dispatch = useDispatch();

  const keyboardIsOpen = KeyboardOpenOrClose();


  const real_placeholder = placeholder;
  if (defaultValue) {
    placeholder = defaultValue;
  }

  const { testAnonymous }  = useQueryStringBack({actionString: 'dropdown', showDropdown, setShowDropdown}); // This work for controlling dropdown to navigate back to close and normal like before its open

  return (

    <div ref={wrapperRef} className={`${s['mobile-dropdown']} ${s['dropdown-container']} ${className}`} onKeyDown = {!showSelectedActiveOnly? handleKeyDown:()=>{}} style={{ marginTop: dropdownContainerMarginTop, width }} >

      {<div
        className={`${s['form_control']} ${s['input-clickable']}`}
        // zIndex: 200,
        style={{ background: showDropdown ? '#eee' : '', position: 'relative', display: 'flex', alignItems: 'center', width: '100%', padding: '2px 5px', border: "1px solid #ced4da" }}
        onClick={(e) => { 
          !showDropdown ? onFocus(e) : onClose();  
          testAnonymous();
        }}
        //   onMouseEnter={(event: any)=> onMouseHover(event)}
        ref={primaryRef}
      >

        <span style={{ width: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: "0 10px 0 5px" }}>
          {!selectedInput ? <> {(placeholder ? <span style={{ opacity: 0.4, whiteSpace: 'nowrap', textOverflow: 'ellipsis'
            // , overflow: 'hidden'
           }}>{placeholder}</span> : '')} </> : <>{selectedInput}</>}
        </span>

        <span className={s['up-down-icon']} style={{ padding: '0px 5px', paddingTop: 5, right: 0, background: showDropdown ? '#eee' : '#fff', }}>
          {
            showDropdown
              ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={() => { setShowDropdown(false);  }} />
              : <CaretDownIcon className={s["dropdown-small-caret-icon"]} onClick={(e) => { onFocus(e);  }} />
          }
        </span>
      </div>}

      {showDropdown && <SliderPane top={0} startAnimation={showDropdown} slideType='up'>
        <div className={`${s.header} `} style={{ height: '50px', display: 'flex', gap: 20, alignItems: 'center' }} onClick={() => { setShowDropdown(!showDropdown); testAnonymous() }} >
          <BiArrowBack className={s.backArrrowIcon} />
          <h1 className={`${g['main-title']}`} >Back </h1>
        </div>
        <div
          ref={dropdownRef}
          className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}
          style={{
            width: '100%',//containerWidth > 250? containerWidth: 250 ,
            color: '#000',
            position: 'absolute',
          }}
          onScroll={e => e.stopPropagation()}
        >

{label?<>

<div className={``} style={{ borderColor: 'white' }}>
          </div>
          <div style={{ width: "100%"}}>
            <p className={s['label']} > {label } </p>
          </div>


</>: null}
          <input
            onClick={(e) => !showDropdown ? onFocus(e) : () => { }}
            autoComplete='off'
            ref={inputRef}
            value={inputValue}
            data-value={inputValue}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            onFocus={e => {
              if (isMobileMedia) {
                if (setShowMobileDropdown) {
                  setShowMobileDropdown(true);
                }
                setShow && setShow(false);

              }
              onFocusInput(e);
            }}
            onBlur={onBlur}
            className={`${s['form_control']} ${showDropdown ? s['isfocus'] : ""} ${inputClassName}`}
            placeholder={selectedInput || real_placeholder}
            name={fieldName}
            style={{ height, }}
          />

          <div className={g['message-label-items']}>

            {filterState?.map((item, index) => (
              <Fragment key={index}>
                <DropdownItem
                  keyId={index}
                  className={s['dropdown-item']}
                  onClick={onClickSelect}
                  focusedIndex={focusedIndex}
                  handleSelection={handleSelection}
                  text={item.word}
                  showSelectedActiveOnly = { showSelectedActiveOnly }
                />
              </Fragment>
            ))}
          </div>
        </div>
      </SliderPane>}

    </div>
  )
})


export default MobileDropdown;