const User = require('../models/User');

class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      await User.create(req.body);

      res.status(201).json({
        message: 'User created successfully',
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserbyId(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy(id);
      res.status(200).json({
        message: 'User has been deleted successfully',
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
