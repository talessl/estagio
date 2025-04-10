'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clientes', [
      {
        cpf: '111.222.333-44',
        usuarioId: 3, //talvez seja necessário mudar
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpf: '222.333.444-55',
        usuarioId: 7, //talvez seja necessário mudar
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpf: '333.444.555-66',
        usuarioId: 8, //talvez seja necessário mudar
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cpf: '444.555.666-77',
        usuarioId: 9, //talvez seja necessário mudar
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', {
      usuarioId: [3, 7, 8, 9]
    });
  }
};

// npx sequelize-cli db:seed --seed 20250406142251-cliente.js
