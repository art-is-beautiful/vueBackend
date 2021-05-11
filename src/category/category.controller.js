const passport = require('koa-passport');
const jwt = require('jwt-simple');

const db = require('../db/db');

const { CategoryDB } = require('./models/CategoryDB');

class CategoryController {

    static async createCategory(ctx) {
        const { mycategory, users_id } = ctx.request.body;
      
        ctx.status = 201;
        ctx.body = await CategoryDB.createCategory(mycategory, users_id);
    }
    static async getCategoryById(ctx) {
        const userId = ctx.request.params.userId;
      
        const myUser = await CategoryDB.getCategoryById(userId);

        ctx.status = 200;
        ctx.body = myUser.getInfo();

    }

    static async deleteCategory(ctx) {
        const userId = ctx.request.params.userId;

        const categoryListResponse = await db.query(`DELETE FROM category WHERE user_id = ${userId} `);
      
        // await UserDB.deleteUserById(userId);

        ctx.status = 200;
        ctx.body = {
            deleted: "Ok"
        }
    }
    static async updateCategoty(ctx) {
        const { mycategory, users_id, phone_number, gender, country } = ctx.request.body;
      
        ctx.status = 200;
        ctx.body = await CategoryDB.updateCategoty(mycategory, users_id, phone_number, gender, country);

    }
    static async categoryList(ctx) {
        const catListResponse = await db.query('SELECT * FROM "category"');
  
        const categories = catListResponse.rows;
  
        ctx.body = {
            categories,
        }
    }
    static async searchByCountry(ctx) {
        // const { gender } = ctx.request.body;
        const country = ctx.request.params.country;
        const userListResponse = await db.query(`SELECT * FROM "category" WHERE "country" = '${country}' `);
  
        const users = userListResponse.rows;
  
        ctx.body = {
          users,
        }
      }
}

module.exports = { CategoryController };