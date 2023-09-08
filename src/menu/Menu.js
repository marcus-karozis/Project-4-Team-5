import "./MenuStyles.css";
// import SubjectPage from '../subjectPage';

// import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import subjectImage from '../white_paper.jpg'

import SubjectPage from '../subjectPage';

// function SubjectCard() {
//   // function handleSubjectClick() {
//   //   subjectPage.render(
//   //     <React.StrictMode>
//   //       <SubjectPage />
//   //     </React.StrictMode>
//   //   )
//   // }

//   return (
//     <div className="subject-card">
//       <div>
//         <img src={subjectImage} className="small-image-sizer" alt="subject" />
//       </div>
//       <div className="center-text">
//         <button className="subject-button" /*onClick={handleSubjectClick}*/>
//           Subject Name
//         </button>
//       </div>
//     </div>
    
//   )
// }

export function Subjects(subjects) {
    return(

        // <Router>

        //     <Routes>
        //         <Route path="/SubjectPage" element={<SubjectPage/>}/>
        //     </Routes>

        // </Router>

        <div>

            {/* <Router> */}

            <div className="subjectList">
            <div key={"subject.id"} className="subjectCard">
                <div className="subjectCard__content">
                {/* <a href="subjectPage.html" className="subjectCard__content"> */}
                <Link to="/subjectPage">
                    <div>
                        <img src={subjectImage} className="small-image-sizer" alt="subject" />
                    </div>
                    <h3 className="subjectName"> {subjects.subjectName} </h3>
                    <p> class starts at : 16:00</p>
                {/* </a> */}
                </Link>
                </div>
            </div>

            </div>

                {/* <Routes>
                    <Route path="/subjectPage" Component={SubjectPage}></Route>
                </Routes> */}
            {/* </Router> */}
        </div>
    )
}