'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface UserAddressAttributes {
  id: string;
  address: string;
  state: string;
  city: string;
  landmark: string;
  userAddressTypeId: string;
  phonenumber: string;
  userId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserAddress extends Model <UserAddressAttributes>
  implements UserAddressAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     address!: string;
     state!: string;
     city!: string;
     landmark!: string;
     userAddressTypeId!: string;
     phonenumber!: string;
     userId!: string;

    static associate(models: any) {
      // define association here
      UserAddress.belongsTo(models.UserAddressType);
      UserAddress.belongsTo(models.User);
    }
  }
  UserAddress.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "Only alphabets are allowed"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "Only alphabets are allowed"
        }
      }
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userAddressTypeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserAddressTypeId'
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number is required" },
        is: {
          args: ["^[0-9]+$", 'i'],
          msg: "Only numbers are allowed"
        },
        len: {
          args: [11, 11],
          msg: 'Invalid phone number'
        }
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'UserId'
    }
  }, {
    sequelize,
    modelName: 'UserAddress',
  });
  return UserAddress;
};