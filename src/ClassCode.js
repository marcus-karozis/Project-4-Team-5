import { Long } from 'bson';


class ClassCode {
  constructor(expiry, users_selected = []) {
    this._id = this.generateRandomInt64();
    this.value = this.generateCode();
    this.expiry = expiry;
    this.users_selected = users_selected;
    this.users_passed = [];
  }

  // Function to convert the ClassCode object to JSON
  toJSON() {
    return {
      _id: this._id,
      value: this.value,
      expiry: this.expiry,
      users_selected: this.users_selected,
      users_passed: this.users_passed,
    };
  }

  generateRandomInt64() {
    const lowBits = Math.floor(Math.random() * 0xFFFFFFFF);
    const highBits = Math.floor(Math.random() * 0xFFFFFFFF);
    return new Long(lowBits, highBits);
  }

  generateCode() {
    // Generate 4 random numbers between 0 and 9
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
  }

}

module.exports = ClassCode;