import { useEffect } from "react";

/**
  * Hook that alerts clicks outside of the passed ref
 */
interface Props{
  ref?: any;
  setToggleMenu: Function;
  toggleMenu: boolean;
}

function useOutsideAlerter({ref, setToggleMenu, toggleMenu}: Props) {

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    
    function handleClickOutside(event: { target: any; }) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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



export default useOutsideAlerter;