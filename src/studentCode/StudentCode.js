import React, { useState } from 'react';
import './StudentCode.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'



function StudentCode() {

    //need to get the subject code from database
    const verifyCode = (event) => {
        event.preventDefault();
        const testCode = "testcode"
        var inputCode = event.target[0].value
        if (testCode === inputCode) {
            alert("You have successfully joined " + testCode)
        }
        else {
            alert("Could not find related subject. Please enter code again")
        }

    }
    return (
        <>
            <Navbar></Navbar>
            <div class="enterCode">
                <h1>Enter Class Code</h1>
                <form className="form-container" type="text" onSubmit={verifyCode}>
                    <input name="inputCode" placeholder="Class CODE" class="codeInput"></input>
                    <button type="submit" class="codeButton">Enter</button>
                </form>
            </div>
        </>
    );
}

export default StudentCode;