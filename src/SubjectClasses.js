// src/components/SubjectClasses.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import subjectImage from './white_paper.jpg';
import './Subjects.css'


function SubjectClasses({ subjects }) {
    const { subject: selectedSubject } = useParams();

    // Find the selected subject object in the subjects array
    const selectedSubjectObj = subjects.find((subjectObj) => subjectObj.subject === selectedSubject);

    if (!selectedSubjectObj) {
        return <div>Subject not found</div>;
    }

    const { subject, classes } = selectedSubjectObj;

    return (
        <div className="subject-list">
            {classes.map((classType) => (
                <div key={classType} className='card-box'>
                    <Link to={`/subject/${subject}/${classType}`} className='card-item' >
                        <div>
                            <img src={subjectImage} className="card-image"  alt={`${subject} icon`} />
                        </div>
                        <div className='card-text'>
                            <h3 className="card-name"> {classType} </h3>
                            <p className="card-time"> Class starts at : 16:00</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SubjectClasses;
