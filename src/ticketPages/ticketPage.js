
import AdminTicketPage from './adminTicketsPage/AdminTicketsPage';

import User from '../User.js'
import React, { useContext } from 'react';
import UserContext from "../usercontext";


    function TicketPage() {
        const { user } = useContext(UserContext);
        const typeOfUser = user.user_type; // 0: admin, 1: lecturer, 2: student

        return (
            <div>
                {typeOfUser === 0 ? <AdminTicketPage/> : "insert teacher/student page here"}
            </div>
        );
    }

    export default TicketPage;