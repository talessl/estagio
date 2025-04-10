'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('processoClientes', [
      {
        processoId: 1,
        clienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 1,
        clienteId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 1,
        clienteId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 2,
        clienteId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 2,
        clienteId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 2,
        clienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 3,
        clienteId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        processoId: 3,
        clienteId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processoCliente', null, {});
  }
};
