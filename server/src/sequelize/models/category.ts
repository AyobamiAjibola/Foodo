'use strict';
import {
  Model, UUIDV4
} from 'sequelize';


interface CategoryAttributes {
  id: string;
  category: any;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model <CategoryAttributes>
  implements CategoryAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     category!: any;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.category = records.category.toLowerCase();
      }
    },
    sequelize,
    modelName: 'Category',
  });
  return Category;
};