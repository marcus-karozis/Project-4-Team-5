import axios from 'axios';

class User {
  constructor(user_type, password_cleartext, first_name, last_name, photo_string, enrolment = []) {
    this._id = this.generateID(user_type);
    this.user_type = user_type;
    this.password_cleartext = password_cleartext;
    this.first_name = first_name;
    this.last_name = last_name;
    this.photo_string = photo_string;
    this.enrolment = enrolment;
  }

  addEnrolment(subject_id, _class, checkin_timestamps) {
    this.enrolment.push({ _id: subject_id, class: _class, checkin_timestamps });
  }

  // Function to convert the User object to JSON and submit it to the server
  async saveToServer() {
    try {
      const response = await axios.post('/db/users', this.toJSON());
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save user to the server.');
    }
  }

  // Function to convert the User object to JSON
  toJSON() {
    return {
      _id: this._id,
      user_type: this.user_type,
      password_cleartext: this.password_cleartext,
      first_name: this.first_name,
      last_name: this.last_name,
      photo_string: this.photo_string,
      enrolment: this.enrolment,
    };
  }

  generateID(userTypeNumber) {
    if (typeof userTypeNumber !== 'number' || userTypeNumber < 0 || userTypeNumber > 9) {
      return 'Invalid input';
    }

    // Ensure the startingDigit is a single digit
    userTypeNumber = Math.floor(userTypeNumber);

    // Generate a random 7-digit number
    const randomDigits = Math.floor(1000000 + Math.random() * 9000000);

    // Concatenate the startingDigit and randomDigits
    const generatedId = `${userTypeNumber}${randomDigits}`;

    return generatedId;
  }

}

module.exports = User;