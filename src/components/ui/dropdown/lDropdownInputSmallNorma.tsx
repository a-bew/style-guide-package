import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, type SetStateAction } from 'react'
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './namesearchabledropdown.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { type ItemProps } from './dropdowninputtype';
import DropdownItem from './DropdownItem';
import { shortenText } from '@/utils/functions';
import useWindowDimensions from '@/globalHooks/useWindowDimensions';
import { camelCaseToSentenceCase } from '@/utils/functions';
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

const DropdownInputSmall = ({items, fieldName, className, index, mainFromProxyInput, totalFields, displayIndexInfo = false, dropdownSide = 'bottom', onChangeForm, label, setShow, placeholder, maxWidth = '100%', height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 35, dropdownContainerMarginTop='0px', hasTextShortener, onInputChange, defaultValue = '', allowDirection=false, onBlur, inputClassName, width, disableOnchanged = false}:Props) => {

  const [filterState, setFilterState] = useState<ItemProps[]>([]);//items
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [selectedInput, setSelectedInput] = useState('');

  useDefaultValueFeatures({ defaultValue, setInputValue, filterState });

  const [isMobileMedia, setIsMobileMedia] = useState(false);
  const { scrollX, scrollY } = useWindowScrollPositions();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top?: number; bottom?: number; left: number }>({ left: 0 });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isFixed, setIsFixed] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      let timeoutId:any = null;

      const resetTimeout = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsFixed(false);
        }, 5000);
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
        // You can implement logic to navigate within the dropdown options, for example, selecting the next item.
        setIsFixed(true);
        resetTimeout()
        break;
      case 38:
        event.preventDefault(); // Prevent default behavior

        // Handle the Arrow Up key press here
        // You can implement logic to navigate within the dropdown options, for example, selecting the previous item.
         setIsFixed(true);

         // Call resetTimeout whenever you want to reset the timeout
         resetTimeout();
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

  const wrapperRef:any = useRef(null);

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
    defaultValue && setInputValue(defaultValue);
  }, [defaultValue]);

  // const [disableOnchanged, setDisableOnchanged] = useState(false);

  /**
   * Input styles
   * */

  const inputStyle = disableOnchanged?{cursor: 'pointer', caretColor: 'transparent',}: {};

  const [hoveredItem, setHoveredItem] = useState<string|null>(null);
  
  // const [dropdownPositionsRight, setDropdownPositionsRight]:any = useState({});  
  const [dropdownPositionsBottom, setDropdownPositionsBottom]:any = useState({});  

  const handleHover = (event: any, itemId: string) => {
      if (itemId) { 
        
        let { top, left, width, right, bottom, height } = event.currentTarget.getBoundingClientRect();

        const dropdownLeft = left + width; // Calculate the right end of the li

        const dropdownHeight = dropdownRef &&  dropdownRef.current?.getBoundingClientRect().height || 100; ;

      let position = {}

      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = top || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - top! - event.currentTarget!.offsetHeight;


      if (distanceFromTop < dropdownHeight && distanceFromBottom > dropdownHeight) {
        // Dropdown would overlap with top of screen, display below input
          position = {

            top : top + height, left:left, position: 'fixed',

        };
      } else if (distanceFromBottom < dropdownHeight) {
        // Dropdown would overlap with bottom of screen, display above input
        position = {
          // top: "auto",
          bottom:  height,//`${inputRef.current?.getBoundingClientRect().height}px`,
           left:left,
           position: 'fixed',
        };
      } else {
        // Dropdown fits in viewport, display below input
        position = { top : top + height, left:left, position: 'fixed', };
       }

      setDropdownPositionsBottom({ ...dropdownPositionsBottom, [itemId]: position });

      }
      setHoveredItem(itemId);
  };


  const onMouseHover = useCallback((event:any) => {
  
      handleHover(event, fieldName);
  
    }, [scrollY]);

  let dropdownPositions = dropdownPositionsBottom; //dropdownPositionsRight;

  const [containerWidth, setContainerWidth]:any = useState();

  const { width: widthDim } = useWindowDimensions()

  useEffect(()=>{
      const current:any = wrapperRef.current;
      let clientWidth:any = current.clientWidth;
      clientWidth && setContainerWidth(clientWidth); 

      // const spaceAbove = wrapperRef.current.getBoundingClientRect().top;
      // const spaceBelow = window.innerHeight - spaceAbove - wrapperRef.current.clientHeight;

      // const top = spaceAbove > spaceBelow
      //   ? `${wrapperRef.current.offsetTop - dropdownHeight}px` 
      //   : `${wrapperRef.current.offsetTop + wrapperRef.current.clientHeight}px`;

      // setPosition({
      //   top, 
      //   left: wrapperRef.current.offsetLeft
      // });

  }, [wrapperRef.current, widthDim])

  // const dropdownRef = useCallback((current)=>{
  //     if (containerWidth && current && containerWidth < current?.clientWidth ){
  //       current.style.width = current?.clientWidth
  //     }
  // },  [containerWidth])

  // if (dropdownSide ==='bottom'){
  //   dropdownPositions = dropdownPositionsBottom;
  // }

// const primaryRef = useCallback((node: any) => {

//       if (node && showDropdown) { 
        
//         let { top, left, width, right, bottom, height } = node.getBoundingClientRect();

//         const dropdownLeft = left + width; // Calculate the right end of the li

//         const dropdownHeight = node.nextSiblings?.getBoundingClientRect().height;

//         let position = {}

//         const viewportHeight = window.innerHeight;

//         // Calculate distance from input to the top of the screen
//         const distanceFromTop = top || 0;

//         // Calculate distance from input to the bottom of the screen
//         const distanceFromBottom = viewportHeight - top! -node!.offsetHeight;

//         if (distanceFromTop < dropdownHeight && distanceFromBottom > dropdownHeight) {
//           // Dropdown would overlap with top of screen, display below input
//             position = {
//               top : top + height, left:left, bottom: '',
//           };
//         } else if (distanceFromBottom < dropdownHeight) {
//           // Dropdown would overlap with bottom of screen, display above input
//           position = {
//             bottom:  height,
//              left:left,
//             top: '',
//           };
//         } else {
//           // Dropdown fits in viewport, display below input
//           position = { top : top + height, left:left, bottom };
//         }

//         const adjacentElement = node.nextSibling; // Assuming the adjacent element is the next sibling

//         adjacentElement.style.bottom = position.bottom;
//         adjacentElement.style.left = position.left; 
//         adjacentElement.style.top = position.top;

//       }
//   }, [scrollX, scrollY, showDropdown]);

  const primaryRef = useRef(null);

useEffect(() => {
    function handleScroll() {
      console.log("dfasdfafsd")
      if (!dropdownRef.current) return;

      if (primaryRef.current) {
        const node:any = primaryRef.current;
        const adjacentElement = dropdownRef.current; // Replace with the correct ID or selector

        const { top, left, width, height } = node.getBoundingClientRect();
        const dropdownHeight = adjacentElement.getBoundingClientRect().height;

        let position:any = {};

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
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);

  }, [scrollY]);



useEffect(() => {
    const handleScroll = (e:any) => {
      e.preventDefault(); 
    };
    
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener('scroll', handleScroll);
      dropdown.addEventListener('touchmove', handleScroll);


      return () => {
        dropdown.removeEventListener('scroll', handleScroll);
        dropdown.removeEventListener('touchmove', handleScroll)
      };
    }
  }, [showDropdown]);

    const handlePatrolizeClick = useCallback((showDropdown: boolean) => {

        if (showDropdown && wrapperRef.current){
    
          const pos = wrapperRef.current.style.position;
          const top = wrapperRef.current.style.top;
          wrapperRef.current.style.position = 'relative';
          wrapperRef.current.style.top = '-60px';
          wrapperRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
          wrapperRef.current.style.top = top;
          wrapperRef.current.style.position = pos;
    
        }
    }, [wrapperRef]);


    useEffect(()=>{
      widthDim < 1000 &&  handlePatrolizeClick(showDropdown);
    }, [showDropdown])

  if (defaultValue){
    placeholder =  defaultValue;
  }
  
  const fasdfas = widthDim < 1000  ? { position: 'absolute',} :  dropdownPositions[fieldName];
//:
  return (
      <div ref={wrapperRef} className={`${s['dropdown-container']} ${className}`}  onKeyDown = {handleKeyDown} style = {{marginTop: dropdownContainerMarginTop, width}} >
      
        {<div 
          className = {`${s['form_control']} ${s['input-clickable']}`} 
          style = {{ zIndex: 200,   background: showDropdown?'#eee':'', position: 'relative', display: 'flex', alignItems: 'center', width: '100%', padding:'2px 5px'}} 
          onClick={(e)=>{!showDropdown? onFocus(e): onClose()}}
          onMouseEnter={(event: any)=> onMouseHover(event)}
          ref = { primaryRef }
        >
            <span  style = {{width: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: "0 10px 0 5px"}}>
              {!selectedInput ?<> { (defaultValue) || (placeholder?<span style = {{opacity: 0.4, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{placeholder}</span>:'') } </>:<>{selectedInput}</>}
            </span>

            <span className={s['up-down-icon']} style = {{padding: '0px 5px', paddingTop: 5, right: 0, background: showDropdown?'#eee':'#fff', }}>
              {
                showDropdown
                        ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={()=>setShowDropdown(false)} />
                        : <CaretDownIcon className={s["dropdown-small-caret-icon"]}  onClick={(e)=>onFocus(e)}/>
              }          
            </span>              
        </div>}
        <div style = {{position: 'relative', width: '100%'}}>
          <div 
            ref={dropdownRef}
            // id="adjacent-element"
           className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}  
           style  = {{
              width: containerWidth > 250? containerWidth: 250 ,
              color: '#000',
                   ...fasdfas
            }}
          >
            <div className = {``} style = {{borderColor: 'white', marginTop: 10}}>
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

export default DropdownInputSmall;