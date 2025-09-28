import React, {type Dispatch, useState, useEffect, useRef } from 'react'
import DetectOutsideClick from '@/components/ui/wrappers/DetectOutsideClick';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { iconSize } from '@/utils/constants'
import useWindowDimensions from '@/globalHooks/useWindowDimensions';
import DropdownItem from './DropdownItem';
import { type ItemProps }  from './dropdowninputtype';
import s from './dropdowninput.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { useDefaultValueFeatures } from './DropdownInputSmall';
// import useQueryStringBack from '@/globalHooks/useQueryStringBack';
import useKeyScrollNoInput from '@/globalHooks/useKeyScrollNoInput';

/**
 * Example Data
 * */
export const items: ItemProps[] = [
  { id: 1, word: 'item 1' },
  { id: 2, word: 'item 2' },
  { id: 3, word: 'item 3' },
];

export interface DropdownInputProps {
  items: ItemProps[];
  fieldName?: string;
  totalFields?: number;
  index?: number;
  displayIndexInfo?: boolean; 
  onChangeForm: Function;
  label?: string;
  setShow?: any;
  placeholder?: string;
  height?: number;
  setShowMobileDropdown?: Dispatch<boolean>;
  showMobileDropdown?: boolean;
  dropdownItemsPaddingTop?: number;
  shortenTextStyle?: string;
  hasTextShortener?: boolean;

  defaultValue?: string;
  showSelectedActiveOnly?: boolean;
  globalClass?: string;
  show?: boolean;
}

const DropdownInput = React.memo(({show, items, fieldName, index, totalFields, displayIndexInfo = false, onChangeForm, label, setShow, placeholder="Select Dropdown", height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 45, shortenTextStyle, hasTextShortener, defaultValue = '', showSelectedActiveOnly =  false, globalClass = g['responsive_formm']}:DropdownInputProps) => {

  const { width } = useWindowDimensions();

  const [filterState, setFilterState] = useState<ItemProps[]>(items);
  /**
   * show or hide dropdown
  */
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMobileMedia, setIsMobileMedia] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedIndex, setSelectedIndex } = useDefaultValueFeatures({ defaultValue, setInputValue, filterState });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

    switch (event.keyCode) {
      // Enter pressed
      case 13:
        setShowDropdown(false);
        setShowMobileDropdown && setShowMobileDropdown(false)
        break;
      default:
        break;
    }

  };

  const onFocusInput = () => {
    // Set selected index to zero at every new focus
    setFilterState(items);
    setShowDropdown(true);
  }

  const onClickSelect = ({ target }: any) => {

    setShow && setShow(false);

    if (showSelectedActiveOnly){
      setShowDropdown(false);      
      return;
    }
  
    const { textContent, dataset } = target;
    setInputValue(textContent);
    setShowDropdown(false);

    /**
     * Turn off display for Main Dropdown, which was activated by a proxy input dropdown
     * */ 
    setShowMobileDropdown && setShowMobileDropdown(false)

    /**
     * Proxy - main exchange functionalities
     * */ 
    // const item = filterState.find((data:any)=>data.id===dataset.id);
    const item = filterState.find((data:any)=>`${data.id}` === `${parseInt(dataset.id) + 1}`);

    setSelectedIndex(textContent);  // New

    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent, item});

  }

  const onClickSelect2 = (textContent:any, selectedItem: any) => {
    setShow && setShow(false);
    setInputValue(textContent);

    setSelectedIndex(textContent);  // New

    /**
     * Update App State from dropdown selection
     * */ 
    onChangeForm({name:fieldName, value:textContent, item:selectedItem});

  }

  const onKeyUp = (e:any)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray:any = [];
    if(userData){
      emptyArray = filterState.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);

      setFilterState(emptyArray);
      // setInputValue(userData);

      if (emptyArray.length === 0){
        setShowDropdown(false);
      }

      /**
       * Update App State from dropdown selection
       * */ 
      // onChangeForm({name:fieldName, value:userData});

        
    }else{
      onFocusInput()
    }
  }

  const onChange = (e:any)=>{
    const {name, value} = e.target;
    setInputValue(value);
    !value && onFocusInput();
    onKeyUp && onKeyUp(e);

    //onChangeForm({name, value})
  }

  // useEffect(() => {

  //   const mediaQuery = window.matchMedia("(max-width: 650px)");

  //   setIsMobileMedia(mediaQuery.matches);
  
  //   mediaQuery.addListener(() => setIsMobileMedia(mediaQuery.matches));
      
  //   return () => mediaQuery.removeListener(() => setIsMobileMedia(mediaQuery.matches));

  // }, []);

  const onFocus = () => {

    if (inputRef.current) {
      inputRef.current.focus();
    };

    // if (isMobileMedia){
    //   setShow &&  setShow(false);
    // }

    onFocusInput();

  }

  useEffect(()=>{
      showMobileDropdown && onFocus()
  }, [showMobileDropdown])

  const showRef = useRef(false);

  // useEffect(()=>{
    
  //   setShow &&  setShow(showDropdown);

  //   setTimeout(()=>{
  //     if (!showRef.current && show && !showDropdown){
  //         onFocus();
  //         showRef.current = true; 
  //     }
  //   }, 1)

   
  // }, [show, showDropdown])

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {handleKeyDown, handleSelection, focusedIndex } = useKeyScrollNoInput({onClickItem2: onClickSelect2, setSelectedWord:setInputValue, suggestionListing:filterState, dropdownRef, setShowDropdown, showDropdown});
 
  // useQueryStringBack( width <= 550 ?{
  //     actionString: 'dropdown', 
  //     showDropdown, 
  //     setShowDropdown: width <= 550? setShowDropdown : ()=>{
  //       const updatedSearch = new URLSearchParams(location.search);
  //       updatedSearch.delete('action'); // Remove the "action" parameter
  //     }
  //   }:{
  //     actionString: '', 
  //     showDropdown, 
  //     setShowDropdown: ()=>{}
  //   }); // This work for controlling dropdown to navigate back to close and normal like before its open
   
  return (
    <DetectOutsideClick setToggleMenu={setShowDropdown} toggleMenu = {showDropdown} style={{width: '100%'}}>
      <div 
        ref = {dropdownRef} className={`${s['dropdown-container']} ${globalClass} `} 
        onKeyDown = {!showSelectedActiveOnly? handleKeyDown:()=>{}} 
        style = { width<=650?{width : `${width-20}px`}:{} }
      >
      <div
        onClick={(e)=>!showDropdown && onFocus()}
        style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}
        className={`${s['dropdown-input']} ${s['form_control']} ${shortenTextStyle} ${showDropdown?s['isfocus']:""}`}
      >
      { !inputValue?<span style={{ opacity: 0.4, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{placeholder}</span>:inputValue }
        <span 
          // className={s['up-down-icon']} 
          style={{paddingTop:5}}
          // style = {{display: 'flex', position: 'absolute', right: 0, top: '40px', paddingRight: '16px', flex:1, zIndex: showDropdown?105:''}}
        >
          {showDropdown
                    ? <IoMdArrowDropdown size={iconSize} onClick={()=>setShowDropdown(false)} />
                    : <IoMdArrowDropup
                      size={iconSize}  
                       onClick={(e)=>!showDropdown? onFocus():()=>{()=> showDropdown && setShowDropdown(false)}}
                    />}          
        </span>                
      </div>

      <div className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`} style = {{paddingTop: `${dropdownItemsPaddingTop}px`}}>
        {filterState?.map((item, index) => (
            <DropdownItem
              key = {item.id}
              keyId = {index}
              // key={item.id}
              // className={`${s['dropdown-item']} ${index === selectedIndex ? s['selected'] : ''}`}
              className={s['dropdown-item']}
              onClick={onClickSelect}
              focusedIndex = { focusedIndex > -1 ? focusedIndex : selectedIndex }
              handleSelection={handleSelection}
              text = {item.word}
              showSelectedActiveOnly = { showSelectedActiveOnly }

            />              
        ))}
      </div>

      </div>
    </DetectOutsideClick>
  )
})

export default DropdownInput;