// import logo from './logo.svg';
import './App.css';

import subjectImage from './white_paper.jpg'

function SubjectCard() {
  return (
    <div className="subject-card">
      <div>
        <img src={subjectImage} className="small-image-sizer" alt="subject" />
      </div>
      <div className="center-text">
        <button className="subject-button">Subject Name</button>
      </div>
    </div>
    
  )
}

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1>HELLOOOOOO WORLD!</h1>
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>

    //     {/* <br></br> */}

    //     {/* <button>
    //       <img src="./wallpaper-one.jpg" alt="test button" />
    //       <label>Test Button</label>
    //     </button> */}

    //     {/* <div style={{ backgroundImage: testImage }}>Overlay text</div> */}

    //   </header>
    // </div>

    <div className="dashboard-layout">
      <div className="dashboard-header">
        <div className="dashboard-row">
          <div className="column-padding-4-percent">
            <p className="white-text">Hi, Account Name</p>
          </div>
          <div className="column-padding-4-percent padding-header-button">
            <button className="nice-button">Sign out</button>
          </div>
          {/* <div className="column-padding-20-percent">
            <p className="white-circle white-text">circ</p>
          </div> */}
          {/* <div className="column-padding-25-percent">
            <p className="white-box white-text">Teacher Dashboard</p>
          </div> */}
        </div>
        {/* <h1>HELLOOOOO WOrLd!</h1> */}
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
