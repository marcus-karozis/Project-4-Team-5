// src/components/SubjectClasses.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import subjectImage from './white_paper.jpg';


function SubjectClasses({ subjects }) {
    const { subject: selectedSubject } = useParams();

    // Find the selected subject object in the subjects array
    const selectedSubjectObj = subjects.find((subjectObj) => subjectObj.subject === selectedSubject);

    if (!selectedSubjectObj) {
        return <div>Subject not found</div>;
    }

    const { subject, classes } = selectedSubjectObj;

    return (
        <div className="subjectList">
            {classes.map((classType) => (
                <div key={classType.id} className='subjectCard'>
                    <div className="subjectCard_content">
                        <Link to={`/subject/${subject}/${classType}`} style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>
                        <div>
                                <img src={subjectImage} className="small-image-sizer" alt={`${subject} icon`} />
                            </div>
                            <h3 className="subjectName"> {classType} </h3>
                            <p> class starts at : 16:00</p>   
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SubjectClasses;
