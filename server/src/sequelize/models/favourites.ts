'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface FavAttribute {
  id: string;
  userId: string;
  productId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Favourites extends Model <FavAttribute>
  implements FavAttribute{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     userId!: string;
     productId!: string;

    static associate(models: any) {
      // define association here
      Favourites.belongsTo(models.User);
      Favourites.belongsTo(models.Product);
    }
  }
  Favourites.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserId'
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ProductId'
    }
  }, {
    sequelize,
    modelName: 'Favourites',
  });
  return Favourites;
};