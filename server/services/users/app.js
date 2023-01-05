const express = require('express');
const { run } = require('./config/config');
const UserController = require('./controllers/userController');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', UserController.getUsers);
app.post('/users', UserController.createUser);
app.get('/users/:id', UserController.getUserbyId);
app.delete('/users/:id', UserController.deleteUser);

run().then(() => {
  app.listen(PORT, () => {
    console.log('user-MONGO-server', PORT);
  });
});
