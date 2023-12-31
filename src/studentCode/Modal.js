import React from 'react';
import './Modal.css';
import '../styles.css';
import Success from '../Images/checked.png'
import { useNavigate } from 'react-router-dom'


const Modal = ({ openModal }) => {
    const navigate = useNavigate()
    console.log("Modal component rendered");
    return (
        <div className="modalBackground show-modal">
            <div className="modalContainer">
                {/* <div className="titleCloseBtn ">
                    <button onClick={() => { openModal(false); console.log("Modal closed"); }}> X </button>
                </div> */}
                <div className="modal-title">
                    <h1>Success!</h1>
                    <img className='success-img' src={Success} />
                </div>
                <div className="body">
                    <p>You have successfully joined the class</p>
                </div>
                {/* <div className="footer">
                    <button className="dark-button" onClick={() => { openModal(false); console.log("Modal closed"); }}>Continue</button>
                </div> */}
                <div className="footer">
                    <button className="dark-button" onClick={() => { navigate('/dashboard?success=true'); openModal(false); console.log("Modal closed"); }}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;