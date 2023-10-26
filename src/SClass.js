import { ClassCode } from './ClassCode';
import { Long } from 'bson';
import axios from 'axios';

export class SClass {
  constructor( class_id, class_name, class_start_timestamps=[], class_end_timestamps=[], codes=[]) {
    this._id = class_id; 
    // this._id = this.generateRandomInt64();
    this.class_name = class_name;
    this.class_start_timestamps = class_start_timestamps;
    this.class_end_timestamps = class_end_timestamps;
    this.codes = codes;
  }

  //for students enrolment
  addCode(_code, expiry, users_selected = []) {
    this.enrolment.push(new ClassCode(_code, expiry, users_selected));
  }

   // Function to convert the Subject object to JSON and submit it to the server
   async saveToServer() {
    try {
      const response = await axios.post('/db/subjects', this.toJSON());
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save subject to the server.');
    }
  }

  // Function to convert the User object to JSON
  toJSON() {
    return {
      _id: this._id,
      class_name: this.class_name,
      class_start_timestamps: this.class_start_timestamps,
      class_end_timestamps: this.class_end_timestamps,
      codes: this.codes.toJSON(),
    };
  }

  generateRandomInt64() {
    const lowBits = Math.floor(Math.random() * 0xFFFFFFFF);
    const highBits = Math.floor(Math.random() * 0xFFFFFFFF);
    return new Long(lowBits, highBits);
  }

}
