module.exports = (sequelize, DataTypes) => {
    const Documento = sequelize.define('Documento', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tipoDocumento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      caminho: {
        type: DataTypes.STRING,
        allowNull: false
      },
      processoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Processos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }, {
      timestamps: true, 
      tableName: 'Documentos' 
    });
  
    Documento.associate = (models) => {
      Documento.belongsTo(models.Processo, { foreignKey: 'processoId' });
    };
  
    return Documento;
  };
  