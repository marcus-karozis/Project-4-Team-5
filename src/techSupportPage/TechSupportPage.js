import React, { useState, useRef, useEffect } from 'react';
import './TechSupportPageStyles.css';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';
import Tooltip from "../components/Tooltip";
import axios from 'axios';

import { Ticket }  from '../Ticket.js'; // Import the Ticket class

import LoadingSpinner from "../components/LoadingSpinner";

function TechSupportPage() {
    const formThing = useRef();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmitSupportForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // confirm is user wants to submit the form
        if (window.confirm("Are you ready to submit this issue/enquiry to the system admin?")) {
            // do this if ok pressed
            console.log("Ok was pressed. Sending to admin user...");
            setIsLoading(true); // show loading spinner

            // Read the form data
            const form = e.target;
            const formData = new FormData(form);

            // obtain all the data on the form & store in object to use when creating ticket
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            console.log(" ");
            console.log(formJson["name_input"]);
            console.log(formJson["email_input"]);
            console.log(formJson["userID_input"].toString());
            console.log(formJson["issue_input"]);

            const ticket = new Ticket(formJson["name_input"], formJson["email_input"], formJson["issue_input"], formJson["userID_input"].toString());

            console.log(ticket);

            console.log("saving to server...");
            ticket.saveToServer();

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

            // // comment below back in if you want to send a test email for support page

            emailjs.sendForm('service_gs0av92', 'template_nbw3n8k', formThing.current, 'KNHae1w2H-IMWhEI7')
                .then((result) => {
                    console.log(result.text + " | Email Sent to User!");
                    var responseBox = document.getElementById("tech_support_form_successful_response");
                    responseBox.style.display='block';
                    setIsLoading(false)   // Hide loading spinner 
                }, (error) => {
                    console.log(error.text + " | Could Not Send Email To User");
                    var responseBox = document.getElementById("tech_support_form_failed_response");
                    responseBox.style.display='block';
                    setIsLoading(false)   // Hide loading spinner 
                });
            
            // // comment above back in if you want to send a test email for support page

        }
        else {
            // do this if cancel pressed
            console.log("cancelled form submit...");
            // nothing happens here
        }

    }

    // const [ticketData, setTickets] = useState([]);

    // useEffect(() => {
    //     // // test for all tickets
    //     // const fetchTickets = async () => {
    //     // try {
    //     //     const response = await axios.get('/db/tickets');
    //     //     const tickets = response.data;
    //     //     setTickets(tickets);
    //     //     console.log(tickets);
    //     // } catch (error) {
    //     //     console.error(error);
    //     // }
    //     // };

    //     // test for tickets of specific ID (user_id: "1234567") - test ticket
    //     const fetchTickets = async () => {
    //         try {
    //             const response = await axios.get('/db/getTicketsByUserId', { params: { userID: "1234567" }});
    //             const tickets = response.data;
    //             setTickets(tickets);
    //             console.log(tickets);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchTickets();

    // }, []);

    

    return (
        <>
            <Navbar />
            <div className="page_padding">
                    <h1>Submit an Issue Ticket</h1>
                    <h3>Having any trouble with the website? Let us know</h3>
                <form method="post" ref={formThing} onSubmit={handleSubmitSupportForm}>
                    <div id="name_box">
                        {/* <div className="label_div" style={{}}>
                                <label > Name </label>
                            </div> */}
                        <input name="name_input" className="" required placeholder='Full Name' />
                    </div>

                    <div id="userID_box">
                        {/* <div className="label_div" style={{}}>
                                <label > User ID </label>
                            </div> */}
                        <input type="" name="userID_input" className="" required placeholder='User ID' />
                    </div>

                    <div id="email_box">
                        <Tooltip text="Please use a valid email. A copy of your ticket submission as well as the response to your issue/enquiry will be sent to this email.">
                            {/* <div className="label_div" style={{}}>
                                    <label > Email </label>
                                </div> */}
                            <input type="email" name="email_input" className="" required placeholder='Email' />
                        </Tooltip>
                    </div>

                    <div id="issue_box">
                        {/* <div className="label_div" style={{}}>
                                <label > Issue </label>
                            </div> */}
                        <textarea name="issue_input" rows={8} cols={40} required placeholder='Issue/Enquiry' />
                    </div>

                    <div id="submit_button_box">
                        <button disabled={isLoading}>Send To Support</button>
                    </div>

                </form>

                <div style={{ textAlign: 'center' }}>
                    <div id="tech_support_form_successful_response" style={{ display: 'none' }}>
                        <div className='successful_submission'>
                            Your issue ticket has been received. Please keep an eye on your emails for a reply.
                        </div>
                    </div>
                    <div id="tech_support_form_failed_response" style={{ display: 'none' }}>
                        <div className='invalid_submission'>
                            There was an issue submitting your issue/enquiry. Please reload the page and try again.
                        </div>
                    </div>
                </div>

                <div className={isLoading ? "overlay" : ""}>
                    {isLoading ? <LoadingSpinner /> : ""}
                </div>

            </div>

            {/* <div className="ticketTest">
                {ticketData.map(ticket => (
                    <p>{ticket._id}</p>
                    // <Subject
                    //     key={subject._id}
                    //     id={subject._id}
                    //     subjectName={subject.subject_name}
                    // />
                    ))
                }
            </div> */}


        </>
    );
}

export default TechSupportPage;
