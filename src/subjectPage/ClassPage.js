import React, { useState, useEffect } from 'react';
import './ClassPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import { SClass } from '../SClass';

function ClassPage() {

    let location = useLocation();
    let { class_id, subject_id, time, end_time } = location.state
    console.log("Class_id: " + class_id)
    console.log("Subject_id: " + subject_id)
    const [codeGen, setCode] = useState('');

    function generateCode() {

        let charset = "";
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        charset += "0123456789";

        let code = "";
        for (let i = 0; i < 7; i++) {
            code += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setCode(code);
        
    }

    function disableCode() {
        let code = "";
        setCode(code);
    }


    return (
        <>
            <div className="App">
                <Navbar />
            </div>
            <h className='codeText'>{codeGen}</h>
            <div className="code dashboard-row">
                <button onClick={generateCode}><i className='fa fa-refresh'></i> Generate code</button>
                <button onClick={disableCode}><i className='fa fa-remove'></i> Disable code</button>
            </div>
            <div className='table'>
                <BasicTable class_id={class_id} subject_id={subject_id} startTime={time} />
            </div>
            <div className="whitespace" />
        </>
    );
}

export default ClassPage;
