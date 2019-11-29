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

  async exec(method, args=[]) {
    if (!this.queries.hasOwnProperty(method)) 
      throw new Error(`No query found for '${method}'`)

    const sql = this.queries[method](...args);
    return await this.query(sql);
  }

  async query(sql) {
    return await this.db.query(sql);
  }

  async close() {
    await this.db.close();
  }
}

// async setupIfMissing(sql) {
//   try {
//     const [results, _] = await db.query(
//       "SELECT name FROM sqlite_master WHERE type='table' AND name='tasks';"
//     );
//     if (results.length === 0) await db.query(sql);
//   } catch (err) {
//     console.error(err);
//   }
// }

/**
 * Export class
 */

module.exports = Database;
