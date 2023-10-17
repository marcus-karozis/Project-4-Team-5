import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';

function TechSupportPage() {
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
                    <p>content goes here</p>
                </div>
            </div>
        </div>
    );
}

export default TechSupportPage;