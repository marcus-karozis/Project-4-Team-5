// src/components/SubjectList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Subjects.css'

const subjects = [
    { subject: 'Math', subjectImage: require('./images/analysis.png'), subjectDate: "Spring 2023 (City Campus)", classes: ['Lecture', 'Tutorial'] },
    { subject: 'Science', subjectImage: require('./images/analysis.png'), subjectDate: "Spring 2023 (City Campus)", classes: ['Lecture', 'Workshop'] },
    { subject: 'History', subjectImage: require('./images/engineer.png'), subjectDate: "Spring 2023 (City Campus)", classes: ['Lecture', 'Tutorial'] },
    { subject: 'English', subjectImage: require('./images/engineer.png'), subjectDate: "Spring 2023 (City Campus)", classes: ['Lecture', 'Tutorial', 'Workshop'] },
];

function SubjectList() {
    return (
        <div className="subject-list">
            {subjects.map(({ subject, subjectImage, subjectDate }) => (
                <div key={subject} className='card-box'>
                    <Link to={`/subject/${subject}`} className="card-item">
                        <div>
                            <img src={subjectImage} className="card-image" alt={`${subject} card`} />
                        </div>
                        <div className="card-text">
                            <h3 className="card-name"> {subject} </h3>
                            <p className="card-date">{subjectDate}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SubjectList;
