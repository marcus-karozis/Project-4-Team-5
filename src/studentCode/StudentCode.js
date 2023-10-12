import React, { useState } from 'react';
import './StudentCode.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { useNavigate } from 'react-router-dom'


function StudentCode() {

    const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    //need to get the subject code from database
    const verifyCode = (event) => {
        event.preventDefault();
        const testCode = "Tutorial"
        var inputCode = event.target[0].value
        if (testCode === inputCode) {
            navigate('/?success=true');
            alert("You have successfully joined " + testCode)
            
        }
        else {
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
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

                </div>
                {showErrorMessage && <div className="errorBox">Could not find related subject. Please enter code again.</div>}
            </div>

        </>
    );
}

export default StudentCode;