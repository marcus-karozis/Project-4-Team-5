import React, { useState, useEffect, useContext } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { Class } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'
import UserContext from '../usercontext';

function getNextClass (arr) {
    let now = new Date();
    for (let time of arr){
        let difference = now.getTime() - new Date(time).getTime();
        if (difference < 0) {
            return time;
        }
    }
}

function sortfn (a,b) {
    let now = new Date();
    let time1, time2;
    time1 = getNextClass(a.class_start_timestamps);
    time2 = getNextClass(b.class_start_timestamps);
    return time2 - time1;
}

function isTimeInAnHour (a) {
    let nextClass = new Date(getNextClass(a.class_start_timestamps));
    let time = Math.round((nextClass.getTime() - new Date().getTime())/(1000*60));
    //if class is today
    if(time < 1440){
        if (time < 60){
            return "Class starts in " + time + "minutes";
        }
        else{
            return "Class starts at " + nextClass.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
        }
    }
}

// function whenIsTime (a) {
//     let whenTime = isTimeInAnHour(a);
//     if(whenTime < 1440){
//         if(whenTime < 60){
//             return "green";
//         }
//         else{
//             return "yellow";
//         }
//     }
// }

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    const { user } = useContext(UserContext);
    let { subject_id } = location.state;
    useEffect(() => {

        const fetchClass = async () => {
            try {
                let response = await axios.get('/db/getSubjectById', {params: {id: subject_id}});
                let classes = response.data.classes.filter((_class) => user.user_type == 0 || user.enrolment.some((c) => c.class == _class._id));
                classes.sort(sortfn);
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
                        //gets Date
                        time={new Date(getNextClass(_class.class_start_timestamps)).toDateString() ?? ""}
                        //gets Time Remaining in minutes
                        // timeRemaining={Math.round((new Date(getNextClass(_class.class_start_timestamps)).getTime() - new Date().getTime())/(1000*60)) ?? ""}
                        timeRemaining={isTimeInAnHour(_class)}
                        // isTime={whenIsTime(_class)}
                    />))
                }
            </div>
        </>
    );
}

export default SubjectPage;
