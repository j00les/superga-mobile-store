const bcrypt = require('bcrypt');

const passHash = pass => bcrypt.hashSync(pass, 10);

module.exports = passHash;
