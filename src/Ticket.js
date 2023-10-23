import axios from 'axios';

class Ticket {
    constructor(name, email, message, user_id) {
        this._id = this.generateRandomInt64();
        this.name = name;
        this.email = email;
        this.message = message;
        this.user_id = user_id;
        this.tick_complete = false;
    }

    generateRandomInt64() {
        const lowBits = Math.floor(Math.random() * 0xFFFFFFFF);
        const highBits = Math.floor(Math.random() * 0xFFFFFFFF);
        return new Long(lowBits, highBits);
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