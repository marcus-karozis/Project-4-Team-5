import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import subjectImage from '../white_paper.jpg'

export function Subjects(subjects) {
    return(
        <div>
            <div className="subjectList">
                <div key={"subject.id"} className="subjectCard">
                    <div className="subjectCard__content">
                        <Link to="/subjectPage/SubjectPage" style={{ textDecoration: 'none', color: 'black', textAlign: 'center'}}>
                            <div>
                                <img src={subjectImage} className="small-image-sizer" alt="subject" />
                            </div>
                            <h3 className="subjectName"> {subjects.subjectName} </h3>
                            <p> class starts at : 16:00</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}