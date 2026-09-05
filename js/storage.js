/* Armazenamento local do progresso do aluno (localStorage).
   Guarda: desafios resolvidos, tentativas, dicas usadas, pontos,
   conquistas desbloqueadas, códigos salvos e último desafio acessado.
*/

const CHAVE = 'desafio-python-code-progresso-v1';

export const PROGRESSO_PADRAO = () => ({
  resolvidos: [],
  tentativas: {},
  dicasUsadas: {},
  pontosDesafios: {},
  pontuacao: 0,
  conquistas: [],
  codigos: {},
  ultimoDesafio: 1,
  criadoEm: Date.now(),
});

export function carregarProgresso() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return PROGRESSO_PADRAO();
    const dados = JSON.parse(bruto);
    const padrao = PROGRESSO_PADRAO();
    for (const chave in padrao) {
      if (dados[chave] === undefined) dados[chave] = padrao[chave];
    }
    return dados;
  } catch (e) {
    return PROGRESSO_PADRAO();
  }
}

export function salvarProgresso(dados) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch (e) {
    /* armazenamento indisponível */
  }
  return dados;
}

export function registrarTentativa(dados, id) {
  const atual = dados.tentativas[id] || 0;
  dados.tentativas[id] = atual + 1;
  salvarProgresso(dados);
  return dados.tentativas[id];
}

export async function registrarAcerto(dados, id, pontos) {
  if (!dados.resolvidos.includes(id)) {
    dados.resolvidos.push(id);
  }
  const antigos = dados.pontosDesafios[id] || 0;
  dados.pontosDesafios[id] = Math.max(antigos, pontos);
  dados.pontuacao = recalcPontuacao(dados);
  salvarProgresso(dados);
  return dados;
}

export function recalcPontuacao(dados) {
  let total = 0;
  for (const id in dados.pontosDesafios) {
    total += dados.pontosDesafios[id] || 0;
  }
  return total;
}

export function marcarDicaUsada(dados, id) {
  dados.dicasUsadas[id] = true;
  salvarProgresso(dados);
  return dados;
}

export function salvarCodigo(dados, id, codigo) {
  if (codigo && codigo.trim()) dados.codigos[id] = codigo;
  else delete dados.codigos[id];
  salvarProgresso(dados);
}

export function registrarConquista(dados, id) {
  if (!dados.conquistas.includes(id)) {
    dados.conquistas.push(id);
    salvarProgresso(dados);
    return true;
  }
  return false;
}

export function zerarProgresso() {
  const limpo = PROGRESSO_PADRAO();
  salvarProgresso(limpo);
  return limpo;
}

export function estatisticas(dados, totalDesafios) {
  const concluidos = dados.resolvidos.length;
  const percentual = totalDesafios ? Math.round((concluidos / totalDesafios) * 100) : 0;
  const erradosAtuais = Object.keys(dados.tentativas).length;
  return {
    concluidos,
    percentual,
    pontuacao: dados.pontuacao,
    tentativas: Object.values(dados.tentativas).reduce((a, b) => a + b, 0),
    desafiosComTentativa: erradosAtuais,
    ultimoDesafio: dados.ultimoDesafio,
  };
}

export function codigoSalvo(dados, id) {
  return dados.codigos[id] || '';
}

export function salvarUltimoDesafio(dados, id) {
  dados.ultimoDesafio = id;
  salvarProgresso(dados);
}