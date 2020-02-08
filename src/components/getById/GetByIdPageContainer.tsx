import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {
    addCommentToStoryItemThunk,
    stopTimer,
    startCheckMaxItem,
    CheckMaxItemThunk,
    setCommentInItemThunk,
    setItemThunkStart,
    setItemThunkEnd,
    resetItem
} from '../../redux/getById-reducers'
import styles from './GetByIdPage.module.css'
import MinLoadCenter from '../decorComponent/minLoadCenter'
import TableItemsNumber from '../decorComponent/TableItem/TableItemsNumber'
import GetByIdFieldInput from './GetByIdFieldInput'
import GetByIdPageItem from './GetByIdPageItem'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunkStart: (id: number|string) => any;
    setItemThunkEnd: (item: any) => void;
    startCheckMaxItem: () => void;
    CheckMaxItemThunk: () => void;
    setCommentInItemThunk: (id:number) => void;
    addCommentToStoryItemThunk: () => void;
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
    if (!props.maxItem) {
        return (
            <div style={{marginTop: 15}}>
                <MinLoadCenter/>
            </div>
        )
    };
    return (
        <div className={styles.centerBlock} style={{marginTop: 10}}>
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
                                     setCommentInItemThunk={props.setCommentInItemThunk}
                                     addCommentToStoryItemThunk={props.addCommentToStoryItemThunk}
                                     /> :
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
        addCommentToStoryItemThunk,
    }
)(GetByIdPageContainer)