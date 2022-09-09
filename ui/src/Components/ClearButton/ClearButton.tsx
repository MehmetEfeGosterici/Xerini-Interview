import * as React from 'react'
import "./ClearButton.css"

interface Props{
    onClick:Function
}

function ClearButton(props:Props) {
  return (
    <button className='clearButton' onClick={()=>props.onClick()}>
        Clear
    </button>
  )
}

export default ClearButton