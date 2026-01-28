const allowedStatuses = ['a fazer', 'em andamento', 'concluída']; // array com os status válidos permitidos

function validarCriacao(body) {
  const errors = []; // array para acumular mensagens de erro na criação
  if (!body.titulo || typeof body.titulo !== 'string' || body.titulo.trim() === '') {
    // se titulo não existe, não é string ou é string vazia após trim
    errors.push('titulo é obrigatório e não pode ser vazio.'); // adiciona mensagem de erro para titulo
  }
  if (body.status && !allowedStatuses.includes(body.status)) {
    // se status foi fornecido e não está na lista de status permitidos
    errors.push(`status inválido. Valores permitidos: ${allowedStatuses.join(', ')}`); // adiciona mensagem de erro para status
  }
  return errors; // retorna todos os erros encontrados (vazio se OK)
}

function validarAtualizacao(body) {
  const errors = []; // array para acumular erros na atualização
  if (body.titulo !== undefined && (typeof body.titulo !== 'string' || body.titulo.trim() === '')) {
    // se titulo foi fornecido (diferente de undefined) e não é string válida
    errors.push('titulo deve ser uma string não vazia quando fornecido.'); // adiciona erro para titulo inválido
  }
  if (body.status !== undefined && !allowedStatuses.includes(body.status)) {
    // se status foi fornecido e não está na lista de permitidos
    errors.push(`status inválido. Valores permitidos: ${allowedStatuses.join(', ')}`); // adiciona erro para status inválido
  }
  return errors; // retorna lista de erros (vazia se tudo OK)
}

module.exports = {
  allowedStatuses, // exporta a lista de status permitidos
  validarCriacao,  // exporta a função de validação na criação
  validarAtualizacao // exporta a função de validação na atualização
};
