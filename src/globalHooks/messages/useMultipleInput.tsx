import { useState } from 'react'
import { type ItemProps } from "@/components/ui/dropdown/dropdowninputtype";

export const useMultipleInput = ()=>{
    const [selectedOptions, setSelectedOptions] = useState<ItemProps[]>([]);
  
    const handleOptionRemove = (option: ItemProps) => {
      const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption.word !== option.word);
      setSelectedOptions(updatedOptions);
      return updatedOptions;
    };
  
    const handleOptionSelect = (option: ItemProps) => {
      const optionExists = selectedOptions.some((selectedOption) => selectedOption.word === option.word);
      
      if (!optionExists) {
        const selectedOptionList = [...selectedOptions, option]
        setSelectedOptions(selectedOptionList);
        return selectedOptionList
      } else {
        // handleOptionRemove(option)
        return selectedOptions
      }
  
    };

    const handleAddAll = (options: ItemProps[]) => {
      setSelectedOptions(options);
    }
  
    const clearSelectedOptions = ()=>{
      setSelectedOptions([])
    }
    
    return { handleAddAll, selectedOptions, handleOptionRemove, handleOptionSelect, clearSelectedOptions }
  
}
  