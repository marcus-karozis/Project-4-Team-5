import React, { useState, useRef, useEffect } from 'react';

import Navbar from '../components/Navbar';
import adminStyles from './AdminTicketsPageStyles.css';

import emailjs from '@emailjs/browser';
import axios from 'axios';


function NotCompleteTicket() {

    const adminTicketComplete = useRef();

    function handleSubmitTicketCompleteForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // confirm is user wants to submit the form
        if (window.confirm("Are you sure you are ready to set this to complete?")) {
            // do this if ok pressed
            console.log("Ok was pressed...");
            // something will happen here

            // get the ticket this is happening for
            // update the tick_complete column to true

            // get the email the ticket has stored
            // send "Ticket Confirmation Email" to that email
        }
        else {
            // do this if cancel pressed
            console.log("cancelled form submit...");
            // nothing happens here
        }

    }

    return (
        <div className="ticket_card" style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '20px', padding: '20px' }}>
                <b>Ticket ID:</b> xx <br></br>
                <b>User:</b> Name/Email <br></br>
                <b>Issue:</b> Issue goes here...
            </div>
            <div style={{ flex: 1, border: '2px solid #c3d9e8', borderRadius: '3px', padding: '20px' }}>
                <form method="post" ref={adminTicketComplete} onSubmit={handleSubmitTicketCompleteForm}>
                    <div id="response_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Response </label>
                        </div> */}
                        <div>
                            <textarea name="response_input" className="textarea_admin_section" rows={8} cols={40} required placeholder='Response'/>
                        </div>
                    </div>

                    <div id="submit_button_box" style={{textAlign: 'center'}}>
                        <button>Mark As Complete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function CompletedTicket() {
    return (
        <div className="ticket_card" style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '20px', padding: '20px' }}>
                <b>Ticket ID:</b> xx <br></br>
                <b>User:</b> Name/Email <br></br>
                <b>Issue:</b> Issue goes here...
            </div>
            <div style={{ flex: 1, border: '2px solid #c3d9e8', borderRadius: '3px', padding: '20px' }}>
                <b>Date Complete: </b> dd/mm/YYYY
            </div>
        </div>
    )
}


function AdminTicketsPage() {

    // ticket query

    const [ticketData, setTickets] = useState([]);

    useEffect(() => {
        // all tickets query
        const fetchTickets = async () => {
        try {
            const response = await axios.get('/db/tickets');
            const tickets = response.data;
            setTickets(tickets);
            console.log(tickets);
        } catch (error) {
            console.error(error);
        }
        };

        // // test for tickets of specific ID (user_id: "1234567") - test ticket
        // const fetchTickets = async () => {
        //     try {
        //         const response = await axios.get('/db/getTicketsByUserId', { params: { userID: "1234567" }});
        //         const tickets = response.data;
        //         setTickets(tickets);
        //         console.log(tickets);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };

        fetchTickets();

    }, []);

    return (
        <div>
            <div className="" style={{ marginBottom: '80px' }}>
                <Navbar/>
            </div>

            <div className="page_padding">
                <div style={{textAlign: 'center'}}>
                    <h1>Tickets</h1>
                </div>

                <div>
                    {/* <NotCompleteTicket/>
                    <CompletedTicket/> */}

                    {/* <div className="SubjectList">
                        {subjectData.map(subject => (
                        <Subject
                            key={subject._id}
                            id={subject._id}
                            subjectName={subject.subject_name}
                        />))
                        }
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default AdminTicketsPage;