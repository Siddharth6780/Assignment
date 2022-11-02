import React from 'react'
import "../App.css";

const Operations = ({item}) => {
  return (
    <div class="operators">
      <div class={item.operator} draggable="true" data-value={item.value}>{item.value}</div>
    </div>
  )
}

export default Operations