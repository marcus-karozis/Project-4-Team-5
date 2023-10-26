import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import subjectImage from '../white_paper.jpg'
import { Subject } from '../Subject';// Import the Subject class
import { SClass } from '../SClass';// Import the Subject class

export function SubjectCard(subject) {
    // const newSubject = new Subject(subject.subject_id, subject.subject_name, subject.subject_classes)
   
    return (
        <div key={subject._id} className="subjectCard">
            <Link to="/subjectPage/SubjectPage" state={{ subject_id: subject.subject_id }}>
                <h3 className="subjectName"> {subject.subject_name} </h3>
            </Link>
        </div>
    )
}

export function ClassCard(_class) {
    
    // const newClass = new SClass( _class._id, _class.class_name, _class.class_start_timestamps, _class.class_end_timestamps, _class.codes);

    return (
        <div key={"subject.subject_name"} className="subjectCard">
            <Link to="/subjectPage/ClassPage" state={{ subject_id: _class.subject_id, class_id: _class.class_id, class_name: _class.class_name, time: _class.class_start_timestamps, end_time: _class.class_end_timestamps, codes:_class.codes }}>
                <h3 className="subjectName"> {_class.class_name} </h3>
                <h3 className="subjectTime"> {_class.class_start_timestamps} </h3>
            </Link>
        </div>
    )
}