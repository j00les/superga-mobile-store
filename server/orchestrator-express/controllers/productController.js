const axios = require("axios");
const redis = require("../apis/redis-instance");
const baseURL = "http://localhost:4002";

class Product {
  static async findAll(req, res, next) {
    try {
      const cache = await redis.get("products:all");
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios.get(`${baseURL}/pub/products`);
        res.status(200).json(data);
        await redis.set("products:all", JSON.stringify(data));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findCategory(req, res, next) {
    try {
      const cache = await redis.get("categories:all");
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios.get(`${baseURL}/pub/categories`);
        res.status(200).json(JSON.parse(data));
        await redis.set("categories:all", JSON.stringify(data));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const cache = await redis.get("products:productById");
      const check = JSON.parse(cache);

      if (check.id === id) {
        const data = JSON.parse(cache);
        return data;
      } else {
        const { data } = await axios.get(`${baseURL}/pub/products/${id}`);
        await redis.set("products:productById", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, slug, description, price, mainImg, userMongoId } = req.body;

      const { data } = await axios({
        url: `${baseURL}/admin/products`,
        method: "post",
        data: {
          name,
          slug,
          description,
          price,
          mainImg,
          userMongoId,
        },
      });
      await redis.del("products:all");
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async update(req, res, next) {
    try {
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        userMongoId,
        categoryId,
      } = req.body;
      const { id } = req.params;
      const { data } = await axios({
        url: `${baseURL}/admin/products/${id}`,
        method: "put",
        data: {
          name,
          slug,
          description,
          price,
          mainImg,
          userMongoId,
          categoryId,
        },
      });
      await redis.del("products:all");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: `${baseURL}/admin/products/${id}`,
        method: "delete",
      });

      await redis.del("products:all");
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Product;
