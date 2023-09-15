import './App.css';
import Login from './login.js';
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
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <div className="dashboard-row">
          <div className="column-padding-4-percent">
            <p className="white-text">Hi, Account Name</p>
          </div>
          <div className="column-padding-4-percent padding-header-button">
            <button className="header-button">Sign out</button>
          </div>
          <div className="column-padding-4-percent">
              <p className="white-text">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="dashboard-row center-objects">
          < SubjectCard />
          < SubjectCard />
          < SubjectCard />
          {/* < SubjectCard /> */}
        </div>
      </div>

    </div>
    
  );
}

export default App;
