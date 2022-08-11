'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface BusinessAttributes {
  id: string;
  businessType: any;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class BusinessType extends Model <BusinessAttributes>
  implements BusinessAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     businessType!: any;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  BusinessType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    businessType: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.businessType = records.businessType.toLowerCase();
      }
    },
    sequelize,
    modelName: 'BusinessType',
  });
  return BusinessType;
};