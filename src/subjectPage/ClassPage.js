import React, { useState, useEffect } from 'react';
import './ClassPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable';
import axios from 'axios';
import { SClass } from '../SClass';
import { useLocation } from 'react-router-dom';
import { ClassCode } from '../ClassCode';


function ClassPage() {

    let location = useLocation();
    let { class_id, class_name, subject_id, time, end_time, codes } = location.state

    const newClass = new SClass(class_id, class_name, time, end_time, codes);

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

    useEffect(() => {
        if (codeGen) {

            // // Only send the request if codeGen is not empty
            const newCode = new ClassCode(codeGen, end_time);
            const saveToServer = async () => {
                // try {
                //     const response = await axios.post('/db/subjects', newCode.toJSON());
                //     console.log("Data saved to server: ", response.data);
                //     return response.data;
                // } catch (error) {
                //     console.error(error);
                //     throw new Error('Failed to save subject to the server.');
                // }

                //Didnt work
                    // try {
                    //     const subject = await axios.get('/db/getSubjectById', {
                    //         params: {
                    //             id: subject_id // Pass the correct subject ID here
                    //         }
                    //     });
                    //     const class_index = subject.data.classes.findIndex(classItem => classItem._id === class_id)

                //         subject.data.classes[class_index].codes.push(newCode);
                //         await subject.save()

                //         console.log("Data saved to server: ", subject);
                //         return subject; 
                //     } catch (error) {
                //         console.error(error);
                //         throw new Error('Failed to save subject to the server.');
                //     }
                //Didnt work

            };
            saveToServer();
        }
    }, [codeGen]);

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
