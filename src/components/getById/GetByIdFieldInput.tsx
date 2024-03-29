import React, { useState } from 'react'
import styles from './GetByIdPage.module.css';
import { Switch, Typography, Grid } from '@material-ui/core';

interface Iprops {
    maxItem: number;
    setItemThunkStart: (id: number|string) => any;
    setItemThunkEnd: (item: any) => void;
    resetItem: () => void;
}

export default function GetByIdFieldInput(props:Iprops) {
    let [searchToUser,setSearchToUser] = useState(false);
    let [text,setText] = useState('');
    let [error, setError] = useState(false);
    let id: any = React.useRef();
    return (
        <div>
            <input className={styles.input} ref={id} type="text" value={text} onChange={
                (event) => {
                        if (!searchToUser) {
                            if (+event.target.value <= props.maxItem) {
                            setText(event.target.value);
                            if (error) {
                                setError(false);
                            }
                        } else if (event.target.value.match(/\D/) === null) {
                            setError(true);
                        }
                        if (+event.target.value && +event.target.value <= props.maxItem) {
                            // fix state race
                            props.setItemThunkStart(+event.target.value).then((item: any) => {
                                if(item.id === +id.current.value) {
                                    props.setItemThunkEnd(item);
                                }
                            });
                            
                        }
                        if (!(+id.current.value) && event.target.value.match(/\D/) === null) {
                            props.resetItem();
                        }
                    } else {
                        setText(event.target.value);
                        if (event.target.value.length > 0) {
                            props.setItemThunkStart(event.target.value).then((item: any) => {
                            if(item.id === id.current.value || item.errorCode) {
                                props.setItemThunkEnd(item);
                            }
                            });
                        }
                    }
                }}/>
                {(error) && <div style={{color: 'red'}}>max items is {props.maxItem}</div>}
                <div>
                <div style={{textAlign: 'center'}}>
                    search to
                </div>
                <Typography component="div">
                    <Grid component="label" container alignItems="center" justify="center" spacing={1}>
                    <Grid item> id</Grid>
                    <Grid item>
                        <Switch
                        checked={searchToUser}
                        onChange={() => {setSearchToUser(r => !r);
                                         setText('');
                                         id.current.focus();
                                         props.resetItem();
                        }}
                        color="primary"
                        />
                    </Grid>
                    <Grid item>user</Grid>
                    </Grid>
                </Typography>
                </div>
        </div>
    )
}
