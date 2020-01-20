import React from 'react';
import { Iitem } from '../../redux/getByid-reducersType';
import { BlockComment } from '../CommentsBlock/CommentsBlock';
import { StoryItem } from '../components-header/StoryList';

interface Iprops {
    item?: Iitem;
    isLoadInItem: boolean;
    setCommentInItemThunk: (id:number) => void;
}

export default function GetByIdPageItem(props:Iprops) {
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
    return (
        <div>
            {DOMitem}
        </div>
    )
}
