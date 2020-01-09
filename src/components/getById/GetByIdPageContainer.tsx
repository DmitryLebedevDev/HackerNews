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
    const [text,setText] = useState('');
    return (
        <div>
            id234
            <input type="text" value={text} onChange={(event) => {
                setText(event.target.value);
                console.log(event)
            }}/>
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