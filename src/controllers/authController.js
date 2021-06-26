const path = require("path");
const response = require("../helpers/response");
const userModel = require("../models/user");

module.exports = {
  register: (req, res) => {
    const { body } = req;
    if(body.password !== body.confirm_password){
        response.error(res, "Register is not successfull", 403, "Password is not same");
    }else{
        userModel.register(body)
        .then((data) => {
            response.success(res,"Register is successful", 200, data)
        })
        .catch((error) => {
            response.error(res, "Internal Server Error", 500, error.message)
        })
    }
  },
  login : (req, res) => {
    const {body} = req;

    userModel.login(body)
    .then((data) => {
      response.success(res, "Login is successful", 200, data)
    })
    .catch((error) => {
      response.error(res, "Internal Server Error", 500, error.message)
    })

  }
};
