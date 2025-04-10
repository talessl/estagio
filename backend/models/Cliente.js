module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cpf: {
        type: DataTypes.STRING,
        unique: true
      }
    });
  
    Cliente.associate = (models) => {
      Cliente.belongsToMany(models.Processo, {
        through: models.ProcessoCliente,
        foreignKey: 'clienteId',
        otherKey: 'processoId'
      });

      Cliente.belongsTo(models.Usuario, { foreignKey: 'usuarioId'});
    };
  
    return Cliente;
  };
  