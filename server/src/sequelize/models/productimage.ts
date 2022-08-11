'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ProductImageAttributes {
  id: string;
  image: string;
  productId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProductImage extends Model <ProductImageAttributes>
  implements ProductImageAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    image!: string;
    productId!: string;

    static associate(models: any) {
      // define association here
      ProductImage.belongsTo(models.Product);
    }
  }
  ProductImage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ProductId'
    }
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};