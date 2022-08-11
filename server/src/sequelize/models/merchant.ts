'use strict';
import { hashSync } from 'bcryptjs';
import {
  Model, UUIDV4
} from 'sequelize';

interface MerchantAttributes {
  id: string;
  fullname: string;
  email: string;
  password: string;
  noOfEstablishment: number;
  addressOfStore: string;
  whereYouDeliver: string;
  businessType: string;
  cuisinesDelivered: string;
  isVendor: boolean;
  vendorId: string;
  closingTime: Date;
  openingTime: Date;
  profileImage: string;
  certificate: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Merchant extends Model <MerchantAttributes>
  implements MerchantAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    fullname!: string;
    email!: string;
    password!: string;
    noOfEstablishment!: number;
    addressOfStore!: string;
    whereYouDeliver!: string;
    businessType!: string;
    cuisinesDelivered!: string;
    isVendor!: boolean;
    vendorId!: string;
    closingTime!: Date;
    openingTime!: Date;
    profileImage!: string;
    certificate!: string;

    static associate(models: any) {
      // define association here
      Merchant.hasMany(models.Product)
    }
  }
  Merchant.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: {msg: "Please enter a correct email address"}
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
    noOfEstablishment: {
      type: DataTypes.INTEGER,
      validate: {
        is: {
          args: ["^[0-9]+$", 'i'],
          msg: "Only numbers are allowed"
        }
      }
    },
    addressOfStore: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whereYouDeliver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuisinesDelivered: {
      type: DataTypes.STRING
    },
    isVendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vendorId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    closingTime: {
      type: DataTypes.DATE
    },
    openingTime: {
      type: DataTypes.DATE
    },
    profileImage: {
      type: DataTypes.STRING
    },
    certificate: {
      type: DataTypes.STRING,
      // allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.whereYouDeliver = records.whereYouDeliver.toLowerCase();
        records.fullname = records.fullname.toLowerCase();
      }
    },
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};