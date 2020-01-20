import React,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {stopTimer,startCheckMaxItem,CheckMaxItemThunk,setCommentInItemThunk, setItemThunkStart, setItemThunkEnd, resetItem} from '../../redux/getById-reducers'
import styles from './GetByIdPage.module.css'
import MinLoadCenter from '../decorComponent/minLoadCenter'
import TableItemsNumber from '../decorComponent/TableItem/TableItemsNumber'
import GetByIdFieldInput from './GetByIdFieldInput'
import GetByIdPageItem from './GetByIdPageItem'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunkStart: (id: number) => any;
    setItemThunkEnd: (item: any) => void;
    startCheckMaxItem: () => void;
    CheckMaxItemThunk: () => void;
    setCommentInItemThunk: (id:number) => void;
    resetItem: () => void;
    stopTimer: () => void;
    isLoadInItem: boolean;
    maxItem?: number;
}

function GetByIdPageContainer(props: Iprops) {
    useEffect(() => {
        props.CheckMaxItemThunk();
        props.startCheckMaxItem();
        return () => {
            props.stopTimer();
        }
    }, []);
    let item = props.item;
    let DOMitem;
    if (!props.maxItem) {
        return (
            <MinLoadCenter/>
        )
    };
    
    return (
        <div className={styles.centerBlock}>
            <div className={styles.center}>
                <div style={{textAlign: 'center'}}>
                    max id <TableItemsNumber number={props.maxItem}/>
                </div>
                <GetByIdFieldInput 
                    maxItem={props.maxItem}
                    setItemThunkStart={props.setItemThunkStart}
                    setItemThunkEnd={props.setItemThunkEnd}
                    resetItem={props.resetItem}
                />
                <div className={styles.content}>
                    {(!props.isLoad) ? 
                    <GetByIdPageItem item={props.item} 
                                     isLoadInItem={props.isLoadInItem}
                                     setCommentInItemThunk={props.setCommentInItemThunk}/> :
                    <MinLoadCenter/>}
                </div>
            </div>
        </div>
    )
}
export default connect(
    (state:IStore) => {
        return {
            item: state.getByItem.item,
            isLoad: state.getByItem.isLoad,
            maxItem: state.getByItem.maxItem,
            isLoadInItem: state.getByItem.isLoadInItem,
        }
    }, {
        setItemThunkStart,
        setItemThunkEnd,
        startCheckMaxItem,
        CheckMaxItemThunk,
        stopTimer,
        setCommentInItemThunk,
        resetItem,
    }
)(GetByIdPageContainer)