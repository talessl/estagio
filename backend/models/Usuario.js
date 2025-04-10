module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    tipoUsuario: {
      type: DataTypes.ENUM('adm', 'procurador', 'cliente'),
      allowNull: false
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Cliente, { foreignKey: 'usuarioId' });
    Usuario.hasOne(models.Procurador, { foreignKey: 'usuarioId' });
  };

  return Usuario;
};