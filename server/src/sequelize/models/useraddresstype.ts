'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface UserAddressAttributes {
  id: string;
  addressType: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserAddressType extends Model <UserAddressAttributes>
  implements UserAddressAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     addressType!: string;

    static associate(models: any) {
      // define association here
      UserAddressType.hasOne(models.UserAddress);
    }
  }
  UserAddressType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    addressType: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UserAddressType',
  });
  return UserAddressType;
};