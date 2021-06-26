const db = require("../config/connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;
      body.password = bcrypt.hashSync(body.password, saltRounds);
      delete body.confirm_password;
      const newUser = {
        ...body,
      };

      const queryString = "INSERT INTO users SET ?";
      db.query(queryString, newUser, (error, data) => {
        if (!error) {
          resolve(data);
        } else {
          reject(error);
        }
      });
    });
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { email, password } = body;
      const queryString =
        "SELECT id, email, name, password FROM users where email = ?";

      db.query(queryString, email, (err, data) => {
        if (err) {
          reject(err);
        }
        if (!data[0]) {
          reject("User Not Found");
        }

        const isValidPasword = bcrypt.compareSync(password, data[0].password);
        if (!isValidPasword) {
          reject("Password wrong");
        } else {
          const payload = {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
          };

          const secret = "GADGETNIH";

          const token = jwt.sign(payload, secret);

          resolve({
            token,
            user_id: data[0].id,
            name: data[0].name,
            email: data[0].email,
          });
        }
      });
    });
  },
};
