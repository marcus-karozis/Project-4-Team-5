import React, { useState, useRef, useEffect } from 'react';

import Navbar from '../../components/Navbar';
// import  './AdminTicketsPageStyles.css';

import emailjs from '@emailjs/browser';
import axios from 'axios';

import { Ticket } from '../../Ticket.js'; // Import the Ticket class


import LoadingSpinner from "../../components/LoadingSpinner";





function NotCompleteTicket(props) {

    const adminTicketComplete = useRef();

    function handleSubmitTicketCompleteForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // confirm is user wants to submit the form
        if (window.confirm("Are you sure you are ready to set this to complete?")) {
            // do this if ok pressed
            console.log("Ok was pressed...");

            var spinner = document.getElementById('adminTicketsSpinnerDiv');
            spinner.style.display = "block"; // show loading spinner

            // get the ticket this is happening for
            // update the tick_complete column to true

            // Read the form data
            const form = e.target;
            const formData = new FormData(form);

            // obtain all the data on the form & store in object to use when creating ticket
            const formJson = Object.fromEntries(formData.entries());

            // create ticket object
            const updatedTicket = new Ticket(formJson["name_input"], formJson["email_input"], formJson["issue_input"], formJson["userID_input"].toString());
            console.log(updatedTicket);

            // set the ticket object's id to the exiting ticket id (since we want to update it)
            updatedTicket.setExistingTicketID(formJson["ticket_id"]);
            console.log(updatedTicket);

            // set the ticket object's completed status to true
            updatedTicket.setTickCompleteStatus(true);
            console.log(updatedTicket);

            // ticket database update request goes here
            console.log("updating in server...");
            updatedTicket.updateAndSaveToServer();

            // get the email the ticket has stored
            // send "Ticket Confirmation Email" to that email
            // send email to user

            /*
                note: the service to send emails has a limit each month so the code to send
                the email is commented out so it doesn't eat up the limit too quick (although
                    there is 200 emails/month that can be sent but still just incase).
                
                --
                
                also the details to access where the email is sent will be adding the details into the 
                jira ticket for the tech support page :)

                ~ Chantel
            */

            // // comment below back in if you want to send a test email for ticket completion

            emailjs.sendForm('service_gs0av92', 'template_4p9ckzz', adminTicketComplete.current, 'KNHae1w2H-IMWhEI7')
                .then((result) => {
                    console.log(result.text + " | Email Sent to User!");
                    var idOfDiv = formJson["ticket_id"] + "_compete_ticket_form_successful_response";
                    var responseBox = document.getElementById(idOfDiv);
                    responseBox.style.display = 'block';
                    spinner.style.display = "none"; // Hide loading spinner 
                }, (error) => {
                    console.log(error.text + " | Could Not Send Email To User");
                    var idOfDiv = formJson["ticket_id"] + "_compete_ticket_form_failed_response";
                    var responseBox = document.getElementById(idOfDiv);
                    responseBox.style.display = 'block';
                    spinner.style.display = "none";   // Hide loading spinner 
                });

            // // comment above back in if you want to send a test email for ticket completion

        }
        else {
            // do this if cancel pressed
            console.log("cancelled form submit...");
            // nothing happens here
        }

    }

    function showExtraInfo(e) {

        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // obtain all the data on the form & store in object to use when creating ticket
        const formJson = Object.fromEntries(formData.entries());

        var idOfDiv = formJson["ticket_id"] + "_info_box";

        var x = document.getElementById(idOfDiv);
        var button = document.getElementById(formJson["ticket_id"]);

        if (x.style.display == "none") {
            x.style.display = "flex";
            button.innerHTML = "▼";
        } else {
            x.style.display = "none";
            button.innerHTML = "Ticket Info";
        }
    }

    // tick_complete={props.tick_complete} 
    // id={props.id}
    // name={props.name}
    // email={props.email}
    // userID={props.userID}
    // issue={props.issue}

    const info_box_id = props.id + "_info_box";
    const success_box_id = props.id + "_compete_ticket_form_successful_response";
    const failed_box_id = props.id + "_compete_ticket_form_failed_response";

    return (

        <div>
            <div className="ticket_card">
                <div className="ticket-text">
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Issue:</b> {props.issue}
                </div>
                <div className="ticket-status">
                    <div className="notCompleteTicket">
                        <p><b>Not Completed</b></p>
                    </div>
                </div>
                <div className="ticket-info" >
                    <form method="post" onSubmit={showExtraInfo}>
                        <input name="ticket_id" type="hidden" value={props.id} />
                        <button id={props.id}>
                            Ticket Info
                        </button>
                    </form>
                </div>
            </div>

            <div id={info_box_id} className="inner_ticket_card" style={{ display: 'none' }}>
                <div style={{ flex: 1, marginRight: '20px', padding: '20px' }}>
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Name:</b> {props.name} <br></br>
                    <b>Email:</b> {props.email} <br></br>
                    <b>User ID:</b> {props.userID} <br></br>
                    <b>Issue:</b> {props.issue}
                </div>
                <div style={{ flex: 1, border: '2px solid #c3d9e8', borderRadius: '3px', padding: '20px', textAlign: 'center', background: 'white' }}>
                    <form method="post" ref={adminTicketComplete} onSubmit={handleSubmitTicketCompleteForm}>

                        <div id="hidden_elements_box">
                            <input name="ticket_id" type="hidden" value={props.id} />
                            <input name="issue_input" type="hidden" value={props.issue} />
                            <input name="name_input" type="hidden" value={props.name} />
                            <input name="email_input" type="hidden" value={props.email} />
                            <input name="userID_input" type="hidden" value={props.userID} />
                        </div>

                        <div id="response_box">
                            {/* <div className="label_div" style={{}}>
                                <label > Response </label>
                            </div> */}
                            <div>
                                <textarea name="response_input" className="textarea_admin_section" rows={8} cols={40} required placeholder='Response' />
                            </div>
                        </div>

                        <div id="submit_button_box" style={{ textAlign: 'center' }}>
                            <button>Mark As Complete</button>
                        </div>
                    </form>

                    <div style={{ textAlign: 'center' }}>
                        <div id={success_box_id} style={{ display: 'none' }}>
                            <div className='successful_submission_admin'>
                                Ticket has been set to complete. Email has been sent to the user's email.
                            </div>
                        </div>
                        <div id={failed_box_id} style={{ display: 'none' }}>
                            <div className='invalid_submission_admin'>
                                There was an issue setting this ticket to complete & sending email to the user's email. Please try again.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function CompletedTicket(props) {

    // tick_complete={props.tick_complete} 
    // id={props.id}
    // name={props.name}
    // email={props.email}
    // userID={props.userID}
    // issue={props.issue}

    const info_box_id = props.id + "_info_box";

    function showExtraInfo(e) {

        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // obtain all the data on the form & store in object to use when creating ticket
        const formJson = Object.fromEntries(formData.entries());

        var idOfDiv = formJson["ticket_id"] + "_info_box";

        var x = document.getElementById(idOfDiv);
        var button = document.getElementById(formJson["ticket_id"]);

        if (x.style.display == "none") {
            x.style.display = "flex";
            button.innerHTML = "▼";
        } else {
            x.style.display = "none";
            button.innerHTML = "Ticket Info";
        }
    }

    return (
        <div>
            <div className="ticket_card">
                <div class="ticket-text">
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Issue:</b> {props.issue}
                </div>
                <div className="ticket-status">
                    <div className="completeTicket">
                        <p><b>Completed</b></p>
                    </div>
                </div>
                <div class='ticket-info'>
                    <form method="post" onSubmit={showExtraInfo}>
                        <input name="ticket_id" type="hidden" value={props.id} />
                        <button id={props.id}>
                            Ticket Info
                        </button>
                    </form>
                </div>
            </div>

            <div id={info_box_id} className="inner_ticket_card" style={{ display: 'none' }}>
                <div style={{ flex: 1, marginRight: '20px', padding: '20px' }}>
                    <b>Ticket ID:</b> {props.id} <br></br>
                    <b>Name:</b> {props.name} <br></br>
                    <b>Email:</b> {props.email} <br></br>
                    <b>User ID:</b> {props.userID} <br></br>
                </div>
                <div style={{ flex: 1, padding: '20px' }}>
                    <b>Issue:</b> {props.issue}
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

const tickets_data = [{ "_id": "653616b43cc56a206d0a1958", "user_id": "1234567", "email": "test@test.com", "message": "hi", "name": "Test", "tick_complete": true }, { "_id": "ac53541bde48a9965d6f5918f178bfa83a0988aa", "name": "Test Person", "email": "testytest@test.com", "message": "This is my problem (test 3)", "user_id": "22345", "tick_complete": false, "__v": 0 }, { "_id": "d49517671fe13f6cc031c193880c1d2f13918792", "name": "Test Person 3", "email": "chantel.mills@student.uts.edu.au", "message": "I have a problem with logging in please help...", "user_id": "29873", "tick_complete": true, "__v": 0 }, { "_id": "34cb3b3b9b5aa10bcb0b138a322474331384cdd1", "name": "Alice J", "email": "chantel.mills@student.uts.edu.au", "message": "I have this particular doing this thing. Can someone give me some help please?", "user_id": "2345678", "tick_complete": true, "__v": 0 }, { "_id": "b8361abb5e1eabad6680247c1c5394d20f41e353", "name": "Chantel-Test", "email": "chantel.mills@student.uts.edu.au", "message": "Please help me with my question. Insert question here.", "user_id": "12345678999", "tick_complete": true, "__v": 0 }, { "_id": "lms7pzchq4n0cejd81j805b020vq3py7wr9j8ewj", "name": "C", "email": "chantel.mills@student.uts.edu.au", "message": "test to see if tickets create again...", "user_id": "2345678", "tick_complete": true, "__v": 0 }, { "_id": "75affbb2qmseqnoftxtg8i68nguzulgw386shpvo", "name": "asdas", "email": "a@gmail.com", "message": "QWE", "user_id": "1235", "tick_complete": false, "__v": 0 }, { "_id": "o9rxd3pqssstwxk745nh3phqfx0x8zlsvxbg5av2", "name": "sdf", "email": "d@gmail.com", "message": "asdjkndkj", "user_id": "sdf", "tick_complete": false, "__v": 0 }, { "_id": "38f91eb7hkepuzpqsmcmbsq83wtz62pn0yu6c3s1", "name": "asd", "email": "d@gmail.com", "message": "asd", "user_id": "1235", "tick_complete": false, "__v": 0 }, { "_id": "gsoxiwhk9gx1vrv0mo3bwb6wd4fx37myjja56zho", "name": "Olivia Test", "email": "oktest@hotmail.com", "message": "I have an issue logging in. ", "user_id": "1320874848", "tick_complete": false, "__v": 0 }, { "_id": "81j6iv5uk99522e2khnua69jxn3p75nu3k9iluf9", "name": "Olivia Test", "email": "oktest@hotmail.com", "message": "Another issue.", "user_id": "1320874848", "tick_complete": false, "__v": 0 }, { "_id": "2vbfbg0123zci8j8jf0hptiu51zbc9l1618zinzd", "name": "Maxwell", "email": "maxkwest99@gmail.com", "message": "I am strugling to log in", "user_id": "5757", "tick_complete": false, "__v": 0 }]


function AdminTicketsPage() {

    // ticket query

    const [ticketData, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    //     useEffect(() => {
    //         // all tickets query
    //         const fetchTickets = async () => {
    //             try {
    //                 const response = await axios.get('/db/tickets');
    //                 const tickets = response.data;
    //                 setTickets(tickets);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         };


    //         // // test for tickets of specific ID (user_id: "1234567") - test ticket
    //         // const fetchTickets = async () => {
    //         //     try {
    //         //         const response = await axios.get('/db/getTicketsByUserId', { params: { userID: "1234567" }});
    //         //         const tickets = response.data;
    //         //         setTickets(tickets);
    //         //         console.log(tickets);
    //         //     } catch (error) {
    //         //         console.error(error);
    //         //     }
    //         // };

    //         ///fetchTickets();

    //    }, []);

    useEffect(() => {
        setTickets(tickets_data);
    }, []); // Empty dependency array ensures this effect runs once after the initial render



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
                                email={ticket.email}
                                userID={ticket.user_id}
                                issue={ticket.message}
                            />
                        ))
                        }
                    </div>

                </div>

                <div id="adminTicketsSpinnerDiv" className="overlay_admin" style={{ display: 'none' }}>
                    <div>
                        <LoadingSpinner />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminTicketsPage;