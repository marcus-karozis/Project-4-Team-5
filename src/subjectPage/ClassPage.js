import React, { useState, useEffect } from 'react';
import './ClassPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import axios from 'axios';
import { Class } from '../menu/Menu';
import { useLocation } from 'react-router-dom'
import { Subject } from '../Subject'
import { SClass } from '../SClass'
import { ClassCode } from '../ClassCode'


function ClassPage() {


    let location = useLocation();
    let { class_id, class_name, subject_id, subject_name, start_time, end_time, classes, codes } = location.state
    // const [code, setCode] = useState(""); // Initialize state for the code

    const newClass = new SClass(class_id, class_name, start_time, end_time, codes) //create one class instance
    const newSubject = new Subject(subject_id, subject_name, classes) //create one subject instance 

    //removes duplicates
    const existingClassIndex = newSubject.classes.findIndex(existingClass => existingClass._id === class_id);
    // console.log(classes)
    // console.log(existingClassIndex)
    if (existingClassIndex !== -1) {
        // If the class_id already exists, push the test object to the existing class's array
        newSubject.classes[existingClassIndex] = newClass;
    } else {
        // If the class_id doesn't exist, push the test object into the classes array
        newSubject.classes.push(newClass);
    }


    function generateCode() {

        //MARCUS
        //const newSubject = new Subject(subjectData._id, subjectData.subject_name, []);

        // for (let i = 0; i < subjectData.classes.length; i++) {
        //     const classData = subjectData.classes[i];
        //     const newClass = new SClass(classData._id, classData.class_name, [], []);

        //     for (let j = 0; j < classData.class_start_timestamps.length; j++) {
        //         const newCode = new ClassCode(classData.codes[j]._id, classData.codes[j].value, classData.codes[j].expiry, classData.codes[j].users_selected, classData.codes[j].users_passed);

        //         newClass.codes.push(newCode);
        //     }

        //     newSubject.classes.push(newClass);
        // }


        //LIV 

        const newCode = new ClassCode(end_time[0])
        newClass.codes.push(newCode)
        
        //const codeId = newCode._id

        // work around - was having issues with setCode(newCode)
        const codeElement = document.querySelector('.codeText');
        if (codeElement) {
            codeElement.innerText = newCode.value;
        }
        // console.log("AFTER: " + JSON.stringify(newSubject, null, 2))

        newSubject.updateServer()
    }

    function disableCode() {
        const codeElement = document.querySelector('.codeText');
        if (codeElement) {
            codeElement.innerText = "";
        }
    }


    return (
        <>
            <Navbar></Navbar>
            <h className='codeText'></h>
            <div className="code dashboard-row">
                <button onClick={generateCode}><i className='fa fa-refresh'></i> Regenerate code</button>
                <button onClick={disableCode}><i className='fa fa-remove'></i> Disable code</button>
            </div>
            <div className='table'>
                <BasicTable class_id={class_id} subject_id={subject_id} startTime={start_time} />
            </div>
            <div className="whitespace" />
        </>
    );
}

export default ClassPage;
