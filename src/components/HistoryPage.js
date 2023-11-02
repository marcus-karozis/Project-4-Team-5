import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

import UserContext from '../usercontext';

function HistoryPage() {

    const { user } = useContext(UserContext);
    const [ticketData, setTickets] = useState([])

    useEffect(() => {
        const fetchUserCheckIns = async () => {
            try {
                const response = await axios.get('/db/getSubjectsByUserId', {params: {id: user._id}});
                const tickets = response.data;
                console.log(JSON.stringify(tickets, null, 2))
                setTickets(tickets);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserCheckIns();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div>History Page </div>
        </>

    )
};

export default HistoryPage; 