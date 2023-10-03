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
  { subject: 'Math', subjectImage: require('./images/analysis.png'), classes: ['Lecture', 'Tutorial'] },
  { subject: 'Science', subjectImage: require('./images/analysis.png'), classes: ['Lecture', 'Workshop'] },
  { subject: 'History', subjectImage: require('./images/engineer.png'), classes: ['Lecture', 'Tutorial'] },
  { subject: 'English', subjectImage: require('./images/engineer.png'), classes: ['Lecture', 'Tutorial', 'Workshop'] },
];



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='dashboard'>
          <Routes>
            <Route path="/" element={<SubjectList />} />
            {subjects.map(({ subject, classes }) => (
              <Route
                key={subject}
                path={`/subject/:subject`}
                element={<SubjectClasses subjects={subjects} />}
              />
            ))}
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;

