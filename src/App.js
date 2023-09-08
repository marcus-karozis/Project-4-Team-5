import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import subjectData from './data';
import { Subjects } from './menu/Menu';

// import SubjectPage from './subjectPage';
// import { BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom';
// // import {Route, Switch} from 'react-router';

function App() {
  return (
    <>
    {/* <Router> */}
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


        {/* <Routes> */}
          {/* <Route path="/SubjectPage" element={<SubjectPage/>}/>             */}
          {/* <Route path="/subjectPage" Component={SubjectPage}></Route> */}
        {/* </Routes> */}
      {/* </Router> */}

    </>
    
  );
}

export default App;
