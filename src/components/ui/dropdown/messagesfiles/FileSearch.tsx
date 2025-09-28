import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, type SetStateAction } from 'react'
import DetectOutsideClick from '@/components/ui/wrappers/DetectOutsideClick';
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import { shortenText } from '@/utils/functions';
import DropdownItem from './DropdownItem';
import s from './filesearch.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import uuid from 'react-uuid';
import { useMultipleInput } from '@/globalHooks/messages/useMultipleInput';
import { Cross1Icon } from '@radix-ui/react-icons';
import useQueryStringBack from '@/globalHooks/useQueryStringBack';

export interface ItemProps {
  id: number | string;
  word: string;
  key?: string | number;
  section?: string;
}

/**
 * Example Data
 * */
export const items: ItemProps[] = [
  { id: 1, word: 'item 1' },
  { id: 2, word: 'item 2' },
  { id: 3, word: 'item 3' },
];

export interface FileSearchProps {
  items: ItemProps[];
  fieldName?: string;
  onChangeForm: Function;
  placeholder?: string;
  height?: number;
  setShowMobileDropdown?: Dispatch<SetStateAction<boolean>>;
  showMobileDropdown: boolean;
  dropdownItemsPaddingTop?: number;
  shortenTextStyle?: string;
  hasTextShortener?: boolean;
  defaultValue?: string;
  allowDirection?: boolean;

  showSelectedActiveOnly?: boolean;
  clear?: boolean;
}

const FileSearch = React.memo(({ clear = false, allowDirection = false, items: any, fieldName, onChangeForm, placeholder = "Select Dropdown", height, setShowMobileDropdown, showMobileDropdown, dropdownItemsPaddingTop = 0, shortenTextStyle, hasTextShortener, defaultValue = '', showSelectedActiveOnly = false }: FileSearchProps) => {

  const { selectedOptions, handleOptionRemove, handleOptionSelect, clearSelectedOptions } = useMultipleInput();

  const [filterState, setFilterState] = useState<ItemProps[]>([]);//items
  const [items, setItems] = useState<ItemProps[]>([]);//items

  /**
   * show or hide dropdown
  */

  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [displayInput, setDisplayInput] = useState('');
  const [selectedInput, setSelectedInput] = useState('');

  const [isMobileMedia, setIsMobileMedia] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toLowerCase();

    switch (key) {
      case 'enter':
        setShowDropdown(false);
        const newItem: ItemProps = {
          id: uuid(),
          word: inputValue,
        };
        onClickSelect2(newItem.word, newItem);
        break;

      case 'escape':
        // Handle the Escape key press if needed
        setShowDropdown(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setItems(selectedOptions);
  }, [selectedOptions])

  const onFocusInput = (e: any) => {
    selectedOptions.length > 0 && setShowDropdown(true);
  }

  const onClickSelect = ({ target }: any) => {
    focusRef.current = true;

    const { textContent, dataset } = target;
    setInputValue(textContent);
    setSelectedInput(textContent);
    setShowDropdown(false);

    const item = filterState[parseInt(dataset.id)];

    const selectedItems = handleOptionSelect(item)

    /**
     * Update App State from dropdown selection
     * */

    onChangeForm({ name: fieldName, value: textContent, selectedItems });

    setTimeout(() => {
      setShowMobileDropdown && setShowMobileDropdown(false);
    }, 100);

  }

  const onClickSelect2 = (textContent: any, item: any) => {
    setInputValue(textContent);
    setSelectedInput(textContent);

    /**
     * Update App State from dropdown selection
     * */
    const selectedItems = handleOptionSelect(item)

    /**
     * Update App State from dropdown selection
     * */
    onChangeForm({ name: fieldName, value: textContent, selectedItems });
    setShowMobileDropdown && setShowMobileDropdown(false);

  }

  const onKeyUp = (e: any) => {
    let userData = e.target.value; //user enetered data
    let emptyArray: any = [];
    if (userData.length > 0) {
      emptyArray = items.filter((item) =>
        item.word.toLocaleLowerCase().startsWith(userData.toLowerCase())
      );
      setShowDropdown(true);
      setInputValue(userData);

      /**
       * Update App State from dropdown selection
       * */
      // onChangeForm({ name: fieldName, value: userData, selectedItems: selectedOptions });

      if (emptyArray.length === 0) {
        //  setActiveDiv(false);
        //  setShowDropdown(false);
        // setFilterState([]);
        setFilterState(emptyArray);


      } else {
        setFilterState(items);

      }

    } else {
      // onFocusInput(e)
      // setFilterState(items);
      setShowDropdown(false);
    }
  }

  const onChange = (e: any) => {

    const { name, value, dataset } = e.target;
    // dataset.value
    if (e.key === 'ArrowDown') {
      // Handle ArrowDown key press (e.g., focus on a suggestion list)
      setInputValue(e.target.value);
    } else {
      // Handle regular keyboard typing
      setInputValue(e.target.value);
      setDisplayInput(e.target.value)
    }
    setInputValue(value);
    setShowDropdown(true);
    !value && onFocusInput(e);
    !value && inputRef.current && inputRef.current.focus();

    onKeyUp && onKeyUp(e);
    // onChangeForm({name, value});
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");
    setIsMobileMedia(mediaQuery.matches);
    mediaQuery.addListener(() => setIsMobileMedia(mediaQuery.matches));
    return () => mediaQuery.removeListener(() => setIsMobileMedia(mediaQuery.matches));
  }, []);

  const onFocus = (e: any) => {

    setSelectedInput('');
    setInputValue('') // !filterState.length && 
    //  setFilterState([]);

    // if (inputRef.current) {
    //   inputRef.current.focus();
    // };

    // if (isMobileMedia) {
    //   setShow && setShow(false);
    // }

    onFocusInput(e);

  }

  /**
  * Outside - click enabled 
  * */

  const wrapperRef = useRef(null);

  // useOutsideAlerter({ref:wrapperRef, setToggleMenu: setShowDropdown});

  /**
   * Proxy - main exchange functionality
   * */

  const newItem = {
    id: uuid(),
    word: displayInput,
  }


  const emptyArray = filterState.filter(item => {
    const lowerCaseWord = item.word.toLowerCase();
    const lowerCaseUserData = displayInput.toLowerCase();

    return (
      lowerCaseWord !== lowerCaseUserData
    );
  });

  const focusRef = useRef(false);
  const updatedFilterState = (displayInput && filterState.length === 0) ? [newItem] :
    (!displayInput && filterState.length > 0) ? [...emptyArray] : [newItem, ...emptyArray];

  const { handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(onClickSelect2, setInputValue, updatedFilterState, allowDirection);

  useEffect(() => {
    setShowMobileDropdown && !showMobileDropdown && setInputValue(defaultValue);
    clear && clearSelectedOptions();
    setTimeout(() => {
      if (showMobileDropdown) {
        !focusRef.current && inputRef.current && inputRef.current.focus();
        focusRef.current = true;
      }
    }, 1000)

    setTimeout(() => {

      if (!showMobileDropdown) {
        focusRef.current = false
      };

    }, 3000)

  }, [clearSelectedOptions, defaultValue, clear, showMobileDropdown]);

  const goBackClick = useCallback(() => {
    setInputValue('');
    onChangeForm({ name: fieldName, value: '' });
    inputRef.current && inputRef.current.focus();
  }, [setInputValue])


  setShowMobileDropdown && useQueryStringBack({actionString: 'search', showDropdown: showMobileDropdown, setShowDropdown: setShowMobileDropdown}); // This work for controlling dropdown to navigate back to close and normal like before its open

  return (
    <DetectOutsideClick setToggleMenu={setShowDropdown} toggleMenu = {showDropdown}>
      <div
        className={`${s['dropdown-container']} `}
        onKeyDown={!showSelectedActiveOnly ? handleKeyDown : () => { }}
      >

        <span className={`${s['up-down-icon']} ${s['to-text']}`} onClick={goBackClick}>
          <AiOutlineSearch size={20} />
        </span>

        <span className={`${s['up-down-icon']} ${s['cross']}`}>
          <Cross1Icon onClick={goBackClick} />
        </span >

        <input
          autoComplete='off'
          ref={inputRef}
          value={hasTextShortener ? shortenText(inputValue, 13) : inputValue}
          onChange={onChange}
          onFocus={e => {
            // if (isMobileMedia) {
            //   setShow & setShow(false);
            // }
            onFocusInput(e);
          }}
          onKeyDown={handleKeyPress}
          onBlur={e => { }}
          className={`${s['dropdown-input']} ${s['form_control']} ${shortenTextStyle} ${showDropdown ? s['isfocus'] : ""}`}
          placeholder={placeholder}
          style={{ height }}
          name={`search_input_${Math.random().toString(36).substring(2)}`}
        />

        <div className={`${s['dropdown-items']} ${showDropdown ? s.show : ''}`}
          style={{
            paddingTop: `${dropdownItemsPaddingTop}px`,
          }}
        >
          {updatedFilterState?.map((item, index) => (
            <Fragment key={index}>
              <DropdownItem
                keyId={index}
                className={s['dropdown-item']}
                onClick={onClickSelect}
                focusedIndex={focusedIndex}
                handleSelection={handleSelection}
                text={item.word}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </DetectOutsideClick>
  )
})

export default FileSearch;