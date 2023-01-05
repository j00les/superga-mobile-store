const { Product, Category, Image } = require('../models');

class PubController {
  static async getAllProduct(req, res, next) {
    try {
      const response = await Product.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Category,
          },
          { model: Image },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      const response = await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Product.findOne({
        where: { id },
        include: [
          {
            model: Image,
          },

          {
            model: Category,
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!response) throw { name: 'Not Found' };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Category.findOne({
        where: { id },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!response) throw { name: 'Not Found' };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PubController;
