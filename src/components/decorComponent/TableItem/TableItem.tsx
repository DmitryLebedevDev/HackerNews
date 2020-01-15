import React, { useState, useRef, useEffect } from 'react'
import styles from './TableItem.module.css';

interface Iprops {
    number: string;
}

export default function TableItem(props:Iprops) {
    let [t,setT] = useState(1);
    useEffect(()=> {
       setTimeout((r)=> {
        if (t + 1 === 10) {
            setT(1);
            return;
        } else {
            setT(t+1);
        }
    },2000)
    },[]);
    
    return (
        <div className={styles.window}>
            <div className={styles.col + ' ' + styles[`topUp${2}`]}>
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
            <div className={styles.col2}>
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
