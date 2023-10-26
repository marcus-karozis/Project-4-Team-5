import { ClassCode } from './ClassCode';
import { Long } from 'bson';

export class SClass {
  constructor(class_name, class_start_timestamps=[], class_end_timestamps=[], codes=[]) {
    this._id = this.generateRandomInt64();
    this.class_name = class_name;
    this.class_start_timestamps = class_start_timestamps;
    this.class_end_timestamps = class_end_timestamps;
    this.codes = codes;
  }

  addCode(expiry, users_selected = []) {
    this.codes.push(new ClassCode(expiry, users_selected));
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

module.exports = SClass;