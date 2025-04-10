module.exports = (sequelize, DataTypes) => {
    const ProcessoCliente = sequelize.define('ProcessoCliente', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
      processoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    return ProcessoCliente;
  };