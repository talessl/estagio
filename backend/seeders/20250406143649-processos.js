'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Processos', [
      {
        numero: 'ABX12345678',
        orgaoResponsavel: 'SEFAZ',
        assunto: 'Processo tributário estadual',
        statusProcesso: 'Concluído',
        procuradorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: 'ZKL98765432',
        orgaoResponsavel: 'PGE',
        assunto: 'Revisão de contrato público',
        statusProcesso: 'Em análise',
        procuradorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: 'TRF11223344',
        orgaoResponsavel: 'TRF-1',
        assunto: 'Ação civil pública',
        statusProcesso: 'Arquivado',
        procuradorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numero: 'CMP55667788',
        orgaoResponsavel: 'Câmara Municipal',
        assunto: 'Investigação de responsabilidade fiscal',
        statusProcesso: 'Em andamento',
        procuradorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Processos', {
      procuradorId: [2,4,5,6]
    })
  }
};

// npx sequelize-cli db:seed --seed 20250406143649-processos.js