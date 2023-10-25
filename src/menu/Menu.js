import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import subjectImage from '../white_paper.jpg'
import { Subject } from '../Subject';// Import the Subject class
import { SClass } from '../SClass';// Import the Subject class

export function SubjectCard(_subject) {

    const newSubject = new Subject(_subject.subject_name, _subject.classes)
   
    return (
        <div key={"subject._id"} className="subjectCard">
            <Link to="/subjectPage/SubjectPage" state={{ subject_name: newSubject.subject_name }}>
                <h3 className="subjectName"> {newSubject.subject_name} </h3>
            </Link>
        </div>
    )
}

export function ClassCard(_class) {
    
    const newClass = new SClass(_class.class_name, _class.class_start_timestamps, _class.class_end_timestamps, _class.codes);

    
    
    return (
        <div key={"subject.subject_name"} className="subjectCard">
            <Link to="/subjectPage/ClassPage" state={{ subject_name: _class.subject_name, class_id: _class._id, time: _class.class_start_timestamps }}>
                <h3 className="subjectName"> {newClass.class_name} </h3>
                <h3 className="subjectTime"> {newClass.class_start_timestamps} </h3>
            </Link>
        </div>
    )
}