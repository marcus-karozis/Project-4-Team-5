import "./MenuStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import User from '../User.js'
import subjectImage from '../white_paper.jpg'
import React, { useContext } from 'react';
import UserContext from "../usercontext";

// import { Subject } from '../Subject'

export function Subject(subject) {


    return (
        <div key={"subject.id"} className="subjectCard">
            <Link to="/subjectPage/SubjectPage" state={{ subject_id: subject.id, subject_name: subject.subject_name }}>
                <h3 className="subjectName"> {subject.subject_name} </h3>
            </Link>
        </div>
    )
}


export function Class(_class) {
    const { user } = useContext(UserContext);

    return (
        <div key={_class.id} className="subjectCard">
            {user.user_type !== 2 ? (
                <Link to="/subjectPage/ClassPage" state={{
                    classes: _class.classes, subject_id: _class.subject_id, subject_name: _class.subject_name, class_id: _class.class_id, class_name: _class.class_name, start_time: _class.start_time,
                    end_time: _class.end_time
                }}>
                    <h3 className="subjectName"> {_class.class_name} </h3>
                    <h3 className="subjectTime"> {new Date(_class.start_time[0]).toDateString() ?? ""} </h3>
                    <h3 className="subjectTime">
                        {new Date(_class.start_time[0]).toLocaleTimeString('en-AU')}
                    </h3>

                    <h3 className="subjectTime"> {new Date(_class.end_time[0]).toLocaleTimeString() ?? ""} </h3>
                </Link>
            ) : (
                <Link to="/subjectPage/studentCode" state={{
                    classes: _class.classes, subject_id: _class.subject_id, subject_name: _class.subject_name, class_id: _class.class_id, class_name: _class.class_name, start_time: _class.start_time,
                    end_time: _class.end_time, user: user
                }}>
                    <h3 className="subjectName"> {_class.class_name} </h3>
                    <h3 className="subjectTime"> {new Date(_class.start_time[0]).toDateString('en-AU') ?? ""} </h3>
                </Link>
            )}
        </div>
    );
}
