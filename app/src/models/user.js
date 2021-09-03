require('dotenv').config();

const {
  Model,
} = require('sequelize');

const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Solicitud);
    }

    async checkPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  User.init({
    nick: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (instance) => {
    if (instance.changed('password')) {
      const hash = await bcrypt.hash(instance.password, saltRounds);
      instance.set('password', hash);
    }
  });

  return User;
};
