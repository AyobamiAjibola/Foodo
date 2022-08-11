'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface OrderAttributes {
  id: string;
  productId: string;
  userId: string;
  orderBulkId: string;
  quantity: number;
  amount: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model <OrderAttributes>
  implements OrderAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    productId!: string;
    userId!: string;
    orderBulkId!: string;
    quantity!: number;
    amount!: number;

    static associate(models: any) {
      // define association here
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
      Order.belongsTo(models.OrderBulk);
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ProductId',
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserId',
    },
    orderBulkId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OrderBulkId'
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};