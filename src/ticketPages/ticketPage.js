
import AdminTicketPage from './adminTicketsPage/AdminTicketsPage';
// import TechSupportPage from '../techSupportPage/TechSupportPage'; // tech support page is only used for the "support" link in navbar
import UserSupportTicketsPage from './userTicketsPage/UserSupportTicketsPage';

import React, { useContext, useState } from 'react';
import User from '../User.js';
import UserContext from "../usercontext";



function TicketPage() {
    const { user } = useContext(UserContext);
    const typeOfUser = user?.user_type; // 0: admin, 1: lecturer, 2: student
    
    return (
        <div>
            {typeOfUser === 0 ? <AdminTicketPage /> : <UserSupportTicketsPage  />}
        </div>
    );
}

export default TicketPage;