'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface VerificationAttributes {
  id: string;
  userId: string;
  code: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Verification extends Model <VerificationAttributes>
  implements VerificationAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     id!: string;
     userId!: string;
     code!: string;

    static associate(models: any) {
      // define association here
      Verification.belongsTo(models.User);
    }
  }
  Verification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Verification',
  });
  return Verification;
};