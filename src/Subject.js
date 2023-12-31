import axios from 'axios';
import { SClass }  from './SClass.js';

export class Subject {
  constructor(_id, subject_name, subject_classes = []) {
    this._id = _id;
    //this._id = this.generateID(subject_name);
    this.subject_name = subject_name;
    this.classes = subject_classes;
  }

  // addClass(class_id, class_name, class_start_timestamps=[], class_end_timestamps=[], codes=[]) {
  //   this.classes.push(new SClass(class_id, class_name, class_start_timestamps, class_end_timestamps, codes ));
  // }

  // Function to convert the Subject object to JSON and submit it to the server
  async saveToServer() {
    try {
      //console.log("newSubject: " + JSON.stringify(newSubject, null, 2))
      const response = await axios.post('/db/subjects', this);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save subject to the server.');
    }
  }

  async updateServer() {
    try {
      //console.log("newSubject: " + JSON.stringify(newSubject, null, 2))
      const response = await axios.post('/db/updateSubjectById', this);
      console.log(`${response.status}: Successfully updated server`)
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save subject to the server.');
    }
  }

 

  // Function to convert the Subject object to JSON
  toJSON() {
    return {
      _id: this._id,
      subject_name: this.subject_name,
     classes: this.classes
    };
  }

  generateID(subject_name) {
    // Check if the input is a string and at least 3 characters long
    if (typeof input !== 'string' || subject_name.length < 3) {
      return 'Invalid Input';
    }

    // Extract the first 3 characters of the input
    const prefix = subject_name.slice(0, 3);

    // Generate 5 random numbers between 0 and 9
    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');

    // Combine the prefix and random numbers to create the ID
    const id = prefix + randomNumbers;

    return id;
  }

}