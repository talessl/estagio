'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prazos', [{
      dataVencimento: '2025-08-06 14:35:48',
      status: 'Ativo',
      tipoPrazo: 'Resposta',
      processoId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      dataVencimento: '2025-09-01 10:00:00',
      status: 'Ativo',
      tipoPrazo: 'Apresentação de Defesa',
      processoId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      dataVencimento: '2025-07-20 16:45:00',
      status: 'Ativo',
      tipoPrazo: 'Audiência',
      processoId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      dataVencimento: '2025-10-15 09:30:00',
      status: 'Ativo',
      tipoPrazo: 'Prazo Final',
      processoId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prazos', {
      dataVencimento: {
        [Sequelize.Op.in]: [
          '2025-08-06 14:35:48',
          '2025-09-01 10:00:00',
          '2025-07-20 16:45:00',
          '2025-10-15 09:30:00'
        ]
      }
    })
  }
};

// npx sequelize-cli db:seed --seed 20250406144226-prazos.js
