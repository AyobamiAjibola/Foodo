'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ProductAttributes {
  id: string;
  merchantId: string;
  productName: string;
  category: string;
  costPrice: string;
  salePrice: string;
  description: string;
  isAvailable: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model <ProductAttributes>
  implements ProductAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    merchantId!: string;
    productName!: string;
    category!: string;
    costPrice!: string;
    salePrice!: string;
    description!: string;
    isAvailable!: boolean;

    static associate(models: any) {
      // define association here
      Product.belongsTo(models.Merchant);
      Product.hasMany(models.Order);
      Product.hasMany(models.ProductImage);
      Product.hasMany(models.Favourites);
      Product.hasOne(models.Review);
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    merchantId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MerchantId'
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product name is required" }
      }
    },
    category: {
      type: DataTypes.ENUM,
      values: ['food', 'grill', 'drinks', 'others']
    },
    costPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[0-9]+$", 'i'],
          msg: "Only numbers are allowed"
        }
      }
    },
    salePrice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[0-9]+$", 'i'],
          msg: "Only numbers are allowed"
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};