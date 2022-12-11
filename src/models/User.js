module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull,
      },
      motherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = ({ Account }) => {
    User.hasOne(Account, 
      { foreignKey: 'idUser', as: 'Accounts'});
  };

  return User;
}