import './App.css';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// const mainDash = ReactDOM.createRoot(document.getElementById('root'));

function SubjectPage() {
    // function handleBackClick() {
    //     mainDash.render(
    //         <React.StrictMode>
    //           <App />
    //         </React.StrictMode>
    //     );
    //   }

    return (
        <div className="dashboard-layout" id="subjectPage">
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

            <div className="dashboard-subject-header">
                <div className="dashboard-row center-objects">
                    <div>
                        <b>Subject Name</b>
                    </div>
                    <div className="column-padding-4-percent">
                        {/* <button className="back-button" onClick={handleBackClick}>
                            Back (not working yet)
                        </button> */}
                        <span style={{ color: 'blue', fontSize: 16}}>Back</span>
                    </div>
                </div>
            </div>
            
            <div className="dashboard-main-content">
                <div className="dashboard-row center-objects">
                    <div className="code-box">
                        Generated Code
                    </div>
                    <div className="column-padding-4-percent">
                        <button>Regenerate Code</button>
                    </div>
                    <div className="column-padding-2-percent">
                        <button>Disable Code</button>
                    </div>
                </div>
            </div>
            
        </div>
    );   
}

export default SubjectPage;