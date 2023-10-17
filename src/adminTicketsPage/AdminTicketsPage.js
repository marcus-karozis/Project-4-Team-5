import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import adminStyles from './AdminTicketsPageStyles.css';

function NotCompleteTicket() {

    const adminTicketComplete = useRef();

    function handleSubmitTicketCompleteForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // confirm is user wants to submit the form
        if (window.confirm("Are you ready to submit this issue/enquiry to the sytsem admin?")) {
            // do this if ok pressed
            console.log("Ok was pressed...");
            // something will happen here
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
                <b>Ticket ID:</b> 1 <br></br>
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
        <div>
            <p>CompletedTicket!</p>
        </div>
    )
}

function AdminTicketsPage() {
    return (
        <div>
            <div className="" style={{ marginBottom: '60px' }}>
                <Navbar/>
            </div>

            <div className="page_padding">
                <div style={{textAlign: 'center'}}>
                    <h1>Tickets</h1>
                </div>

                <div>
                    <NotCompleteTicket/>
                    {/* <CompletedTicket/> */}
                </div>
            </div>
        </div>
    );
}

export default AdminTicketsPage;