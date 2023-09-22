import React, { useState } from 'react';
import './TechSupportPageStyles.css';
import Navbar from '../components/Navbar';

function TechSupportPage() {

    function handleSubmitSupportForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // obtain all the data on the form & store in object
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        // SEND EMAIL TO ADMIN USER
        // TODO!

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
                <form method="post" onSubmit={handleSubmitSupportForm}>
                    <div id="name_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Name </label>
                        </div> */}
                        <div>
                            <input name="nameInput" className="" required placeholder='Name' />
                        </div>
                    </div>

                    <div id="email_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Email </label>
                        </div> */}
                        <div>
                            <input name="emailInput" className="" required placeholder='Email' />
                        </div>
                    </div>

                    <div id="issue_box">
                        {/* <div className="label_div" style={{}}>
                            <label > Issue </label>
                        </div> */}
                        <div>
                            <textarea name="issueInput" rows={8} cols={40} required placeholder='Issue/Enquiry' />
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
