import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import './HistoryPage.css'

import UserContext from '../usercontext';




function HistoryPage() {

    const { user } = useContext(UserContext);
    const [extractedCheckIns, setExtractedCheckIns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user check-ins
                const response = await axios.get('/db/getUserById', { params: { id: user._id } });
                const userCheckIns = response.data.enrolment;

                // Process user check-ins data
                const extractedCheckInsArray = await Promise.all(
                    userCheckIns
                        .filter(check => check.checkin_timestamps.length > 0)
                        .map(async entry => {
                            try {
                                const classResponse = await axios.get('/db/getClassById', {
                                    params: { subjectId: entry.subject_id, classId: entry.class },
                                });
                                const subject_name = classResponse.data.subjectName;
                                const class_name = classResponse.data.className;
                                const timestamps = entry.checkin_timestamps;

                                return {
                                    subject_name,
                                    class_name,
                                    timestamps,
                                };
                            } catch (error) {
                                console.error(error);
                                return null;
                            }
                        })
                );

                // Set the state variable with the processed data
                setExtractedCheckIns(extractedCheckInsArray.filter(checkIn => checkIn !== null));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user._id]);

    return (
        <>
        <Navbar></Navbar>
        <div className='table'>
            <table>
                {/* header */}
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {/* Map over the extractedCheckIns array and render the data */}
                    {extractedCheckIns.map((checkIn, index) => (
                        <tr key={index} >
                            <td>{checkIn.subject_name}</td>
                            <td>{checkIn.class_name}</td>
                            <td>{new Date(checkIn.timestamps).toDateString('en-AU') }</td>
                            <td>{new Date(checkIn.timestamps).toLocaleTimeString('en-AU') }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>

    )
};

export default HistoryPage; 