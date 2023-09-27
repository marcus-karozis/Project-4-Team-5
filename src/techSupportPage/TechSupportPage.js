import React, { useState, useRef } from 'react';
import './TechSupportPageStyles.css';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';

function TechSupportPage() {

    // const fullNameInputField = useRef();
    // const emailInputField = useRef();
    // const issueInputField = useRef();

    const formThing = useRef();

    function handleSubmitSupportForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;

        // console.log("------");
        // console.log(form);
        // console.log(form.current);

        const formData = new FormData(form);

        // console.log(formData);
        // console.log(formData.current);

        // obtain all the data on the form & store in object
        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);

        // console.log("..");
        // console.log(formThings.current)

        // // send email to admin user
        // // note: I have this commented out because there's a limit to how many emails 
        // // can be sent per month
        // // also the details to access where the email is sent will be adding the details into the 
        // // jira ticket for the tech support page :) -C

        // // comment below back in if you want to send a test email for support page
        // emailjs.sendForm('service_gs0av92', 'template_2y5bxxs', formThing.current, 'KNHae1w2H-IMWhEI7')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        // // comment above back in if you want to send a test email for support page

        var responseBox = document.getElementById("tech_support_form_response");
        responseBox.style.display='block';
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
                            <input name="name_input" className="" required placeholder='Name' />
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
                    <div id="tech_support_form_response" style={{display: 'none'}}>
                        <div className='successful_submission'>
                            Your Issue Ticket has been received. Please keep an eye on your emails for a reply.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechSupportPage;
