import React, { useState, useEffect } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { Class } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'
import { Subject } from '../Subject'

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    let { subject_id, subject_name } = location.state;


    useEffect(() => {
        const fetchClass = async () => {
            try {
                console.log("current test: " + subject_id)
                let response = await axios.get('/db/subjects');
                let classes = response.data.find(s => s._id === subject_id).classes;
                setClasses(classes);

            } catch (error) {
                console.error(error);
            }
        };

        fetchClass();
    }, [subject_id]);


    return (
        <>
            <div className="App">
                <Navbar/>
            </div>
            <div className="ClassList"> 
                {classData.map(_class => (
                    <Class
                        key={_class._id}
                        classes={classData}
                        class_name={_class.class_name}
                        subject_id={subject_id}
                        subject_name={subject_name}
                        // class_id={classData.indexOf(_class)}
                        class_id={_class._id}
                        start_time={_class.class_start_timestamps}
                        end_time={_class.class_end_timestamps}
                        codes={_class.codes}
                    />))
                }
            </div>
        </>
    );
}

export default SubjectPage;
