import './App.css';
import AuthenticationPage from './login.js';

import Navbar from './components/Navbar';
import { Subject } from './menu/Menu';

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';

const subjectPage = ReactDOM.createRoot(document.getElementById('root'));

function getNextClass (arr) {
  let now = new Date();
  for (let time of arr){
      let difference = now.getTime() - new Date(time).getTime();
      if (difference < 0) {
          return time;
      }
  }
}

//compares tut and lec time
function getEarliestTime (a, b) {
  let timeLec, timeTut;
  timeLec = new Date(getNextClass(a));
  let time1 = Math.round((timeLec.getTime() - new Date().getTime())/(1000*60));
  timeTut = new Date(getNextClass(b));
  let time2 = Math.round((timeTut.getTime() - new Date().getTime())/(1000*60));
  if(time1 > time2){
    return time1;
  }
  else{
    return time2;
  }
}

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
        <Navbar />
      </div>
      <div className="SubjectList">
        {subjectData.map(subject => (
          <Subject
            key={subject._id}
            id={subject._id}
            subjectName={subject.subject_name}
            // subjectTimeRemaining={getEarliestTime(subject.classes[0], subject.classes[1])}
          />))
        }
      </div>
    </>

  );
}

export default App;
