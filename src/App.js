import './App.css';
import Navbar from './components/Navbar';
import subjectData from './data/data';
import { Subjects } from './menu/Menu';
import SubjectList from './SubjectList';
import SubjectClasses from './SubjectClasses';
import subjectImage from './white_paper.jpg'; 
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import SubjectPage from './SubjectPage';

const subjects = [
  { subject: 'Math', classes: ['Lecture', 'Tutorial'] },
  { subject: 'Science', classes: ['Lecture', 'Workshop'] },
  { subject: 'History', classes: ['Lecture', 'Tutorial'] },
  { subject: 'English', classes: ['Lecture', 'Tutorial', 'Workshop'] },
];


const subjectPage = ReactDOM.createRoot(document.getElementById('root'));


function SubjectCard() {
  function handleSubjectClick() {
    subjectPage.render(
      <React.StrictMode>
        <SubjectPage />
      </React.StrictMode>
    )
  }

  return (
    <div className="subject-card">
      <div>
        <img src={subjectImage} className="small-image-sizer" alt="subject" />
      </div>
      <div className="center-text">
        <button className="subject-button" onClick={handleSubjectClick}>
          Subject Name
        </button>
      </div>
    </div>

  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          
            <Route path="/" element={<SubjectList />}  />
            {subjects.map(({ subject, classes }) => (
              <Route
                key={subject}
                path={`/subject/:subject`}
                element={<SubjectClasses subjects={subjects}/>}
              />
            ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//OG
// <div className="App">
// <Navbar/>
// </div>
// <div className="SubjectCard">
// {subjectData.map(subjectData => (
//   <Subjects
//   key={subjectData.id}
//   subjectName={subjectData.subjectName}
// />
// ))}
// </div>