/**
 * Dependencies
 */

const Sequelize = require('sequelize');

/**
 * Define class
 */

class Database {
  constructor(dbPath, queries) {
    this.dbPath = dbPath;
    this.db = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false
    });
    this.queries = queries;
  }

  async exec(method, args = [], options = {}) {
    if (!this.queries.hasOwnProperty(method)) 
      throw new Error(`No query found for '${method}'`)

    args = args || [];
    const sql = this.queries[method](...args);
    return await this.query(sql, options);
  }

  async query(sql, options = {}) {
    return await this.db.query(sql, options);
  }

  async close() {
    await this.db.close();
  }
}

/**
 * Export class
 */

module.exports = Database;
