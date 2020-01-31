import React from 'react';
import { Iitem } from '../../redux/getByid-reducersType';
import { BlockComment } from '../CommentsBlock/CommentsBlock';
import StoryItem from '../StoryPage/StoryIrem';

interface Iprops {
    item?: Iitem;
    isLoadInItem: boolean;
    setCommentInItemThunk: (id:number) => void;
    addCommentToStoryItemThunk: () => void;
}

export default function GetByIdPageItem(props:Iprops) {
    let item = props.item;
    let DOMitem;
    if (item && item.type === 'story') {
        DOMitem = <StoryItem
            id={item.id}
            url={item.url}
            fullLenComments={item.fullLenComments}
            header={item.header}
            author={item.author}
            score={item.score}
            time={item.time}
            comments={item.comments}
            commentsIsLoad={props.isLoadInItem}
            addCommentToStoryThunk={props.addCommentToStoryItemThunk}
            commentsDefOpen={false}
            commentsId={[]}//!!***
            isLink={true}
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
