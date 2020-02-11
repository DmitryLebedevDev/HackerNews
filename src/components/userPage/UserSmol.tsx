import React from 'react'
import { IUserLopped } from '../../redux/getByid-reducersType'
import { egoDateToString } from '../../helpers/function'

export default function UserSmol(props:IUserLopped) {
  return (
    <div>
      <div>
        name: {props.id}
      </div>
      <div>
        created: {egoDateToString(props.created)}
      </div>
      <div>
        karma: {props.karma}
      </div>
    </div>
  )
}