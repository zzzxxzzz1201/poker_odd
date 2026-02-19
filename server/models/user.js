const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

class User extends Model {
  async comparePassword(password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        }
      },
    },
  }
);

module.exports = User;
