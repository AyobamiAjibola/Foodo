'use strict';
import { hashSync } from 'bcryptjs';
import {
  Model, UUIDV4
} from 'sequelize';

interface RiderAttributes {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phonenumber: string;
  isAvailable: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Rider extends Model <RiderAttributes>
  implements RiderAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: string;
     firstname!: string;
     lastname!: string;
     password!: string;
     email!: string;
     phonenumber!: string;
     isAvailable!: boolean;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Rider.init({
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
              msg: "Only letters allowed in lastname"
          },
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
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.firstname = records.firstname.toLowerCase();
        records.lastname = records.lastname.toLowerCase();
      }
    },
    sequelize,
    modelName: 'Rider',
  });
  return Rider;
};