const crypto = require('crypto');

const db = require('../../db/db');
const { User } = require('./User');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(`SELECT * FROM "users" WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(`SELECT * FROM "users" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      throw new Error(`User with email: ${email}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, mypassword) {
    const userResponse = await db.query(`SELECT * FROM "users" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      return { message: `User with email: ${email}, does not exist`, flag: false };
    }

    const user = { ...userResponse.rows[0] };

    if (crypto.pbkdf2Sync(mypassword, 'salt', 100000, 64, 'sha256').toString('hex') !== user.mypassword) {
      return { message: 'Incorect password', flag: false };
    }

    return { user: new User(user), flag: true };
  }

  static async createUser(fname, lname, username, email, mypassword) {
    const passwordHash = crypto.pbkdf2Sync(mypassword, 'salt', 100000, 64, 'sha256').toString('hex');

    const createUserResponse = await db.query(`INSERT INTO "users" (fname, lname, username, email, mypassword) 
        VALUES ('${fname}', '${lname}', '${username}', '${email}', '${passwordHash}') RETURNING *`)
      .catch((err) => {
        if (err.constraint === 'user_email') {
          const error = new Error('User with the same email already exists');
          error.status = 400;
          throw error;
        }
        throw new Error(err.message);
      });

    return (new User(createUserResponse.rows[0])).getInfo();
  }

  static async deleteUserById(id) {
    const userResponse = await db.query(`DELETE FROM users WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return "Ok";
  }

  static async updateUser(id, fname, lname, username) {
    const userResponse = await db.query(`UPDATE users SET fname = '${fname}', lname = '${lname}', username = '${username}' WHERE id = ${id} RETURNING *`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]).getInfo();
  }

//   static async userList() {
//     const userListResponse = await db.query('SELECT * FROM "users"');

//     const users = userListResponse.rows.map((userDb) => new User(userDb));

//     return users;
//   }

//   static async updateUserPhoto(photoUrl, email) {
//     await db.query(`
//       UPDATE "user" SET photo = '${photoUrl}'
//       WHERE email = '${email}'
//     `);
//   }
}

module.exports = { UserDB };