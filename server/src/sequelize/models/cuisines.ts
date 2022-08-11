'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface CuisinesAttributes {
  id: string;
  cuisines: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Cuisines extends Model <CuisinesAttributes>
  implements CuisinesAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    cuisines!: string;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Cuisines.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    cuisines: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.cuisines = records.cuisines.toLowerCase();
      }
    },
    sequelize,
    modelName: 'Cuisines',
  });
  return Cuisines;
};