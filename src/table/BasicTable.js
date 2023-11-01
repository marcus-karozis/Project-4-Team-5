import React, { useEffect, useState } from 'react'
import './table.css'
import axios from 'axios';

//refer to studentData.json and columns.js
//I dont know what every thing does, I just follow https://www.youtube.com/watch?v=YwP4NAZGskg&list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz
//I did not implement all of them, just from tutorial 1 - 3


let checkInTime = '' 

const BasicTable = (obj) => {
    let subject_id = obj.subject_id;
    let class_id = obj.class_id;
    let startTime = obj.startTime;
    console.log("subject: " + subject_id)
    console.log("class: " + class_id)
    console.log("startTime: " + startTime)
    let [userData, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await axios.get('/db/users');
                // let users = response.data.filter(user => user.enrolment.some(_class => _class.subject_id === subject_id && _class.class === class_id));
                let users = response.data.filter(user => user.user_type === 2)
                console.log("users: " + users) 
                let filteredUsers = users.filter(user => user.enrolment.some(item => item.subject_id === subject_id && item.class === class_id));
                console.log("filteredUsers: " + filteredUsers)
                setUsers(filteredUsers);
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [class_id, subject_id]);

    const checkIfPresent = (user) => {
        
        let checkins = user.enrolment.find(_class => _class.class === class_id)?.checkin_timestamps;
        console.log("checkins: " + checkins)
        checkInTime = new Date(checkins)
        if ( checkInTime >= new Date(startTime)) {
            return true;
        }
        // maybe add before expiration date aswell so users cant login after the class is finished
        //also need to remove the users enrolment once the code has expired
        return false;
    }

    return (
        <div>
            <table>
                {/* header */}
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date and Time</th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {/* in COLUMNS, for every accessor, refer to studentData, take values from there */}
                    {
                        userData.map(user => {
                            //If isPresent = true , green, if false, red
                            const isPresent = checkIfPresent(user);
                            return (
                                <tr className={`row-isPresent-${isPresent}`}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{isPresent ? checkInTime.toLocaleString('en-AU') : "Absent"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable