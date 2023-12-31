import { Long } from 'bson';


export class ClassCode {
  constructor(expiry, users_selected = []) {
   //this._id = _id;
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
    return new Long(lowBits, highBits).toString();
  }

  generateCode() {
    let charset = "";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charset += "0123456789";

    let code = "";
    for (let i = 0; i < 7; i++) {
        code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return code;
  }

}

