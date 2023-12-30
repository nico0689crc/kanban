'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static roles = {
      user: 'user',
      admin: 'admin'
    } 
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getEntity() {
      return "users";
    }

    static getFieldsToSelect() {
      return ['uuid', 'first_name', 'last_name', 'email', 'role', 'avatar'];
    }
  }

  User.init({
    uuid: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    confirmation_code: DataTypes.STRING,
    email_verified: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    reset_password_token: DataTypes.STRING,
    reset_password_token_req_at: DataTypes.DATE,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};