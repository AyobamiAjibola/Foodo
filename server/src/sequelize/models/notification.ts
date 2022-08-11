'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface NotificationAttributes {
  id: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Notification extends Model <NotificationAttributes>
  implements NotificationAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;

    // static associate(models: any) {
    //   // define association here
    // }
  }
  Notification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};