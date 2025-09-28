import { type MouseEventHandler, useEffect, useRef } from 'react'

interface Props {
    focusedIndex: number;
    keyId: number;
    handleSelection: Function;
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
    className: string;
    hasSection?: boolean;
}

const OldDropDownItem = ({focusedIndex, keyId, handleSelection, onClick, text, className, hasSection}:Props) => {

    const resultContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{

        if(!resultContainer.current) return;
        
        resultContainer.current.scrollIntoView({
            block:"center"
        })

    }, [focusedIndex])

  return (
    <div
        // ref = {resultContainer}
        ref={keyId === focusedIndex ? resultContainer: null} 
        data-id = {keyId}
        onMouseDown = {()=>handleSelection(keyId)}
        style = 
        {{
            position: "relative",
            backgroundColor: keyId === focusedIndex ? "rgba(0,0,0,0.1)" : "",
            // marginTop: keyId === 0 ? "50px": "",
            // height: '45px',
            // zIndex: 3,
            width: '100%',
            // textAlign: 'center',
            padding: '10px',
            paddingLeft: hasSection?'20px': '10px'

        }}
        onClick = {onClick}
        className = {className}
    >
        {text}
    </div>
  )
}

export default OldDropDownItem;