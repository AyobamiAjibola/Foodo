'use strict';
import { hashSync } from 'bcryptjs';
import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  refererCode: string;
  referred: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model <UserAttributes>
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    phonenumber!: string;
    password!: string;
    refererCode!: string;
    referred!: string;

    static associate(models: any) {
      // define association here
      User.hasOne(models.Order);
      User.hasOne(models.OrderBulk);
      User.hasOne(models.UserAddress);
      User.hasOne(models.Review);
      User.hasOne(models.Verification);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Firstname is required" },
          is: {
              args: ["^[a-z]+$", 'i'],
              msg: "Only letters allowed in firstname"
          },
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Lastname is required" },
          is: {
              args: ["^[a-z]+$", 'i'],
              msg: "Only letters allowed lastname"
          },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: {msg: "Please enter a correct email address"}
      }
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
      },
      set(value: any) {
          this.setDataValue('password', hashSync(value, 10));
      }
    },
    refererCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referred: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.firstname = records.firstname.toLowerCase();
        records.lastname = records.firstname.toLowerCase();
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};