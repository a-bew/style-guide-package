import React, { type SetStateAction, useEffect, useState } from 'react'
import CheckedStar from '@/assets/svgicons/CheckedStar'
import UncheckedStar from '@/assets/svgicons/UncheckedStar'

interface StarMakerProp {
    percentage: number;
    size: number;
}

const StarMaker = React.memo(({percentage:score, size}:StarMakerProp) => {
    const [list, setList] = useState([false, false, false, false, false])
    const [passScores,] = useState([20, 40, 60, 80, 100])

    useEffect(() => {
        const newList:SetStateAction<boolean[]> = passScores?.map((elm, index)=> elm <= score)
        setList(newList);
    }, [score])
    
    return (
        <div style={{display: "flex", gap: "5px"}}>
            {list?.map((item: any, index: number)=>{
                if (item === true){
                    return (<CheckedStar size = {size} key = {index}/>)
                }
                return (<UncheckedStar size = {size} key = {index}/>)
            })}
        </div>
  )
})

export default StarMaker