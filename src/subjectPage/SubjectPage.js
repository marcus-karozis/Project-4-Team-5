import React, { useState, useEffect } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { Class } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    let { subject_id } = location.state;
    useEffect(() => {
        const sortfn = (a,b) => {
            let now = new Date();
            let time1, time2;
            for (let time of a.class_start_timestamps){
                let difference = now.getTime() - new Date(time).getTime();
                if (difference < 0) {
                    time1 = difference;
                }
            }
            for (let time of b.class_start_timestamps){
                let difference = now.getTime() - new Date(time).getTime();
                if (difference < 0) {
                    time2 = difference;
                }
            }
            return time2 - time1;
        }

        const fetchClass = async () => {
            try {
                let response = await axios.get('/db/subjects');
                let classes = response.data.find(s => s._id === subject_id).classes;
                // classes.sort(sortfn());
                sortfn(classes, classes);
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
                        className={_class.class_name}
                        subject_id={subject_id}
                        class_id={classData.indexOf(_class)}
                        time={new Date(_class.class_start_timestamps[0]).toDateString() ?? ""}
                    />))
                }
            </div>
        </>
    );
}

export default SubjectPage;
