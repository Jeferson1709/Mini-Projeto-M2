const request = require('supertest'); // biblioteca para testar endpoints HTTP
const app = require('../src/app'); // importando a aplicação Express
const { sequelize, Tarefa } = require('../src/models') || require('../models'); // importando sequelize e modelos (fallback)

// Antes de todos os testes, sincroniza o banco (em memória) com os modelos
beforeAll(async () => {
  // ensure test DB (in-memory) matches models
  await sequelize.sync({ force: true });
});

// Após todos os testes, fecha a conexão com o banco
afterAll(async () => {
  await sequelize.close();
});

describe('API Tarefas - CRUD', () => {
  let tarefaId; // armazena id da tarefa criada para testes subsequentes

  test('POST /tarefas - criar tarefa', async () => {
    // cria uma nova tarefa via endpoint
    const res = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Teste unitario', descricao: 'Criar tarefa via test', status: 'a fazer' });
    expect(res.statusCode).toBe(201); // espera status 201 Created
    expect(res.body).toHaveProperty('id'); // espera que o corpo tenha um id
    tarefaId = res.body.id; // guarda o id para outros testes
  });

  test('GET /tarefas - listar tarefas', async () => {
    // busca todas as tarefas
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200); // espera status 200 OK
    expect(Array.isArray(res.body)).toBe(true); // espera um array como resposta
    expect(res.body.length).toBeGreaterThanOrEqual(1); // pelo menos uma tarefa (a criada)
  });

  test('GET /tarefas/:id - buscar por id', async () => {
    // busca a tarefa criada pelo id
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(200); // espera 200 OK
    expect(res.body).toHaveProperty('id', tarefaId); // espera que o id no corpo seja o mesmo
  });

  test('PUT /tarefas/:id - atualizar tarefa', async () => {
    // atualiza a tarefa inteira (PUT)
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ titulo: 'Teste atualizado', descricao: 'Atualizado via test', status: 'em andamento' });
    expect(res.statusCode).toBe(200); // espera 200 OK
    expect(res.body).toHaveProperty('titulo', 'Teste atualizado'); // verifica campo atualizado
  });

  test('PATCH /tarefas/:id/status - atualizar status', async () => {
    // atualiza apenas o status da tarefa (PATCH)
    const res = await request(app)
      .patch(`/tarefas/${tarefaId}/status`)
      .send({ status: 'concluída' });
    expect(res.statusCode).toBe(200); // espera 200 OK
    expect(res.body).toHaveProperty('status', 'concluída'); // verifica o novo status
  });

  test('DELETE /tarefas/:id - deletar', async () => {
    // deleta a tarefa criada
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(204); // espera 204 No Content (deletado com sucesso)
  });
});
