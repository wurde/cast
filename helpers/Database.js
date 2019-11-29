/**
 * Dependencies
 */

const Sequelize = require('sequelize');

/**
 * Define class
 */

class Database {
  constructor(dbPath, queries) {
    self.dbPath = dbPath;
    self.db = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false
    });
  }

  static async query(sql) {
    return await db.query(sql);
  }

  static async setupIfMissing(sql) {
    try {
      const [results, _] = await db.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tasks';"
      );

      if (results.length === 0) await db.query(sql);
    } catch (err) {
      console.error(err);
    }
  }

  static async close() {
    await self.db.close();
  }
}

/**
 * Export class
 */

module.exports = Database;
