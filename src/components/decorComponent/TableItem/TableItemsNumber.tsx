import React from 'react'
import TableItem from './TableItem'

interface Iprops {
    number: number;
}

export default function TableItemsNumber(props:Iprops) {
    let numbers = (''+props.number).match(/\w/g);
    let nums = [];
    if (numbers && numbers.length) {
        console.log(numbers);
        for (let t=0; t<numbers.length; t++) {
            nums.push(<TableItem number={numbers[t]} key={t}/>);
        }
    }
    
    return (
        <div style={{display:'flex'}}>
            {nums}
        </div>
    )
}
