import React from 'react';
import './Cell.css';

//#424242 empty color
//#d60000 red
//#000000 black
const Cell =(props)=>{
    let colorcell  =null;
    
    if(props.value===1){
        colorcell={backgroundColor:'#d60000'}
    }
    else if(props.value===2){
        colorcell={backgroundColor:'#000000'}
    }
    else{
        colorcell={backgroundColor:'#424242'}
    }
    return(
        <div className="Cell__wrapper" style={colorcell} onClick={props.clicked}>
        </div>
    )
};

export default Cell;