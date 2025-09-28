import React, { memo, type MouseEventHandler, useEffect, useRef } from 'react'


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    focusedIndex: number;
    keyId: number;
    handleSelection: Function;
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
    className: string;
    hasSection?: boolean;
    showSelectedActiveOnly?: boolean;
    length?: number;
    autoDropdownPosition?: boolean;
    textAlight?: 'left' | 'right';
    onHoverId?: number | null,
    setOnHoverId?: (value: number | null)=>void

}

const DropdownItem: React.FC<Props> = ({textAlight = 'left', focusedIndex, keyId, handleSelection, onClick, text, className, hasSection, showSelectedActiveOnly = false, length = 0, onHoverId, setOnHoverId, ...rest }) => {

    // const resultContainer = useRef<HTMLDivElement>(null)
    const resultContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{
    
        if(!resultContainer.current) return;
        
        resultContainer.current.scrollIntoView({
            // block:"center"
            // behavior: "instant",
             block: "nearest", inline: "start"
        })

    }, [focusedIndex])
    

    const disabled = showSelectedActiveOnly && (keyId !== focusedIndex);

    const disabledFilterColor = '#aaa';

    const color = disabled ? disabledFilterColor : undefined;

    return (
        <div
            ref={keyId === focusedIndex ? resultContainer : null}
            data-id={keyId}
            onMouseDown={disabled ? () => { } : () => handleSelection(keyId)}
            onMouseLeave={()=>setOnHoverId && setOnHoverId(null)}
            onMouseEnter={()=>setOnHoverId && setOnHoverId(keyId)}
            style=
            {{
                position: "relative",
                color,
                //  onHoverId === null && 
                backgroundColor:keyId === focusedIndex ? "#f5f5f5" : "",
                width: '100%',
                padding: '10px 15px 10px 15px',
                paddingLeft: hasSection ? '20px' : '10px',
                whiteSpace: 'nowrap',
                overflow: "hidden",
                textOverflow: 'ellipsis',
                textAlign: textAlight
            }}
            onClick={!disabled ? onClick : () => { }}
            className={className}
        >
           <span>{text}</span> 
        </div>
    )
}

export default memo(DropdownItem);