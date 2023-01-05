const axios = require('axios');
const redis = require('../../orchestrator-express/apis/redis-instance');
const baseURL = 'http://localhost:4001';

const userResolvers = {
  // read operation
  Query: {
    users: async () => {
      try {
        const cache = await redis.get('users:all');
        if (cache) {
          const data = JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios.get(`${baseURL}/`);
          await redis.set('users:all', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    user: async (_, args) => {
      try {
        const cache = await redis.get('users:singleUser');
        if (cache) {
          const data = JSON.parse(cache);
          return data;
        } else {
          const { data } = await axios({
            method: 'get',
            url: `${baseURL}/users/${args._id}`,
          });
          await redis.set('users:singleUser', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  // write operation
  Mutation: {
    //args, object dari apollo server
    createUser: async (_, args) => {
      try {
        const { username, email, password, phoneNumber, address } = args.body;

        const { data } = await axios({
          method: 'post',
          url: `${baseURL}/users`,
          data: {
            username,
            email,
            password,
            phoneNumber,
            address,
          },
        });
        await redis.del('users:all');
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    //id, dari args juga
    deleteUser: async (_, args) => {
      const { _id } = args;
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${baseURL}/users/${_id}`,
        });

        await redis.del('users:all');
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = userResolvers;
