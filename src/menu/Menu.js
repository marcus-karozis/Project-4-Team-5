import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import subjectImage from '../white_paper.jpg'

export function Subjects(subjects) {
    return(
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/SubjectPage">
                <h3 className="subjectName"> {subjects.subjectName} </h3>
                <h3 className="subjectTime"> {subjects.time} </h3>
            </Link>
        </div>
    )
}