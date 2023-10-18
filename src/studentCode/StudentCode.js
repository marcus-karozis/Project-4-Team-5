import React, { useState } from 'react';
import './StudentCode.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Modal from './Modal';

function StudentCode() {

    const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const fetchCode = async () => {
        try {
            let response = await axios.get('/db/subjects');
            //Gets the codes array for a specific subject and class
            let codesArray = response.data.find(subject => subject.subject_name === 'Computer Science')?.classes.find(_class => _class.class_name === 'Lecture 1')?.codes;
            //Gets the first code in the codesArray
            let firstCode = codesArray = codesArray ? codesArray[0]?.value : undefined;
            //console.log(firstCode)
            return firstCode
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    //need to get the subject code from database
    const verifyCode = async (event) => {
        event.preventDefault();
        try {
            const testCode = await fetchCode();
            var inputCode = event.target[0].value;

            console.log(inputCode);

            if (testCode === inputCode) {
                setOpenModal(true);
                //navigate('/dashboard?success=true');
            } else {
                // Handle incorrect code
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 2000);

            }
        } catch (error) {

            
            console.error(error);
            // Handle the error if fetchCode fails
            alert("Error occurred while verifying code. Please try again later.");
        }
    }
    return (
        <>

            <Navbar></Navbar>
            <div className='code-container'>
                <div className="enterCode">
                    <h1>Enter Class Code</h1>
                    <form className="form-container" type="text" onSubmit={verifyCode}>
                        <input name="inputCode" placeholder="Class CODE" class="codeInput"></input>
                        <button type="submit" class="codeButton">Enter</button>
                    </form>
                   {/* { openModal && <Modal />} */}
                </div>
                {showErrorMessage && <div className="errorBox">Could not find related subject. Please enter code again.</div>}
            </div>

        </>
    );
}

export default StudentCode;