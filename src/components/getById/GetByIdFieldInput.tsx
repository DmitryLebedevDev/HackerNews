import React, { useState } from 'react'
import styles from './GetByIdPage.module.css';

interface Iprops {
    maxItem: number;
    setItemThunkStart: (id: number) => any;
    setItemThunkEnd: (item: any) => void;
    resetItem: () => void;
}

export default function GetByIdFieldInput(props:Iprops) {
    let [text,setText] = useState('');
    let [error, setError] = useState(false);
    let id: any = React.useRef();
    return (
        <div>
            <input className={styles.input} ref={id} type="text" value={text} onChange={(event) => {
                    if (+event.target.value <= props.maxItem) {
                        setText(event.target.value);
                        if (error) {
                            setError(false);
                        }
                    } else {
                        setError(true);
                    }
                    if (+event.target.value && +event.target.value <= props.maxItem) {
                        // debag state race
                        props.setItemThunkStart(+event.target.value).then((item: any) => {
                            if(item.id === +id.current.value) {
                                props.setItemThunkEnd(item);
                            }
                        });
                        
                    }
                    if (!(+id.current.value)) {
                        props.resetItem();
                    }
                }}/>
                {(error) && <div style={{color: 'red'}}>max items is {props.maxItem}</div>}
        </div>
    )
}
