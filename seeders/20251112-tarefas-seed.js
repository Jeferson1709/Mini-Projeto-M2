'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tarefas', [
      {
        titulo: 'Estudar Node.js',
        descricao: 'Ler sobre Express e middlewares.',
        status: 'a fazer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        titulo: 'Aprender Sequelize',
        descricao: 'Testar migrations, models e seeds.',
        status: 'em andamento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        titulo: 'Finalizar projeto To-Do',
        descricao: 'Implementar rotas e testes automatizados.',
        status: 'concluída',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tarefas', null, {});
  }
};
