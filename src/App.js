import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import subjectData from './data';
import { Subjects } from './menu/Menu';

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
