import React, { useState, useRef, useEffect } from 'react';

import Navbar from '../../components/Navbar';
import './AdminTicketsPage.css';

import emailjs from '@emailjs/browser';
import axios from 'axios';

import { Ticket } from '../../Ticket.js'; // Import the Ticket class

//import LoadingSpinner from "../../components/LoadingSpinner";


function NotCompleteTicket(props) {

    const adminTicketComplete = useRef();


    const info_box_id = props.id + "_info_box";
    const success_box_id = props.id + "_compete_ticket_form_successful_response";
    const failed_box_id = props.id + "_compete_ticket_form_failed_response";

    return (

        <div>
            <div className="ticket_card"> {/*  */}
                <div className="" style={{ order: 1, marginRight: '20px', padding: '20px', maxWidth: '500px' }}>
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Issue:</b> {props.issue}
                </div>
            </div>


        </div>
    )
}

function CompletedTicket(props) {
    return (
        <div>
            <div className="ticket_card">
                <div style={{ order: 1, marginRight: '20px', padding: '20px', maxWidth: '500px' }}>
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Issue:</b> {props.issue}
                </div>
                <div style={{ order: 2, marginRight: '0px', padding: '20px' }}>
                    <div className="completeTicket">
                        <b>Completed</b>
                    </div>
                </div>
            </div>

        </div>
    )
}

function TicketChecker(props) {
    const isComplete = props.tick_complete;

    // tick_complete={props.tick_complete}
    // id={props._id}
    // name={props.name}
    // email={props.email}
    // userID={props.user_id}
    // issue={props.issue}

    return (
        <div className="">
            {isComplete == true ? <CompletedTicket tick_complete={props.tick_complete}
                id={props.id}
                name={props.name}
                email={props.email}
                userID={props.userID}
                issue={props.issue} />
                :
                <NotCompleteTicket tick_complete={props.tick_complete}
                    id={props.id}
                    name={props.name}
                    email={props.email}
                    userID={props.userID}
                    issue={props.issue} />}
        </div>
    )
}


function UserSupportTicketsPage() {

    // ticket query

    const [ticketData, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // all tickets query
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/db/getTicketsByUserId');
                const tickets = response.data;
                setTickets(tickets);
                console.log(tickets);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTickets();

    }, []);

    return (
        <div>
            <div className="" style={{ marginBottom: '80px' }}>
                <Navbar />
            </div>

            <div className="page_padding">
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1>Tickets</h1>
                </div>

                <div>

                    <div className="ticketList">
                        {ticketData.map(ticket => (
                            <TicketChecker
                                tick_complete={ticket.tick_complete}
                                id={ticket._id}
                                name={ticket.name}
                                // email={ticket.email}
                                // userID={ticket.user_id}
                                issue={ticket.message}
                            />
                        ))
                        }
                    </div>

                </div>

            </div>
        </div>
    );
}

export default UserSupportTicketsPage;