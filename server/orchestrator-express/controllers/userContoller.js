const axios = require('axios');
const redis = require('../apis/redis-instance');
const baseURL = 'http://localhost:4001';

class User {
  static async findAll(req, res, next) {
    try {
      const cache = await redis.get('users:all');
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios.get(`${baseURL}`);
        res.status(200).json(data);
        await redis.set('users:all', JSON.stringify(data));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      await axios({
        method: 'post',
        url: `${baseURL}/users`,
        data: {
          username,
          email,
          role: 'admin',
          password,
          phoneNumber,
          address,
        },
      });

      await redis.del('users:all');

      res.status(201).json({
        message: 'User created successfully',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async findById(req, res, next) {
    try {
      const { id } = req.params;

      const cache = await redis.get('users:userById');

      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios.get(`${baseURL}/users/${id}`);

        await redis.set('users:userById', JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${baseURL}/users/${id}`,
        method: 'delete',
      });

      await redis.del('users:all');
      res.status(200).json({ message: data.message });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = User;
