import React, { useState, useEffect } from 'react';
import './ClassPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import axios from 'axios';
import { Class } from '../menu/Menu';


function ClassPage() {

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
    

    return(
        <>
            <Navbar></Navbar>
            <h className='codeText'>{codeGen}</h>
            <div className="code dashboard-row">
                <button onClick={generateCode}><i className='fa fa-refresh'></i> Regenerate code</button>
                <button onClick={disableCode}><i className='fa fa-remove'></i> Disable code</button>
            </div>
            <div className='table'>
                <BasicTable />
            </div>
            <div className="whitespace"/>
        </>
    );
}

export default ClassPage;
