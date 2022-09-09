import * as React from 'react'
import "./PinInfo.css"

import { AiOutlineClose } from "react-icons/ai"

interface Props {
  isVisible: boolean
  data: {
    lat: String
    long: String
    location: String
    name: String
  }
  setIsVisible:Function
}

function PinInfo(props: Props) {

  return (
    <div className='infoContainer' style={{display:props.isVisible?"flex": "none"}}>
      <div style={{margin:5}}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
            <h6>{props.data.name}</h6>
            <AiOutlineClose onClick={()=>props.setIsVisible()} />
          </div>
          <div>{props.data.location}</div>
          <div style={{ display: "flex", flexDirection: "row", color: "#5f6368", justifyContent: "center" }}>
            <div style={{ margin: 5 }}>Longitude: {props.data.long}</div>
            <div style={{ margin: 5 }}>Latitude: {props.data.lat}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinInfo