import React from 'react';
import './Modal.css';
const Modal =(props)=>{
    return(
        <div className="Modal__wrapper">
            <div className="Modal--content">
                {props.children}
            </div>
        </div>
    )
}

export default Modal;