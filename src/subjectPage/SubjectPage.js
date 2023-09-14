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
        <div>
            <ul className="code">
                <li><h className='codeText'>{codeGen}</h></li>
                <li><button onClick={generateCode}>Regenerate code</button></li>
                <li><button onClick={disableCode}>Disable code</button></li>
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
