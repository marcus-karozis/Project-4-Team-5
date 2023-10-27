
import AdminTicketPage from './adminTicketsPage/AdminTicketsPage';

// will choose page depending on the user
    // at the moment, it will only render the adminTicketPage as the 
    // teacher/student version has not been completed yet
// at the momemt the typeOfUser is dummy data just to test if two different pages render :)

    const user = {
        user_type: 0
    }

    const typeOfUser = user.user_type; // 0: admin, 1: lecturer, 2: student

    function ticketPage() {
        return (
            <div>
                {typeOfUser === 0 ? <AdminTicketPage/> : "insert teacher/student page here"}
            </div>
        );
    }

    export default ticketPage;