import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import User from '../User.js'
import subjectImage from '../white_paper.jpg'
import React, { useContext } from 'react';
import UserContext from "../usercontext";

export function Subject(subjects) {
    return(
        <div key={"subject.id"} className="subjectCard">
            <img className="subjectImage"></img>
            <Link to="/subjectPage/SubjectPage" state={{subject_id: subjects.id}}>
                <h3 className="subjectName"> {subjects.subjectName} </h3>
                <h3 className="subjectTimeRemaining"> {subjects.subjectTimeRemaining} </h3>
            </Link>
        </div>
    )
}


export function Class(_class) {
  const { user } = useContext(UserContext);
    return (
      <div key={_class.id} className="subjectCard">
        {user.user_type !== 2 ? (
          <Link to="/subjectPage/ClassPage" state={{ subject_id: _class.subject_id, class_id: _class.class_id, time: _class.time }}>
            <h3 className="subjectName"> {_class.className} </h3>
            <h3 className="subjectTime"> {_class.time} </h3>
            <h3 className="subjectTimeRemaining"> {_class.timeRemaining} </h3>
          </Link>
        ) : (
          <Link to="/studentcode" state={{ subject_id: _class.subject_id, class_id: _class.class_id, time: _class.time }}>
            <h3 className="subjectName"> {_class.className} </h3>
            <h3 className="subjectTime"> {_class.time} </h3>
            <h3 className="subjectTimeRemaining"> {_class.timeRemaining} </h3>
          </Link>
        )}
      </div>
    );
  }
