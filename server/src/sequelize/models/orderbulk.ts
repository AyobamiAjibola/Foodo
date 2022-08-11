'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface OrderBulkAttributes {
  id: string;
  totalAmount: number;
  address: string;
  totalItem: number;
  userId: string;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class OrderBulk extends Model <OrderBulkAttributes>
  implements OrderBulkAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     totalAmount!: number;
     address!: string;
     totalItem!: number;
     userId!: string;
     status!: string;

    static associate(models: any) {
      // define association here
      OrderBulk.hasMany(models.Order); //ask henry
      OrderBulk.belongsTo(models.User);
    }
  }
  OrderBulk.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    totalAmount: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalItem: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserId',
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['pending', 'active'],
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'OrderBulk',
  });
  return OrderBulk;
};