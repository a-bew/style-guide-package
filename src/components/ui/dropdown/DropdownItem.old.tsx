

import React, { type MouseEventHandler, useEffect, useRef } from 'react'


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    focusedIndex: number;
    keyId: number;
    handleSelection: Function;
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
    className: string;
    hasSection?: boolean;
    showSelectedActiveOnly?: boolean;
}

const DropdownItem: React.FC<Props> = ({focusedIndex, keyId, handleSelection, onClick, text, className, hasSection, showSelectedActiveOnly = false, ...rest}) => {

    const resultContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{

        if(!resultContainer.current) return;
        
        resultContainer.current.scrollIntoView({
            // block:"center"
            behavior: "smooth", block: "end", inline: "nearest"
        })

    }, [focusedIndex])

   const disabled = showSelectedActiveOnly && (keyId !== focusedIndex);
   
   const disabledFilterColor = '#aaa';

   const color = disabled?disabledFilterColor:undefined;

   return (
 
       <div
        // ref = {resultContainer}
        ref={keyId === focusedIndex ? resultContainer: null} 
        data-id = {keyId}
        // onClick={handleClick}
        onMouseDown = {disabled?()=>{}:()=>handleSelection(keyId)}
        // disabled = { showSelectedActiveOnly && keyId != focusedIndex }
        style = 
        {{
            position: "relative",
            color,
            backgroundColor: keyId === focusedIndex ? "rgba(0,0,0,0.1)" : "",
            // marginTop: keyId === 0 ? "50px": "",
            // height: '45px',
            // zIndex: 3,
            width: '100%',
            // textAlign: 'center',
            padding: '10px',
            paddingLeft: hasSection?'20px': '10px'

        }}
        // onClick = {!disabled?onClick:()=>null}
        onClick = {!disabled?onClick:()=>{}}

        className = {className}
    >
        {text}
    </div>
  )
}

export default DropdownItem;