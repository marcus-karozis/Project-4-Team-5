// src/components/SubjectList.js
import React from 'react';
import { Link } from 'react-router-dom';

import subjectImage from './white_paper.jpg'

const subjects = [
    { subject: 'Math', classes: ['Lecture', 'Tutorial'] },
    { subject: 'Science', classes: ['Lecture', 'Workshop'] },
    { subject: 'History', classes: ['Lecture', 'Tutorial'] },
    { subject: 'English', classes: ['Lecture', 'Tutorial', 'Workshop'] },
];

function SubjectList() {
    return (
        <div className="subjectList">
            {subjects.map(({ subject }) => (
                <div key={"subject.id"} className='subjectCard'>
                    <div className="subjectCard__content">
                        <Link to={`/subject/${subject}`} style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>
                            <div>
                                <img src={subjectImage} className="small-image-sizer" alt="subject" />
                            </div>
                            <h3 className="subjectName"> {subject} </h3>
                            
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SubjectList;
