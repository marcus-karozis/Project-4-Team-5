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
            <Navbar></Navbar>
            <h className='codeText'>{codeGen}</h>
            {/* <h>Hello</h> */}
            <div className="code dashboard-row">
                    {/* <h className='codeText'>{codeGen}</h> */}
                    <button className="" onClick={generateCode}>Regenerate code</button>
                    <button className="" onClick={disableCode}>Disable code</button>
            </div>
            <div className='table'>
                <BasicTable />
            </div>
            <div className="whitespace"/>
        </>
    );
}

export default SubjectPage;
