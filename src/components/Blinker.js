import React from 'react';
import "../styles/Blinker.css";
export default ({color})=>{
    const style={
        backgroundColor:color,
    }
    return(
        <span className="cursor" style={style}>&nbsp;&nbsp;</span>
    )
}