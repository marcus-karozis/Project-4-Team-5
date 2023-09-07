

import { Link } from 'react-router-dom';

const subjects = ["Software Analysis", "Software Design", "Marketing", "Accounting", "Finance"];
const classes = ["Lecture", "Tutorial"];

function Dashboard() {
    return (
      <div>
        <nav className="main-nav navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <button className="btn btn-primary ">Logout</button>
                </div>
            </div>
        </nav>
        <div>
          <div className="dashboard">
            <div className='box-list'>
              {subjects.map((subject, index) => (
                <Link key={index} to={`/subjects/${subject}`} className='box'>
                  {subject}
                </Link>))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;