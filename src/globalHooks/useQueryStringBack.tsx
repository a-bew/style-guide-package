import { useState,useEffect, type Dispatch, type SetStateAction } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const useQueryStringBack = ({ showDropdown, setShowDropdown, actionName = 'action', actionString = 'dropdown' }: {showDropdown: boolean, setShowDropdown: Function | Dispatch<SetStateAction<boolean>>,actionName?:string, actionString?: string}) => {

    const navigate = useNavigate();
    const location = useLocation()

    const [mainRef, setMainRef] = useState(false);
    
    const testAnonymous = ()=>{
    
      const updatedSearch = new URLSearchParams(location.search);
      const isDropdownVisible = updatedSearch.get(actionName) === actionString;
  
      if (isDropdownVisible){
        updatedSearch.delete(actionName); // Remove the "action" parameter
        navigate({
          ...location,
          search: updatedSearch.toString(), // Update the search with the modified parameters
        });
  
        setMainRef(false)
  
      } else {
        updatedSearch.set(actionName, actionString);
  
        navigate({
          ...location,
          search: `?${updatedSearch.toString()}`,
        }, {replace: false});  
  
        setMainRef(true);
  
      }

    } 
    
    useEffect(()=>{
        const updatedSearch = new URLSearchParams(location.search);
        const isDropdownVisible = updatedSearch.get(actionName) === actionString;
    
        if (showDropdown && !isDropdownVisible && mainRef){
          setShowDropdown(false);
          setMainRef(false);
        }
        
      }, [location, mainRef]);
    
      useEffect(() => {
        const updatedSearch = new URLSearchParams(location.search);
        const isDropdownVisible = updatedSearch.get(actionName) === actionString;
    
    
        if (actionString && !showDropdown && isDropdownVisible && mainRef){
          testAnonymous();
        }

        // New, check if dropdown is open. Ensure that query string of action is set to actionString;

        if (actionString && showDropdown && !isDropdownVisible && !mainRef){
            testAnonymous();
        }

    }, [showDropdown, mainRef, actionString])
      
  return { mainRef, testAnonymous,  }
}

export default useQueryStringBack