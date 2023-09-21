import React, { useState } from 'react';
import './TechSupportPageStyles.css';
import Navbar from '../components/Navbar';

function TechSupportPage() {
    function handleSubmitSupportForm(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
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
                        <div style={{paddingRight: '120px'}}>
                            <label > Name </label>
                        </div>
                        <div>
                            <input name="nameInput" className="" />
                        </div>
                    </div>

                    <div id="email_box">
                        <div style={{paddingRight: '120px'}}>
                            <label > Email </label>
                        </div>
                        <div>
                            <input name="emailInput" className="" />
                        </div>
                    </div>

                    <div id="issue_box">
                        <div style={{paddingRight: '120px'}}>
                            <label > Issue </label>
                        </div>
                        <div>
                            <textarea name="postContent" rows={4} cols={40} />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default TechSupportPage;
