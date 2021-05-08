const crypto = require('crypto');

const db = require('../../db/db');
const { Category } = require('./Category');

class CategoryDB {
  static async getCategoryById(users_id) {
    const userResponse = await db.query(`SELECT * FROM "category" WHERE users_id = ${users_id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${users_id}, does not exist`);
    }

    return new Category(userResponse.rows[0]);
  }


  static async createCategory(mycategory, users_id) {

    const createUserResponse = await db.query(`INSERT INTO "category" (mycategory, users_id) 
        VALUES ('${mycategory}', '${users_id}') RETURNING *`);

    return (new Category(createUserResponse.rows[0])).getInfo();
  }

//   static async deleteCategoryById(id) {
//     const userResponse = await db.query(`DELETE FROM users WHERE id = ${id}`);

//     if (!userResponse.rowCount) {
//       throw new Error(`User with id: ${id}, does not exist`);
//     }

//     return "Ok";
//   }

  static async updateCategoty(mycategory, users_id, phone_number, gender, country) { //id or users_id //phone_number, gender, country
    const userResponse = await db.query(`UPDATE category SET mycategory = '${mycategory}', phone_number = '${phone_number}', gender = '${gender}', country = '${country}' WHERE users_id = ${users_id} RETURNING *`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${users_id}, does not exist`);
    }

    return new Category(userResponse.rows[0]).getInfo();
  }


}

module.exports = { CategoryDB };