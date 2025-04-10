'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Processos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      numero: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      orgaoResponsavel: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      assunto: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      statusProcesso: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      procuradorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Procuradores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Processos');
  }
};
