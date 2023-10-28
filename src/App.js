import './App.css';
import AuthenticationPage from './login.js';

import Navbar from './components/Navbar';
import { Subject } from './menu/Menu';

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';
// import { Subject }  from './Subject';// Import the Subject class


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
          <Subject
            key={subject._id}
            id={subject._id}
            subject_name={subject.subject_name}
            
          />))
        }
      </div>
    </>

  );
}

export default App;
