module.exports = (sequelize, DataTypes) => {
  const Prazo = sequelize.define('Prazo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dataVencimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoPrazo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Prazo.associate = (models) => {
    Prazo.belongsTo(models.Processo, { foreignKey: 'processoId' });
  };

  return Prazo;
}