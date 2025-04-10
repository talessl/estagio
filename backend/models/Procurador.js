module.exports = (sequelize, DataTypes) => {
    const Procurador = sequelize.define('Procurador', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        oab: {
            type: DataTypes.STRING(100),
            unique: true
        },
        cnpj: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'procuradores'
    });

    Procurador.associate = (models) => {
        Procurador.hasMany(models.Processo, {
            foreignKey: 'procuradorId'
        });

        Procurador.belongsTo(models.Usuario, {
            foreignKey: 'usuarioId'
        });
    };

    return Procurador;
};
