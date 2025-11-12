const express = require('express'); // importa o módulo Express para criar rotas e middleware
const router = express.Router(); // cria uma instância de Router do Express para agrupar rotas
const TarefaController = require('../controllers/tarefaController'); // importa o controller que contém as funções de tratamento das rotas

router.post('/', TarefaController.criar); // rota POST '/' — cria uma nova tarefa usando o método criar do controller
router.get('/', TarefaController.listar); // rota GET '/' — lista todas as tarefas usando o método listar do controller
router.get('/:id', TarefaController.buscarPorId); // rota GET '/:id' — busca uma tarefa por ID usando buscarPorId
router.put('/:id', TarefaController.atualizar); // rota PUT '/:id' — atualiza completamente a tarefa com o ID informado usando atualizar
router.patch('/:id/status', TarefaController.atualizarStatus); // rota PATCH '/:id/status' — atualiza apenas o status da tarefa usando atualizarStatus
router.delete('/:id', TarefaController.deletar); // rota DELETE '/:id' — remove a tarefa com o ID informado usando deletar

module.exports = router; // exporta o router para ser usado pelo aplicativo principal (ex: app.use('/tarefas', router))
