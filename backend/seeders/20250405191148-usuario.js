'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaCriptografada = await bcrypt.hash('12345', 10);

    await queryInterface.bulkInsert('Usuarios', [
      {
        email: 'adm@adm.com',
        nome: 'Administrador',
        senha: senhaCriptografada,
        tipoUsuario: 'adm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'procurador@pge.com',
        nome: 'Procurador',
        senha: senhaCriptografada,
        tipoUsuario: 'procurador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'cliente@pge.com',
        nome: 'Cliente',
        senha: senhaCriptografada,
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'procurador1@pge.com',
        nome: 'Procurador 1',
        senha: senhaCriptografada,
        tipoUsuario: 'procurador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'procurador2@pge.com',
        nome: 'Procurador 2',
        senha: senhaCriptografada,
        tipoUsuario: 'procurador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'procurador3@pge.com',
        nome: 'Procurador 3',
        senha: senhaCriptografada,
        tipoUsuario: 'procurador',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Clientes
      {
        email: 'cliente1@pge.com',
        nome: 'Cliente 1',
        senha: senhaCriptografada,
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'cliente2@pge.com',
        nome: 'Cliente 2',
        senha: senhaCriptografada,
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'cliente3@pge.com',
        nome: 'Cliente 3',
        senha: senhaCriptografada,
        tipoUsuario: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', {
      email: ['adm@adm.com',
              'procurador@pge.com',
              'cliente@pge.com',
              'procurador1@pge.com',
              'procurador2@pge.com',
              'procurador3@pge.com',
              'cliente1@pge.com',
              'cliente2@pge.com',
              'cliente3@pge.com']
    }, {});
  }
};
