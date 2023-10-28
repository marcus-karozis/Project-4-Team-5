import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import subjectImage from '../white_paper.jpg'

// import { Subject } from '../Subject'

export function Subject(subject) {

    return(
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/SubjectPage" state={{subject_id: subject.id, subject_name: subject.subject_name}}>
                <h3 className="subjectName"> {subject.subject_name} </h3>
            </Link>
        </div>
    )
}

export function Class(_class) {

    return(
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/ClassPage" state={{classes: _class.classes, subject_id: _class.subject_id, subject_name: _class.subject_name,  class_id: _class.class_id, class_name: _class.class_name, start_time: _class.start_time,
            end_time: _class.end_time}}>
                <h3 className="subjectName"> {_class.class_name} </h3>
                <h3 className="subjectTime"> {new Date(_class.start_time[0]).toDateString() ?? ""} </h3>
            </Link>
        </div>
    )
}