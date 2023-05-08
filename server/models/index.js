"use strict"; //This is a statement that enables strict mode in JavaScript, which enforces stricter parsing and error handling rules.

const fs = require("fs"); // This statement imports the Node.js built-in fs module, which provides functionality for interacting with the file system.
const path = require("path"); // This statement imports the Node.js built-in path module, which provides utilities for working with file and directory paths.
const Sequelize = require("sequelize"); // This statement imports the Sequelize library, which is an ORM that provides an abstraction layer for interacting with relational databases.
const process = require("process"); // This statement imports the Node.js built-in process module, which provides information about the current Node.js process.
const basename = path.basename(__filename); // This statement assigns the base name of the current module file to the basename variable.
const env = process.env.NODE_ENV || "development"; // This statement sets the env variable to the value of the NODE_ENV environment variable if it exists, or to 'development' if it does not.
const config = require(__dirname + "/../config/config.js")[env]; // This statement imports the configuration for the Sequelize instance from a JSON file located in a config directory relative to the current module file, based on the env variable.
const db = {}; // This statement creates an empty object that will be used to store the Sequelize models.

let sequelize; // This statement declares a variable that will hold the Sequelize instance.

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
} //This statement sets up the Sequelize instance depending on whether a use_env_variable property is defined in the configuration. If it is defined, the instance is created using the value of the environment variable specified in the configuration. Otherwise, the instance is created using the other properties in the configuration.

fs.readdirSync(__dirname) // This statement reads the contents of the current module directory synchronously.
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  }) // This statement filters the files in the directory based on certain criteria. It excludes files that start with a dot, that have the same name as the current module file, that do not have a .js extension, and that have a .test.js substring in their name.

  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }); // This statement iterates over the filtered files and imports their corresponding Sequelize models. It adds each model to the db object using the model name as the key and the model itself as the value.

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); // This statement iterates over the models in the db object and invokes their associate method if it exists. The associate method is used to define associations between models.

db.sequelize = sequelize; // This statement assigns the Sequelize library to the Sequelize property of the db object.
db.Sequelize = Sequelize; // This statement assigns the Sequelize library to the Sequelize property of the db object.

module.exports = db; // This statement exports the db object as a module.
