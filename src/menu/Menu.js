import "./MenuStyles.css";

export function Subjects(subjects) {
    return(
        <div className="subjectList">
            <div key={"subject.id"} className="subjectCard">
                <a href="index.html" className="subjectCard__content">
                    <h3 className="subjectName"> {subjects.subjectName} </h3>
                    <p> class starts at : 16:00</p>
                </a>
            </div>
        </div>
    )
}