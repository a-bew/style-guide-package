import React, { type Dispatch, Fragment, useState, useEffect, useRef, useCallback, type SetStateAction } from 'react';
import useTabKeyScroll from '@/globalHooks/useTabKeyScroll';
import useOutsideAlerter from '@/globalHooks/useOutsideAlerter';
import s from './namesearchabledropdown.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';
import { type ItemProps } from './dropdowninputtype';
import DropdownItem from './DropdownItem';

export interface TypeaheadDropdownProps {
  items: ItemProps[];
  fieldName: string;
  onChangeForm: Function;
  placeholder?: string;
  maxHeight?: string;
  defaultValue?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onHandleBlur?: (name: string, value: string) => void;
  dropdownWidth?: number;
  alignDropdownTo?: 'left' | 'right';
  autoDropdownPosition?: boolean;
  height?: number;
}

const TypeaheadDropdown = React.memo(({
  items,
  fieldName,
  onChangeForm,
  placeholder,
  maxHeight = "55vh",
  defaultValue = '',
  isOpen,
  setIsOpen,
  onBlur,
  onHandleBlur,
  dropdownWidth = 250,
  alignDropdownTo = 'left',
  autoDropdownPosition = true,
  height = 35
}: TypeaheadDropdownProps) => {
  const [filterState, setFilterState] = useState<ItemProps[]>(items);
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter({ ref: wrapperRef, setToggleMenu: ((value:boolean)=>{
   isOpen && setIsOpen(value)
  }), toggleMenu: isOpen });

  // Handle input changes and filtering
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value) {
      const filtered = items.filter(item =>
        item.word.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilterState(filtered);
    } else {
      setFilterState(items);
    }
    
    onChangeForm({ name: fieldName, value, item: null });
  }, [items, fieldName, onChangeForm]);

  // Handle item selection
  const onClickSelect = useCallback((textContent: string, item: ItemProps) => {
    setInputValue(textContent);
    setIsOpen(false);
    onChangeForm({ name: fieldName, value: textContent, item: item.item });
  }, [fieldName, onChangeForm, setIsOpen]);

  // Keyboard navigation
  const { handleKeyDown, handleSelection, focusedIndex } = useTabKeyScroll(
    onClickSelect,
    setInputValue,
    filterState
  );

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle default value
  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  // Handle blur simulation
  useEffect(() => {
    if (!isOpen && inputValue) {
      onHandleBlur?.(fieldName, inputValue);
    }
  }, [isOpen, inputValue, fieldName, onHandleBlur]);

  // Dynamic positioning logic
  let displayDirection = 'bottom';
  const getPositionStyle = () => {
    if (!autoDropdownPosition) return {};

    if (!isOpen) return {};

    if (dropdownRef && !dropdownRef.current) return {};
    if (!primaryRef.current) return {};

    const dropdownHeight = dropdownRef.current?.getBoundingClientRect().height;

    if (dropdownHeight) {
      const inputTop = primaryRef.current?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Calculate distance from input to the top of the screen
      const distanceFromTop = inputTop || 0;

      // Calculate distance from input to the bottom of the screen
      const distanceFromBottom = viewportHeight - inputTop! - primaryRef.current!.offsetHeight;

      const isTrue = distanceFromBottom >= (filterState.length + 0) * (height || 35);
      if (distanceFromTop < distanceFromBottom || isTrue) {
        // Dropdown would overlap with top of screen, display below input
        displayDirection = 'bottom';
        return {};
      } else {
        // Dropdown would overlap with bottom of screen, display above input
        displayDirection = 'top';
        if (inputRef.current) {
          inputRef.current.focus();
        }
        return {
          top: 'auto',
          bottom: `${primaryRef.current?.getBoundingClientRect().height}px`,
          marginBottom: '0px',
          paddingTop: '0px',
        };
      }
    }
    return {};
  };

  const onFocusInput = (e: any) => {
    // Set selected index to zero at every new focus
    setFilterState(items);
  }

  const onFocus = (e: any) => {
    e.preventDefault()

    //  setSelectedInput('');
    setInputValue('') // !filterState.length && 
    setFilterState([]);

    if (inputRef.current) {
      inputRef.current.focus();
    };

    onFocusInput(e);

    e.stopPropagation()

  }


  return (
    <div ref={wrapperRef} className={s['dropdown-container']} onKeyDown={handleKeyDown}>
      <div ref={primaryRef} style={{ position: 'relative' }}>
        <div
          ref={dropdownRef}
          className={`${s['dropdown-items']} ${isOpen ? s.show : ''}`}
          style={{
            width: dropdownWidth,
            maxHeight: isOpen ? maxHeight : '',
            position: 'absolute',
            visibility: isOpen ? 'visible' : 'hidden',
            marginLeft: alignDropdownTo === 'right' ? `-${dropdownWidth - (wrapperRef.current?.clientWidth || 0)}px` : 0,
            ...getPositionStyle(),
          }}
        >
          {displayDirection === 'bottom' && (
            <input
              ref={inputRef}
              value={inputValue}
              onChange={onChange}
              onBlur={onBlur}
              className={s['form_control']}
              placeholder={placeholder}
              name={fieldName}
              style={{ border: 'transparent', borderBottom: '1px solid #f5f5f5', borderRadius: 0 }}
            />
          )}
          <div className={g['message-label-items']}>
            {filterState?.map((item, index) => (
              <Fragment key={index}>
                {index === 0 && item.section && (
                  <div className={s['dropdown-item']} style={{ color: '#aaa', padding: '10px' }}>
                    {item.section}
                  </div>
                )}
                {index !== 0 && item.section && item.section !== filterState[index - 1]?.section && (
                  <div className={s['dropdown-item']} style={{ color: '#aaa', padding: '10px' }}>
                    {item.section}
                  </div>
                )}
                <DropdownItem
                  keyId={index}
                  textAlight={alignDropdownTo}
                  className={s['dropdown-item']}
                  onClick={() => onClickSelect(item.word, item)}
                  focusedIndex={focusedIndex}
                  handleSelection={handleSelection}
                  text={item.word}
                  length={filterState.length}
                />
              </Fragment>
            ))}
          </div>
          {displayDirection === 'top' && (
            <input
              onClick={(e) => onFocus(e)}
              ref={inputRef}
              value={inputValue}
              onChange={onChange}
              onBlur={onBlur}
              className={s['form_control']}
              placeholder={placeholder}
              name={fieldName}
              style={{ border: 'transparent', borderTop: '1px solid #f5f5f5', borderRadius: 0 }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default TypeaheadDropdown;