'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ReviewAttributes {
  id: string;
  review: string;
  rating: string;
  productId: string;
  userId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Review extends Model <ReviewAttributes>
  implements ReviewAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     review!: string;
     rating!: string;
     productId!: string;
     userId!: string;

    static associate(models: any) {
      // define association here
      Review.belongsTo(models.User);
      Review.belongsTo(models.Product);
    }
  }
  Review.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    review: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ProductId'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserId'
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};