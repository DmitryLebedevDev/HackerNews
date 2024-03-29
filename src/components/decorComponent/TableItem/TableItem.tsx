import React, { useState, useEffect } from 'react'
import styles from './TableItem.module.css';

interface Iprops {
    number: string;
}

export default function TableItem(props:Iprops) {
    let [t,setT] = useState(props.number);
    useEffect(() => {
        setT((r) => {
            if (props.number < r) {
                
            }
            return props.number
        })
    },[props.number])
    return (
        <div className={styles.window}>
            <div className={styles.col + ' ' + styles[(false) ? `topUp${t}` : `top${t}`]}>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
            </div>
        </div>
    )
}
