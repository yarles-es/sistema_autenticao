module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'accounts'
    }
  );

  Account.associate = ({ User }) => {
    Account.belongsTo(User, 
      { foreignKey: 'idUser', as: 'Users' });
  }

  return Account;
};