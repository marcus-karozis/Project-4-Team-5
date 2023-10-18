import React from 'react'

const Modal = props => { 
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={ () => props(false)}> X </button>
                <div className="title">
                    <h1>Success!</h1>
                </div>
                <div className="body">
                    <p>You have sucessefully joined the class</p>
                </div>
                <div className="footer">
                    <button onClick={ () => props(false)}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal