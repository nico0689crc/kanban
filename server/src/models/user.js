'use strict';

const { Model, DataTypes } = require('sequelize');
const { Project } = require('./index');

module.exports = (sequelize) => {
  class User extends Model {
    static roles = {
      user: 'user',
      admin: 'admin'
    } 

    static associate(models) {
      this.hasMany(models['Project'], { foreignKey: 'user_id', as: 'projects' });
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
    password_reset_token: DataTypes.STRING,
    password_reset_token_req_at: DataTypes.DATE,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });

  return User;
};