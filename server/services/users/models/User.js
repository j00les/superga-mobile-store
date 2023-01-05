const { runConnection } = require('../config/config');
const passHash = require('../helpers/helper');
const ObjectId = require('mongodb').ObjectId;

class User {
  static async findAll() {
    try {
      const collection = runConnection().collection('Users');
      const users = await collection
        .find(
          {},
          {
            projection: {
              password: 0,
            },
          }
        )
        .toArray();

      return users;
    } catch (err) {
      return err;
    }
  }

  static async findById(id) {
    try {
      const collection = runConnection().collection('Users');

      const user = await collection.findOne(
        { _id: ObjectId(id) },
        {
          projection: {
            password: 0,
          },
        }
      );

      return user;
    } catch (err) {
      return err;
    }
  }

  static async destroy(id) {
    try {
      const collection = runConnection().collection('Users');

      await collection.deleteOne({ _id: ObjectId(id) });
    } catch (err) {
      return err;
    }
  }

  static async create(body) {
    try {
      const collection = runConnection().collection('Users');
      const { username, email, password, address, phoneNumber } = body;

      if (!email) throw { name: 'Email is required' };
      if (!password) throw { name: 'Password is required' };

      const hashed = passHash(password);

      await collection.insertOne({
        username,
        email,
        password: hashed,
        role: 'admin',
        phoneNumber,
        address,
      });
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
