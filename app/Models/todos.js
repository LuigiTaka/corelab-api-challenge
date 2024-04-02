'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todos.hasOne(models.User)
      // define association here
    }
  }

  Todos.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    color: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Todos',
  });
  return Todos;
};
