'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface SupportAttributes {
  id: string;
  facebook: string;
  twitter: string;
  instagram: string;
  phonenumber: string;
  officeAddress: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Support extends Model <SupportAttributes>
  implements SupportAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     facebook!: string;
     twitter!: string;
     instagram!: string;
     phonenumber!: string;
     officeAddress!: string;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Support.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: false
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false
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
    officeAddress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.officeAddress = records.officeAddress.toLowerCase();
        records.facebook = records.facebook.toLowerCase();
        records.twitter = records.twitter.toLowerCase();
        records.instagram = records.instagram.toLowerCase();
      }
    },
    sequelize,
    modelName: 'Support',
  });
  return Support;
};