const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      // user: 'osktcnby',
      // host: 'tai.db.elephantsql.com',
      // database: 'osktcnby',
      // password: 's-MJo7yYrvn3QbCmpWDjQQWmABWxpJRw',
      // port: 5432,
      user: 'artem',
      host: 'localhost',
      database: 'homework',
      password: '0606',
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}



// const { Pool } = require('pg');

// class Database {
//   constructor() {
//     this.config = {
//       user: 'artem',
//       host: 'localhost',
//       database: 'homework',
//       password: '0606',
//       port: 5432,
//       // user: 'nypjrcadaffhyg',
//       // host: 'ec2-54-72-155-238.eu-west-1.compute.amazonaws.com',
//       // database: 'd49mpm27ep1g42',
//       // password: '3dabf8661dec8c0703ce71c411a6cb80ed4af86b4d4e8d20182b886d59ff9c37',
//       // port: 5432,
//       // ssl: true,
//     };

//     this.pool = new Pool(this.config);
//   }

//   query(sql) {
//     return this.pool.query(sql);
//   }

//   close() {
//     this.pool.end();
//   }
// }

module.exports = new Database();