const { Pool } = require('pg');

require('dotenv').config()

class Database {
  constructor() {
    this.config = {
      user: process.env.ODB_USER,
      host: process.env.ODB_HOST,
      database: process.env.ODB_NAME,
      password: process.env.ODB_PASSWORD,
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


module.exports = new Database();