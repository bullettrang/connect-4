import React from 'react';
import './ResetButton.css';
const ResetButton=(props)=>{

    return(
        <div className="Reset__wrapper" onClick={props.clicked}>RESET GAME</div>
    )
}

export default ResetButton;