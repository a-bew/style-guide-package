import React from "react";
import { useRef, useEffect, type ReactNode } from "react";

/**
  * Hook that alerts clicks outside of the passed ref
 */
interface Props {
  ref?: any;
  toggleMenu: boolean;
  setToggleMenu: Function;
  setToggleMenu2?: Function;
  children?: ReactNode;
  style?: any;
}

function useOutsideAlerter({ ref, toggleMenu, setToggleMenu, setToggleMenu2 }: Props) {

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event: { target: any; }) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setToggleMenu(false);
        setToggleMenu2 && setToggleMenu2(false);
        // trackAllFilterClick && handleTrackAllFilterClick(false);
      }


      // Used to capture outsideClick when search input is up and the dropdown is open
      if (ref.current && ref.current?.contains(event.target) && event.target.getAttribute("class") === 'main_keySearchBotton__KzjwQ') {
        setToggleMenu(false);
      }

    }
    // Bind the event listener
    if (toggleMenu){
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggleMenu]);
}

/**
 * Component that alerts if you click outside of it
 */

const DetectOutsideClick = React.memo(({ children, toggleMenu, setToggleMenu, setToggleMenu2, style }: Props) => {
  const wrapperRef = useRef(null);

  useOutsideAlerter({ ref: wrapperRef, toggleMenu, setToggleMenu: setToggleMenu, setToggleMenu2 });

  return <div ref={wrapperRef} style={style} >{children}</div>;
})

export default DetectOutsideClick