import axios from 'axios';
const mongoose = require('mongoose');

class User {
  constructor(_id, user_type, password_cleartext, first_name, last_name, enrolment = [], photo_string) {
    this._id = _id;
    this.user_type = user_type;
    this.password_cleartext = password_cleartext;
    this.first_name = first_name;
    this.last_name = last_name;
    this.photo_string = photo_string;
    this.enrolment = enrolment;
  }

  addEnrolment(subject_id, class_id, checkin_timestamps) {
    // console.log("sid: " + subject_id)
    // console.log("_class: " + class_id)
    //const ObjectId = mongoose.Types.ObjectId;
    //const obj_id = new ObjectId().toString()
    //this.enrolment.push({ _id: this._id, subject_id: subject_id, class: class_id, checkin_timestamps: checkin_timestamps });


    //removes duplicates
    const existingIndex = this.enrolment.findIndex(existing => {
      return existing.subject_id === subject_id && existing.class === class_id;
    });

    if (existingIndex !== -1) {
      // If the class_id already exists, push the test object to the existing class's array
      this.enrolment[existingIndex] = {
        _id: this.generateID(),
        subject_id: subject_id,
        class: class_id,
        checkin_timestamps: checkin_timestamps
      };
      console.log("enrolment-test: " + JSON.stringify(this.enrolment[existingIndex], null, 2))
      //console.log("entire: " + JSON.stringify(this, null, 2))
    } else {
      // If the class_id doesn't exist, push the test object into the classes array
      this.enrolment.push({ _id: this._id, subject_id: subject_id, class: class_id, checkin_timestamps: checkin_timestamps });
      //console.log("push: " + JSON.stringify(this.enrolment, null, 2))
    }

  }

  // Function to convert the User object to JSON and submit it to the server
  async saveToServer() {
    try {
      const response = await axios.post('/db/updateUserById', this.toJSON());
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





  generateID() {
    //   if (typeof userTypeNumber !== 'number' || userTypeNumber < 0 || userTypeNumber > 9) {
    //     return 'Invalid input';
    //   }

    //   // Ensure the startingDigit is a single digit
    //   userTypeNumber = Math.floor(userTypeNumber);

    //   // Generate a random 7-digit number
    //   const randomDigits = Math.floor(100000000000000 + Math.random() * 900000000000000);

    //   // Concatenate the startingDigit and randomDigits
    //   const generatedId = `${userTypeNumber}${randomDigits}`;
    //   console.log("Gen id : " + generatedId)
    //   return generatedId;
    // }

    let id = '';
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';

    // Generate a random hex string with 24 characters
    for (let i = 0; i < 24; i++) {
      id += characters[Math.floor(Math.random() * 16)];
    }

    return id;
  }


}

export default User;