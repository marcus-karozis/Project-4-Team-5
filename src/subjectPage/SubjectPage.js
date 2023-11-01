import React, { useState, useEffect, useContext } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { Class } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'
import UserContext from '../usercontext';

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    const { user } = useContext(UserContext);
    let { subject_id, subject_name } = location.state;
    useEffect(() => {
        const fetchClass = async () => {
            try {
                let response = await axios.get('/db/getSubjectById', {params: {id: subject_id}});
                let classes = response.data.classes.filter((_class) => user.user_type == 0 || user.enrolment.some((c) => c.class == _class._id));
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
