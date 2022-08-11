'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface RoleAttributes {
  id: string;
  role: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AdminRole extends Model <RoleAttributes>
  implements RoleAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    role!: string;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  AdminRole.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    hooks: {
      beforeCreate(records){
        records.role = records.role.toLowerCase();
      }
    },
    sequelize,
    modelName: 'AdminRole',
  });
  return AdminRole;
};