import './App.css';
import Navbar from './components/Navbar';
import subjectData from './data/data';
import { Subjects } from './menu/Menu';

import subjectImage from './white_paper.jpg'

import React from 'react';
import ReactDOM from 'react-dom/client';
import SubjectPage from './SubjectPage';

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
    <>
      <div className="App">
        <Navbar/>
      </div>
      <div className="SubjectCard">
        {subjectData.map(subjectData => (
          <Subjects
          key={subjectData.id}
          subjectName={subjectData.subjectName}
        />
        ))}
      </div>
    </>
    
  );
}

export default App;
