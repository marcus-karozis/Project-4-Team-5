import React, { useState, useRef } from 'react';
import './TechSupportPageStyles.css';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';

function TechSupportPage() {
    const formThing = useRef();

    function handleSubmitSupportForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // confirm is user wants to submit the form
        if (window.confirm("Are you ready to submit this issue/enquiry to the sytsem admin?")) {
            // do this if ok pressed
            console.log("Ok was pressed. Sending to admin user...");

            // send email to admin user

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

            // emailjs.sendForm('service_gs0av92', 'template_2y5bxxs', formThing.current, 'KNHae1w2H-IMWhEI7')
            //     .then((result) => {
            //         console.log(result.text + " | Email Sent to Admin!");
            //         var responseBox = document.getElementById("tech_support_form_successful_response");
            //         responseBox.style.display='block';
            //     }, (error) => {
            //         console.log(error.text + " | Could Not Send Email To Admin");
            //         var responseBox = document.getElementById("tech_support_form_failed_response");
            //         responseBox.style.display='block';
            //     });
            
            // // comment above back in if you want to send a test email for support page

        }
        else {
            // do this if cancel pressed
            console.log("cancelled form submit...");
            // nothing happens here
        }

    }

    return (
        <div>
            <div className="">
                <Navbar/>
            </div>

            <div className="page_padding" style={{textAlign: 'center'}}>
                <h1>Tech Support Page</h1>
                <form method="post" ref={formThing} onSubmit={handleSubmitSupportForm}>
                    <div id="name_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Name </label>
                        </div> */}
                        <div>
                            <input name="name_input" className="" required placeholder='Full Name' />
                        </div>
                    </div>

                    <div id="email_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Email </label>
                        </div> */}
                        <div>
                            <input type="email" name="email_input" className="" required placeholder='Email' />
                        </div>
                    </div>

                    <div id="issue_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Issue </label>
                        </div> */}
                        <div>
                            <textarea name="issue_input" rows={8} cols={40} required placeholder='Issue/Enquiry' />
                        </div>
                    </div>

                    <div id="submit_button_box">
                        <button>Send To Support</button>
                    </div>

                </form>

                <div style={{textAlign: 'center'}}>
                    <div id="tech_support_form_successful_response" style={{display: 'none'}}>
                        <div className='successful_submission'>
                            Your Issue Ticket has been received. Please keep an eye on your emails for a reply.
                        </div>
                    </div>
                    <div id="tech_support_form_failed_response" style={{display: 'none'}}>
                        <div className='invalid_submission'>
                            There was an issue submitting your issue or enquiry. Please reload the page and try again.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechSupportPage;
