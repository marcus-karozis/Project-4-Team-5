
import { Link, useParams } from 'react-router-dom';


const subjects = ["Software Analysis", "Software Design", "Marketing", "Accounting", "Finance"];
const classes = ["Lecture", "Tutorial"];

function SubjectPage() { 
    const { subject } = useParams(); // Get the subject from the URL
    return (
      <div>
        <h1>{subject} Classes</h1>
        <div className="container">
          <div className="dashboard">
            <div className="box-list">
              {classes.map((type, index) => (
                <Link key={index} to={`/subjects/${subject}/${type}`} className="box">
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SubjectPage;