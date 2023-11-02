import './App.css';
import AuthenticationPage from './login.js';

import Navbar from './components/Navbar';
import { Subject } from './menu/Menu';

import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';
import UserContext from './usercontext';
// import { Subject }  from './Subject';// Import the Subject class


const subjectPage = ReactDOM.createRoot(document.getElementById('root'));

function getNextClass (arr) {
  for (let time of arr.class_start_timestamps){
      let difference = new Date().getTime() - new Date(time).getTime();
      if (difference < 0) {
          return time;
      }
  }
}

//compares tut and lec time
function getEarliestTime (subject) {
  let earliest = new Date();
  for(let _class of subject.classes){
    let newEarly = new Date(getNextClass(_class));
    if (newEarly < earliest) earliest = newEarly;

  }
  return earliest;
}

//main function
function App() {
  const [subjectData, setSubjects] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/db/getSubjectsByUserId', {params: {id: user._id}});
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
        <Navbar />
      </div>
      <div className="SubjectList">
        {subjectData.map(subject => (
          <Subject
            key={subject._id}
            id={subject._id}
            subject_name={subject.subject_name}
            // subjectTimeRemaining={getEarliestTime(subject)}
          />))
        }
      </div>
    </>

  );
}

export default App;
