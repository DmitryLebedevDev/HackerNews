import React from 'react'
import TableItem from './TableItem'

interface Iprops {
    number: number;
}

export default function TableItemsNumber(props:Iprops) {
    return (
        <div >
            <TableItem number="2"/>
        </div>
    )
}
