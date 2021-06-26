const indexRouter = require("express").Router();

const authRouter = require('./authRouter');

indexRouter.use('/', authRouter);

module.exports = indexRouter;
