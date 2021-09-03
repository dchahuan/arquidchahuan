const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Solicitud.belongsTo(models.Product);
      Solicitud.belongsTo(models.User);
    }
  }
  Solicitud.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    tipo: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Solicitud',
  });
  return Solicitud;
};
