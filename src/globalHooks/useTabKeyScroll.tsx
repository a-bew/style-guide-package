import { type Dispatch,  useState } from 'react'

function useTabKeyScroll(
  onClickItem2:Function, 
  setSelectedWord:Dispatch<string>, 
  suggestionListing:any, 
  allowDirection?: boolean, 
  specialKey?: string) {

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [lastCount, setLastCount] = useState(0)
  const [mouseEventDisabled, setMouseEventDisabled] = useState(false);
  const word = specialKey ? specialKey : 'word';
/**
   * Method which is going to trigger the onMouseOver only once in Xms
   */
    const handleSelection = (selectIndex: number) => {    
      const selectedItem = suggestionListing[selectIndex];
      if (focusedIndex < lastCount || !selectedItem) return  resetSearchComplete();

      selectedItem && word in selectedItem && onClickItem2(selectedItem[word], selectedItem)

      resetSearchComplete()

      setMouseEventDisabled(true);

    }
  
    const resetSearchComplete = ()=>{
      setFocusedIndex(focusedIndex);
    }
  
    const handleKeyDown = (e:any)=> {
      let nextIndexCount = focusedIndex//0;
  
      switch (e.key) {
        case "Enter":
            handleSelection(focusedIndex)            
          break
  
        case "ArrowLeft":
            // Left pressed
            break;
  
        case "ArrowRight":
            // Right pressed
            break;
  
        case "ArrowUp":
            // Up pressed
            nextIndexCount = (focusedIndex + suggestionListing.length - 1) % suggestionListing.length
            setLastCount(nextIndexCount);
  
              if (nextIndexCount > -1 && suggestionListing){
                const selectedItem = suggestionListing[nextIndexCount];
                selectedItem && word in selectedItem && setSelectedWord(selectedItem.word);

                                /**
                 * Test if this will work for tab 
                 * */ 
               allowDirection && handleSelection(nextIndexCount);

              }  
            break;
  
        case "ArrowDown":
            // Down pressed
            nextIndexCount = (focusedIndex + 1) % suggestionListing.length
            setLastCount(nextIndexCount);
  
              if (nextIndexCount> -1 && suggestionListing){
                const selectedItem = suggestionListing[nextIndexCount];
                selectedItem && word in selectedItem && setSelectedWord(selectedItem.word);
                /**
                 * Test if this will work for tab 
                 * */ 
               allowDirection && handleSelection(nextIndexCount);
              }    
            
            break;

            case 'Escape':
              e.preventDefault();
              // setIsOpen(false);
              break;
      
            case 'Tab':
              // setIsOpen(false);
              break;
      
  
      }
  
      setFocusedIndex(nextIndexCount)
    
    }
  
  return {handleKeyDown, handleSelection, focusedIndex, mouseEventDisabled, setMouseEventDisabled }
}

export default useTabKeyScroll