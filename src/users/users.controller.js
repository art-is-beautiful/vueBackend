const passport = require('koa-passport');
const jwt = require('jwt-simple');

const { UserDB } = require('./models/UserDB');

class UsersController {
    static async example(ctx) {
        // const userExample = new User(1);
        // console.log(userExample);
        const { body } = ctx.request;
        ctx.body = { body };
    }
    static async signUser(ctx) {
        await passport.authenticate('local', (err, user) => {
          if (user) {
            ctx.body = user;
          } else {
            ctx.status = 400;
            if (err) {
              ctx.body = { error: err };
            }
          }
        })(ctx);
    }
    static async profile1(ctx) {
        ctx.body = {
          user: ctx.state.user,
        };
    }
    static async createUser(ctx) {
        const { fname, lname, username, email, mypassword } = ctx.request.body;
      
        ctx.status = 201;
        ctx.body = await UserDB.createUser(fname, lname, username, email, mypassword);
    }
    static async refresh(ctx) {

        const token = ctx.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, 'super_secret_refresh');
      
        if (decodedToken.expiresIn <= new Date().getTime()) {
          const error = new Error('Refresh token expired, please sign in into your account.');
          error.status = 400;
          throw error;
        }
      
        const user = await UserDB.getUserByEmail(decodedToken.email);
        
        const accessToken = {
          id: user.getId(),
          expiresIn: new Date().setTime(new Date().getTime() + 200000),
        };
      
        const refreshToken = {
          email: user.email,
          expiresIn: new Date().setTime(new Date().getTime() + 1000000),
        };
        ctx.body = {
          accessToken: jwt.encode(accessToken, 'super_secret'),
          accessTokenExpirationDate: accessToken.expiresIn,
          refreshToken: jwt.encode(refreshToken, 'super_secret_refresh'),
          refreshTokenExpirationDate: refreshToken.expiresIn,
        };
    }
    static async getOneUser(ctx) {
        const userId = ctx.request.params.userId;
      
        const myUser = await UserDB.getUserById(userId);

        ctx.status = 200;
        ctx.body = myUser.getInfo();

    }

    static async deleteUser(ctx) {
        const userId = ctx.request.params.userId;
      
        await UserDB.deleteUserById(userId);

        ctx.status = 200;
        ctx.body = {
            deleted: "Ok"
        }
    }
    static async updateUser(ctx) {
        const {id, fname, lname, username } = ctx.request.body;
      
        ctx.status = 200;
        ctx.body = await UserDB.updateUser(id, fname, lname, username);

    }
}

module.exports = { UsersController };