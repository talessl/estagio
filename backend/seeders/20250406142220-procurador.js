'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Procuradores', [
      {
        oab: '123456/SP',
        cnpj: '13.025.755/0001-01',
        usuarioId: 2, // Certifique-se de que esse valor está correto
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        oab: '123457/SP',
        cnpj: '13.025.756/0001-01',
        usuarioId: 4, // Verifique se esse ID existe na tabela 'Usuarios'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        oab: '123458/SP',
        cnpj: '13.025.757/0001-01',
        usuarioId: 5, // Verifique se esse ID existe na tabela 'Usuarios'
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        oab: '123459/SP',
        cnpj: '13.025.758/0001-01',
        usuarioId: 6, // Verifique se esse ID existe na tabela 'Usuarios'
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Procuradores', {
      usuarioId: [2, 4, 5, 6]
    }, {});
  }
};

// npx sequelize-cli db:seed --seed 20250406142220-procurador.js
