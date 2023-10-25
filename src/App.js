import './App.css';
import AuthenticationPage from './login.js';

import Navbar from './components/Navbar';
import { SubjectCard } from './menu/Menu';

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';

const subjectPage = ReactDOM.createRoot(document.getElementById('root'));

//main function
function App() {
  const [subjectData, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/db/subjects');
        const subjects = response.data;
        setSubjects(subjects);
       
        console.log(subjects.subject_name)
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <>
      <div className="App">
        <Navbar/>
      </div>
      <div className="SubjectList">
        {subjectData.map(subject => (
          <SubjectCard
            subject_name={subject.subject_name}
            subject_classes={subject.classes}
          />
          ))
        }
      </div>
    </>

  );
}

export default App;
