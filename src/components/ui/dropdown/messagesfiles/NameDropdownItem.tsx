import React, { type MouseEventHandler, useEffect, useRef } from 'react'
import useCurentTheme from '@/globalHooks/useCurentThem';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    focusedIndex: number;
    keyId: number|string;
    handleSelection: Function;
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
    className: string;
    hasSection?: boolean;
    showSelectedActiveOnly?: boolean;
}

const NameDropdownItem: React.FC<Props> = ({focusedIndex, keyId, handleSelection, onClick, text, className, hasSection, showSelectedActiveOnly = false, ...rest}) => {

    const resultContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{

        if(!resultContainer.current) return;
        
        resultContainer.current.scrollIntoView({
            block:"center"
        })

    }, [focusedIndex])

   const disabled = showSelectedActiveOnly && (keyId !== focusedIndex);
   
   const disabledFilterColor = '#aaa';

   const color = disabled?disabledFilterColor:undefined;

   const { color: backgroundColor } = useCurentTheme();

   return (
 
       <div
        ref={keyId === focusedIndex ? resultContainer: null} 
        data-id = {keyId}
        onMouseDown = {disabled?()=>{}:()=>handleSelection(keyId)}
        style = 
        {{
            position: "relative",
            color: keyId === focusedIndex ? 'white' : color,
            backgroundColor: keyId === focusedIndex ? backgroundColor : "",
            width: '100%',
            padding: '10px',
            paddingLeft: hasSection?'20px': '10px'
        }}
        onClick = {!disabled?onClick:()=>{}}
        className = {className}      
       >
        {text}
    </div>
  )
}

export default NameDropdownItem;