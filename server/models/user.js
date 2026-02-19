const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
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
      allowNull: false,
    },
  },
  {
    tableName: "users",
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      },
    },
  }
);

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = User;
