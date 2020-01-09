import React,{useState} from 'react'
import { connect } from 'react-redux'
import  IStore  from '../../redux/storeType'
import { Iitem } from '../../redux/getByid-reducersType'
import {setItemThunk} from '../../redux/getById-reducers'

interface Iprops {
    item?: Iitem;
    isLoad: boolean;
    setItemThunk: (id:number) => void;
}

function GetByIdPageContainer(props: Iprops) {
    const item = props.item;
    const [text,setText] = useState('');
    console.log(props);
    return (
        <div>
            id
            <input type="text" value={text} onChange={(event) => {
                setText(event.target.value);
                props.setItemThunk(+event.target.value);
            }}/>
            is Load {''+props.isLoad} <br/>
            item type: {(item) ? item.type : ''}
        </div>
    )
}
export default connect(
    (state:IStore) => {
        return {
            item: state.getByItem.item,
            isLoad: state.getByItem.isLoad,
        }
    }, {
        setItemThunk
    }
)(GetByIdPageContainer)