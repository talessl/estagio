module.exports = (sequelize, DataTypes) => {
    const Processo = sequelize.define('Processo', {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      orgaoResponsavel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assunto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      statusProcesso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      procuradorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Processo.associate = (models) => {
      Processo.belongsTo(models.Procurador, { foreignKey: 'procuradorId' });
      Processo.hasMany(models.Prazo, { foreignKey: 'processoId' });
      Processo.hasMany(models.Documento, { foreignKey: 'processoId'});
  
      Processo.belongsToMany(models.Cliente, {
        through: models.ProcessoCliente,
        foreignKey: 'processoId',
        otherKey: 'clienteId'
      });
    };
  
    return Processo;
  };
  