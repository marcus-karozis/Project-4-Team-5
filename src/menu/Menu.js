import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import subjectImage from '../white_paper.jpg'

export function Subjects(subjects) {
    return(
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/SubjectPage" style={{ textDecoration: 'none', color: 'black', textAlign: 'center'}}>
                <div>
                    <h3 className="subjectName"> {subjects.subjectName} </h3>
                    <p> 16:00</p>
                </div>
            </Link>
        </div>
    )
}