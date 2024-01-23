const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const databaseConfig = require('../config/database');

let sequelize;

const connect = () => {

  try {
    sequelize = new Sequelize(
      databaseConfig[process.env.NODE_ENV].database, 
      databaseConfig[process.env.NODE_ENV].username, 
      databaseConfig[process.env.NODE_ENV].password, 
      {
        host: databaseConfig[process.env.NODE_ENV].host,
        port: databaseConfig[process.env.NODE_ENV].port,
        dialect: databaseConfig[process.env.NODE_ENV].dialect
      }
    );
  } catch (error) {
    throw new Error("***** Database connection not possible *****");
  }
}

const migrate = async () => {
  if (sequelize) { 
    try {
      const umzug = new Umzug({
        migrations: { glob: 'src/database/migrations/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
      });
  
      await umzug.up();
    } catch (error) {
      throw new Error("***** Database migration not possible *****");
    }
  }
}

const seed = async () => {
  if (sequelize) { 
    try {
      const umzug = new Umzug({
        migrations: { glob: 'src/database/seeders/*.js' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
      });
  
      await umzug.up();
    } catch (error) {
      throw new Error(error);
    }
  }
}

const initDatabase = async () => {
  try {
    connect();
    await migrate();
    await seed();

    console.log("Database created and migrated successfully.");
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = initDatabase;