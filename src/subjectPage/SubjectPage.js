import React, { useState } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'


function SubjectPage() {

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
        <div>
            <Navbar></Navbar>
        </div>
        <div className="">
            <ul className="code dashboard-row">
                <li><h className='codeText'>{codeGen}</h></li>
                <li><button className="" onClick={generateCode}>Regenerate code</button></li>
                <li><button className="" onClick={disableCode}>Disable code</button></li>
            </ul>
        </div>
        <div>
            <BasicTable id="attended"/>
            <BasicTable id="absent"/>
        </div>
        <div>
            <button> move to attended </button>
            <button> move to absent </button>
        </div>
        </>
    );
}

export default SubjectPage;
