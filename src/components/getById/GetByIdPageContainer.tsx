import React,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {stopTimer, setItemThunk,startCheckMaxItem,CheckMaxItemThunk,setCommentInItemThunk, setItemThunkStart, setItemThunkEnd, resetItem} from '../../redux/getById-reducers'
import styles from './GetByIdPage.module.css'
import MinLoadCenter from '../decorComponent/minLoadCenter'
import {StoryItem, BlockComment} from '../components-header/StoryList'
import TableItemsNumber from '../decorComponent/TableItem/TableItemsNumber'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunk: (id:number) => void;
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
    let item = props.item;
    let DOMitem;
    let loadId = useRef('');
    let id: any = useRef();
    if (item && item.type === 'story') {
        DOMitem = <StoryItem 
            id={item.id}
            url={item.url}
            fullLenComments={item.descendants}
            header={item.title}
            author={item.by}
            score={item.score}
            time={item.time}
            comments={[]}
            commentsIsLoad={false}
            addCommentToStoryThunk={() => {}}
        />
    }
    if (item && item.type === 'comment') {
        DOMitem = <BlockComment 
            id={item.id}
            name={item.name}
            text={item.text}
            commetnsArr={item.kids}
            comments={item.comments}
            isLoad={props.isLoadInItem}
            funcBtn={() => {props.setCommentInItemThunk((item) ? item.id : -1)}}
        />
    }
    useEffect(() => {
        console.log('da')
        props.CheckMaxItemThunk();
        props.startCheckMaxItem();
        return () => {
            props.stopTimer();
        }
    }, [])
    const [text,setText] = useState(((item) ? item.id : ''));
    const [error,setError] = useState(false);
    console.log(props);
    if (!props.maxItem) {
        return (
            <MinLoadCenter/>
        )
    }
    return (
        <div className={styles.centerBlock}>
            <div className={styles.center}>
                <div>
                    max id <TableItemsNumber number={props.maxItem}/>
                </div> 
                id -> {text} <br/>
                <input ref={id} type="text" value={text} onChange={(event) => {
                    if (props.maxItem && +event.target.value < props.maxItem) {
                        setText(event.target.value);
                    } else {
                        setError(true);
                    }
                    if (+event.target.value && props.maxItem && +event.target.value < props.maxItem) {
                        console.log(id.current.value,'REf');
                        loadId.current = event.target.value;
                        props.setItemThunkStart(+event.target.value).then((item: any) => {
                            debugger
                            console.log(item, id.current.value);
                            if(item.id === +id.current.value) {
                                props.setItemThunkEnd(item);
                            }
                        });
                        if (!(+id.current.value)) {
                            props.resetItem();
                        }
                    }
                }}/>
                {(error) && <div style={{color: 'red'}}>max items is {props.maxItem}</div>}
                is Load {''+props.isLoad} <br/>
                <div className={styles.content}>
                    {(!props.isLoad) ? DOMitem : <MinLoadCenter/>}
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
        setItemThunk,
        setItemThunkStart,
        setItemThunkEnd,
        startCheckMaxItem,
        CheckMaxItemThunk,
        stopTimer,
        setCommentInItemThunk,
        resetItem,
    }
)(GetByIdPageContainer)