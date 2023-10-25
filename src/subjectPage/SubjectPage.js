import React, { useState, useEffect } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { ClassCard } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    let { subject_name } = location.state;

    // console.log(subject_name)
    useEffect(() => {
        const fetchClass = async () => {
            try {
                let response = await axios.get('/db/subjects');
                let classes = response.data.find(s => s.subject_name === subject_name).classes;
                setClasses(classes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClass();
    }, [subject_name]);

    return (
        <>
            <div className="App">
                <Navbar/>
            </div>
            <div className="ClassList"> 
                {classData.map(_class => (
                    <ClassCard
                        // key={_class._id}
                        class_name={_class.class_name}
                        class_start_timestamps={new Date(_class.class_start_timestamps[0]).toDateString() ?? ""}
                        class_end_timetstamps={new Date(_class.class_end_timestamps[0]).toDateString() ?? ""}
                        codes={_class.codes}
                        subject_name={subject_name}
                        // class_id={classData.indexOf(_class)}
                        // time={new Date(_class.class_start_timestamps[0]).toDateString() ?? ""}
                    />))
                }
            </div>
        </>
    );
}

export default SubjectPage;
