import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

/* import subjectImage from '../white_paper.jpg' */

export function Subject(subjects) {
    return(
        <div key={"subject.id"} className="subjectCard">
            <img className="subjectImage"></img>
            <Link to="/subjectPage/SubjectPage" state={{subject_id: subjects.id}}>
                <h3 className="subjectName"> {subjects.subjectName} </h3>
            </Link>
        </div>
    )
}

export function Class(_class) {
    return(
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/ClassPage" state={{subject_id: _class.subject_id, class_id: _class.class_id, time: _class.time}}>
                <h3 className="subjectName"> {_class.className} </h3>
                <h3 className="subjectTime"> {_class.time} </h3>
            </Link>
        </div>
    )
}