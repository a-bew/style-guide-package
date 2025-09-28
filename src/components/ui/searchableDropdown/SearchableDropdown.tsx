import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, memo } from 'react'
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './searchabledropdown.module.scss';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { shortenText } from '@/utils/functions'
import DropdownItem from '@/components/ui/dropdown/DropdownItem';
import { type ItemProps } from '../dropdown/dropdowninputtype';
import ImageOnline from '@/components/ui/ImageOnline';

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

}

const SearchableDropdownInputSmall = ({items, fieldName, className, index, totalFields, displayIndexInfo = false, onChangeForm, label, setShow, placeholder, maxWidth = '100%', minWidth = '130px', height, setShowMobileDropdown, showMobileDropdown, mainFromProxyInput, dropdownItemsPaddingTop = 0, dropdownContainerMarginTop='0px', hasTextShortener, onInputChange, defaultValue, allowDirection=false, onBlur, inputClassName, width, disableOnchanged = false,  dropdownSide = 'bottom' }:Props) => {

  const [filterState, setFilterState] = useState<ItemProps[]>([]);//items
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedInput, setSelectedInput] = useState('');
  
  const [itemKey, setItemKey] = useState<any>(null);

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
    // setFilterState(items);
   setShowDropdown(true);
  }

  const onClickSelect = ({ target, currentTarget }: any) => {
    const { textContent } = target;
    setInputValue(textContent);
    setSelectedInput(textContent);
    setShowDropdown(false);
    setShow && setShow(true);


    const currentIndex = currentTarget.getAttribute('data-id')
    setItemKey(items[currentIndex].item);

    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent});

  }

  const onClickSelect2 = (textContent:any, item:any) => {
    setInputValue(textContent);
    setSelectedInput(textContent);
    setItemKey(item.itemKey);
    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent});
  }

  const onKeyUp = (e:any)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray:any = [];
    if(userData.length>2){
      emptyArray = items.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);

      setFilterState(emptyArray);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */ 
      // onChangeForm({name:fieldName, value:userData});

      if (emptyArray.length === 0){
          //  setActiveDiv(false);
         // setShowDropdown(false);
      }
        
    }else{
      // onFocusInput(e)
      setFilterState([]);

    }
  }

  const selectItemKey = (e:any) => {
    const currentIndex = e.currentTarget.getAttribute('data-id')
    currentIndex > -1 && 'item' in Object(items[currentIndex]) 
    // && setItemKey(items[currentIndex].item);
  }

  const onChange = (e:any)=>{
    const {name, value, dataset} = e.target;
    // dataset.value
    setInputValue(value);
    !value && onFocusInput(e);
    onKeyUp && onKeyUp(e);
    // selectItemKey(e);
  
    // onChangeForm({name, value});
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    setIsMobileMedia(mediaQuery.matches);
    mediaQuery.addListener(() => setIsMobileMedia(mediaQuery.matches));
    return () => mediaQuery.removeListener(() => setIsMobileMedia(mediaQuery.matches));
  }, []);

  const onFocus = (e:any) => {

    // setSelectedInput('');
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

  // useEffect(()=>{
  //   mainFromProxyInput && onClickSelect2(mainFromProxyInput);
  // }, [mainFromProxyInput])

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

  const handleCloseDropdown = () => {
      setHoveredItem(null); // Close the currently open dropdown
  };

  const onMouseHover = (event:any) => {

    handleHover(event, fieldName)

  };

  const onMouseLeave = () => {
    // window.innerWidth > 960 && setDropdown(false);
    handleCloseDropdown();
  };

    

  // const onMouseEnter = (event:any) => {

  //   handleHover(event, fieldName)

  //   !dropdown && window.innerWidth > 960 && setDropdown(!dropdown);

  //   if(!('submenu' in items) && isMenu){
  //     if (depthLevel > 0){
  //         navigate(items.url.toLocaleLowerCase(), {replace : false});
  //         handleActiveNavMenuClick(items.key)
  //     } else {
  //         onClick({text: items.key, url: items.url});
  //     }
  //   }

  // };

  let dropdownPositions = dropdownPositionsRight;

  if (dropdownSide ==='bottom'){
    dropdownPositions = dropdownPositionsBottom;
  }

  const inputStyle = disableOnchanged?{cursor: 'pointer', caretColor: 'transparent',}: {};

  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const assetGetRef = useCallback((current: any) => {
    if (current) {
      let width = current?.clientWidth;

      width && setContainerWidth(width);
    }
  }, []);
  
  return (
    <div ref={wrapperRef} className={`${s['dropdown-container']} ${className}`}  onKeyDown = {handleKeyDown} style = {{maxWidth, minWidth, marginTop: dropdownContainerMarginTop, width }} >
    
      {<div ref = {assetGetRef} className = {`${s['form_control']} ${s['input-clickable']}`} style = {{ zIndex: 200, margin: '0px', width: '100%' }} onClick={(e)=>{setShowDropdown(true);onFocus(e)}}
              onMouseEnter={(event: any)=> onMouseHover(event)}
              // onMouseLeave={onMouseLeave}        
      >
            <span style = {{display: 'flex', justifyContent: 'flex-start', paddingLeft: itemKey?0:10, paddingRight: 10}}>
              <span style={{display: 'flex', gap: 10, alignItems: 'center'}}>

              {itemKey &&  <ImageOnline avatarUrl={itemKey.avatar} alt={ ''} isOnline={itemKey.active} name = {itemKey.author} width={20} height={20} />}
    
                {/* {(!showDropdown && !filterState.length) ?<span style = {{color: '#ccc', }}> { placeholder } </span>:<span>{selectedInput}</span>} */}
                {!selectedInput ?
                <span style = {{color: '#ccc', }}> 
                { placeholder } </span>:
                <span>{selectedInput}</span>}
  
              </span>          
              
          {/* {<span style = {{display: 'flex', justifyContent: 'flex-end', color: '#ccc'}}>Search for a product...</span>} */}

            </span>
            <span className={s['up-down-icon']} style = {{display: 'flex', justifyContent: 'flex-end'}}>
              {
                showDropdown
                        ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={()=>setShowDropdown(false)} />
                        : <CaretDownIcon className={s["dropdown-small-caret-icon"]}  onClick={(e)=>onFocus(e)}/>
              }          
            </span>
            
          </div>}

      <div style={{position: 'relative',}}>
      <div ref={dropdownRef} className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}  style  = {{
        position: 'fixed',
        // top: position.top,
        // left: position.left,   
        width: `${containerWidth || 300}px`,
        color: '#000',
        ...dropdownPositions[fieldName],     
      }} >

        <div className = {``} style = {{width: '100%',borderColor: 'white', marginTop: 10, display: 'flex', justifyContent: 'flex-start'}}>
          {/* <span style = {{ color: '#ccc'}}>Search for a product...</span> */}
          {/* <span className={s['up-down-icon']} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            {
              showDropdown
                      ? <CaretUpIcon className={s["dropdown-small-caret-icon"]} onClick={()=>setShowDropdown(false)} />
                      : <CaretDownIcon className={s["dropdown-small-caret-icon"]}  onClick={(e)=>onFocus(e)}/>
            }          
          </span> */}
          
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

       {inputValue.length <= 2 && !filterState.length && <Fragment key={index}>
                   <div
                       // ref = {resultContainer}
                       style = 
                       {{
                           width: '100%',
                           // textAlign: 'center',
                           padding: '10px',
                       }}
                   >
                       Please Enter 3 or more character
                   </div>
       
                 </Fragment>}


       {inputValue.length > 2 && !filterState.length && <Fragment key={index}>
                   <div
                       // ref = {resultContainer}
                       style = 
                       {{
                           width: '100%',
                           // textAlign: 'center',
                           padding: '10px',
                       }}
                   >
                       No matches found
                   </div>
       
                 </Fragment>}

      

        { filterState?.map((item, index) => (
          <Fragment key={index}>
            <DropdownItem
              keyId = {index}
              // key={item.id}
              // className={`${s['dropdown-item']} ${index === selectedIndex ? s['selected'] : ''}`}
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
  )
}

export default memo(SearchableDropdownInputSmall);