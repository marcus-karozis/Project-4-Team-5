import axios from 'axios';
import { Long } from 'bson';

export class Ticket {
    // this constructor is used when initially creating the ticket
    constructor(name, email, message, user_id) {
        this._id = this.generateRandomInt64();
        this.name = name;
        this.email = email;
        this.message = message;
        this.user_id = user_id;
        this.tick_complete = false;
    }

    generateRandomInt64() {
        var crypto = require("crypto");
        var generatedID = crypto.randomBytes(20).toString('hex');

        return generatedID.toString();
    }

    // Function to convert the Ticket object to JSON and submit it to the server
    async saveToServer() {
        try {
            const response = await axios.post('/db/tickets', this.toJSON());
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to save ticket to the server.');
        }
    }

    // Function to update the ticket
    async updateAndSaveToServer() {
        try {
            const response = await axios.post('/db/ticket_update', this.toJSON());
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update and save ticket to the server.');
        }
    }

    // only used to update the status of the ticket 
    // (since the ID needs to match an existing ticket in the db)
    setExistingTicketID(ticket_id) {
        this._id = ticket_id;
    }

    // only used to update the status of the ticket
    // so it goes from "not complete" to "complete"
    setTickCompleteStatus(tick_complete) {
        this.tick_complete = tick_complete;
    }

    // Function to convert the Ticket object to JSON
    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            message: this.message,
            user_id: this.user_id,
            tick_complete: this.tick_complete,
        };
    }
}

// module.exports = Ticket;