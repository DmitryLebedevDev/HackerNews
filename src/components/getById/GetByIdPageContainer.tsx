import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {setItemThunk,startCheckMaxItem,CheckMaxItemThunk} from '../../redux/getById-reducers'
import styles from './GetByIdPage.module.css'
import MinLoadCenter from '../decorComponent/minLoadCenter'
import {StoryItem, BlockComment} from '../components-header/StoryList'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunk: (id:number) => void;
    startCheckMaxItem: () => void;
    CheckMaxItemThunk: () => void;
    maxItem?: number
}

function GetByIdPageContainer(props: Iprops) {
    let item = props.item;
    let DOMitem;
    if (item && item.type === 'story') {
        /**
         * 
         * 
         * {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  url: string,
  type?: 'job',
}
         */


        /*
  id: number,
  fullLenComments: number,
  url: string,
  header: string,
  author: string,
  score: number,
  time: number,
  comments: {
    id: number,
    name: string,
    text: string,
    comments: any,
    commentsLeng: number,
    path: number[],
    fullLenComments: number,
  }[],
  commentsDefOpen?: boolean,
  commentsIsLoad: boolean,
  addCommentToStoryThunk: (id:number) => void;
        */
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
            isLoad={true}
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
    const [text,setText] = useState('');
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
                    max id = {props.maxItem}
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
        }
    }, {
        setItemThunk,
        startCheckMaxItem,
        CheckMaxItemThunk,
    }
)(GetByIdPageContainer)