'use strict';
import { hashSync } from 'bcryptjs';
import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
  companyName: string;
  fullName: string;
  phonenumber: string;
  role: string;
  email: string;
  isAdmin: boolean;
  password: string;
  profileImage: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class SuperAdmin extends Model <UserAttributes>
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    companyName!: string;
    fullName!: string;
    phonenumber!: string;
    role!: string;
    email!: string;
    isAdmin!: boolean;
    password!: string;
    profileImage!: string;

    static associate(models: any) {
      // define association here
      SuperAdmin.hasMany(models.OtherAdmins)
    }
  }
  SuperAdmin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "First name is required" }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Last name is required" }
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
    role: {
      type: DataTypes.ENUM,
      values: ['super_admin']
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    profileImage: {
      type: DataTypes.STRING
    }
  },
  {
    hooks: {
      beforeCreate(records){
        records.companyName = records.companyName.toLowerCase();
        records.fullName = records.fullName.toLowerCase();
      }
    },
    sequelize,
    modelName: 'SuperAdmin',
  });
  return SuperAdmin;
};

// validate: {
//   passwordValidator(value) {
//       if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(value))
//           throw new Error("Le mot de passe doit contenir au moins 8 caractères numériques et alphabétiques")
//   }
// }