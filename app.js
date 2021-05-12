const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const Redis = require('ioredis');
const views = require('koa-views');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

require('dotenv').config()

const passport = require('./src/libs/passport/koaPassport');
const { errorCatcher } = require('./src/middlewares/errorCatcher');

passport.initialize()

const app = new Koa();

app.use(cors());

// const redis = new Redis('redis://localhost:6379');

// app.context.redis = redis;

app.use(bodyParser());
app.use(errorCatcher);

const router = new Router();

const port = process.env.PORT || 3002; //


router.use('/users', require('./src/users/users.router'));
router.use('/category', require('./src/category/category.router'));

app.use(router.middleware());

// app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});