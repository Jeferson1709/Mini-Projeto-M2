// Controller responsável pelas operações CRUD de tarefas.
// Importa o modelo Tarefa e validações específicas para criação/atualização.
const { Tarefa } = require('../models');
const { validarCriacao, validarAtualizacao, allowedStatuses } = require('../validators/tarefaValidator');

class TarefaController {
  // Cria uma nova tarefa:
  // - valida os dados de entrada
  // - define valores padrão (descricao null, status 'a fazer')
  // - retorna 201 com a tarefa criada ou 400/500 em caso de erro
  static async criar(req, res) {
    try {
      const errors = validarCriacao(req.body);
      if (errors.length) return res.status(400).json({ errors });

      const tarefa = await Tarefa.create({
        titulo: req.body.titulo.trim(),
        descricao: req.body.descricao || null,
        status: req.body.status || 'a fazer'
      });

      return res.status(201).json(tarefa);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao criar tarefa.' });
    }
  }

  // Lista todas as tarefas ordenadas pela data de criação (mais recentes primeiro).
  static async listar(req, res) {
    try {
      const tarefas = await Tarefa.findAll({ order: [['created_at', 'DESC']] });
      return res.status(200).json(tarefas);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    }
  }

  // Busca uma tarefa por ID:
  // - retorna 404 se não existir, 200 com a tarefa se encontrada
  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada.' });
      return res.status(200).json(tarefa);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao buscar tarefa.' });
    }
  }

  // Atualiza campos de uma tarefa:
  // - busca a tarefa por ID
  // - valida os dados passados para atualização
  // - aplica apenas os campos fornecidos (titulo, descricao, status)
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada.' });

      const errors = validarAtualizacao(req.body);
      if (errors.length) return res.status(400).json({ errors });

      const atualizacoes = {};
      if (req.body.titulo !== undefined) atualizacoes.titulo = req.body.titulo.trim();
      if (req.body.descricao !== undefined) atualizacoes.descricao = req.body.descricao;
      if (req.body.status !== undefined) atualizacoes.status = req.body.status;

      await tarefa.update(atualizacoes);
      return res.status(200).json(tarefa);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    }
  }

  // Atualiza somente o status de uma tarefa:
  // - valida se o status informado está entre os permitidos
  // - retorna 400 se inválido, 404 se tarefa não encontrada, 200 se atualizado
  static async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: `status inválido. Valores permitidos: ${allowedStatuses.join(', ')}` });
      }
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada.' });

      tarefa.status = status;
      await tarefa.save();
      return res.status(200).json(tarefa);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao atualizar status da tarefa.' });
    }
  }

  // Deleta uma tarefa por ID:
  // - retorna 204 no sucesso, 404 se não encontrada, 500 em erro
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada.' });

      await tarefa.destroy();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao deletar tarefa.' });
    }
  }
}

module.exports = TarefaController;
