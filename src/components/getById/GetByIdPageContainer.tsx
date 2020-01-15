import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {setItemThunk,startCheckMaxItem,CheckMaxItemThunk,setCommentInItemThunk} from '../../redux/getById-reducers'
import styles from './GetByIdPage.module.css'
import MinLoadCenter from '../decorComponent/minLoadCenter'
import {StoryItem, BlockComment} from '../components-header/StoryList'
import TableItemsNumber from '../decorComponent/TableItem/TableItemsNumber'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunk: (id:number) => void;
    startCheckMaxItem: () => void;
    CheckMaxItemThunk: () => void;
    setCommentInItemThunk: (id:number) => void;
    isLoadInItem: boolean;
    maxItem?: number;
}

function GetByIdPageContainer(props: Iprops) {
    let item = props.item;
    let DOMitem;
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
            console.log('я все')
        };
    }, [])
    const [text,setText] = useState(((item) ? item.id : ''));
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
                    max id = <TableItemsNumber number={2}/>
                </div> 
                id -> {text} <br/>
                <input type="text" value={text} onChange={(event) => {
                    setText(event.target.value);
                    props.setItemThunk(+event.target.value);
                }}/>
                is Load {''+props.isLoad} <br/>
                item type: {(item) ? item.type : ''} <br/>
                <div className={styles.content}>
                    {DOMitem}
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
        startCheckMaxItem,
        CheckMaxItemThunk,
        setCommentInItemThunk,
    }
)(GetByIdPageContainer)