'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface CartAttributes {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Cart extends Model <CartAttributes>
  implements CartAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     userId!: string;
     productId!: string;
     quantity!: number;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};