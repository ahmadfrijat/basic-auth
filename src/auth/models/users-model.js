'use strict'


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const Users = mongoose.model('users', userSchema);

class userClass {
  constructor(model) {
    this.model = model;
  }

  async addUser(userInfo) {
    userInfo.password = await bcrypt.hash(userInfo.password, 10);
    const user = new this.model(userInfo);
    const record = await user.save(userInfo);
    return record;
  }
  async checkUser(userInfo) {
    try {
      const user = await this.model.findOne({ username: userInfo.username });
      if (user) {
        const valid = await bcrypt.compare(userInfo.password, user.password);
        if (valid) {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new userClass(Users);
