import React from 'react';

import './HUD.css';

const HUD=(props)=>{
    const p1style={backgroundColor:'red',
                    color:'black'};
    const p2style={backgroundColor:'black',
                    color:'red'};

    return(
        <div style={props.playerturn===1?p1style:p2style} className="HUD__wrapper">{`PLAYER ${props.playerturn}`}</div>
    )
}


export default HUD;