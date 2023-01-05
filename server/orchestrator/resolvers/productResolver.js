const axios = require("axios");
const redis = require("../../orchestrator-express/apis/redis-instance");

const baseURL = "http://localhost:4002";
const userBaseURL = "http://localhost:4001";

const productResolver = {
  Query: {
    products: async () => {
      try {
        const cache = await redis.get("products:all");
        await redis.del("products:all");
        if (cache) {
          const data = JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/pub/products`,
          });
          await redis.set("products:all", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    categories: async () => {
      try {
        const cache = await redis.get("categories:all");
        if (cache) {
          const data = JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/pub/categories`,
          });

          await redis.set("categories:all", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    product: async (_, args) => {
      try {
        const cache = await redis.get("products:productById");
        const check = JSON.parse(cache);

        if (check && check.id === +args.id) {
          const data = JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: "get",
            url: `${baseURL}/pub/products/${args.id}`,
          });

          const { data: userMongo } = await axios({
            method: "get",
            url: `${userBaseURL}/users/${data.userMongoId}`,
          });

          data.User = userMongo;

          await redis.set("products:productById", JSON.stringify(data));

          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    //create
    createProduct: async (_, args) => {
      try {
        const { data } = await axios({
          method: "post",
          url: `${baseURL}/admin/products`,
          data: {
            ...args.body,
          },
        });

        await redis.del("products:all");
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    //update
    updateProduct: async (_, args) => {
      try {
        const { name, slug, description, price, mainImg, categoryId } =
          args.body;
        const { data } = await axios({
          method: "put",
          url: `${baseURL}/admin/products/${args.id}`,
          data: {
            name,
            slug,
            description,
            price,
            mainImg,
            categoryId,
          },
        });
        await redis.del("products:all");
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    // delete
    deleteProduct: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: `${baseURL}/admin/products/${args.id}`,
        });
        await redis.del("products:all");
        return data;
      } catch (err) {
        return { message: "Product not found" };
      }
    },
  },
};

module.exports = productResolver;
