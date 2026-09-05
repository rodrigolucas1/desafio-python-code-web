/* DESAFIO PYTHON CODE — Aplicativo principal (interface + navegação). */

import { CHALLENGES, LEVELS, ACHIEVEMENTS, getLevelForChallenge, getLevelById } from '../data/challenges.js';
import * as armazenamento from './storage.js';
import { avaliarExecucao, calcularPontos } from './evaluator.js';
import { carregarPython, executarCodigo } from './python-runner.js';
import { criarEditor, obterCodigo } from './editor.js';

const app = document.getElementById('app');
const progressoSalvo = armazenamento.carregarProgresso();
let estado = {
  progresso: progressoSalvo,
  desafioAtual: progressoSalvo.ultimoDesafio,
  dicaVista: false,
  executando: false,
  carregando: false,
};

/* ---------------- utilidades ---------------- */

const esc = (t) =>
  String(t ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function toast(msg, tipo = 'info', tempo = 3200) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `toast toast-${tipo} mostrar`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('mostrar'), tempo);
}

async function carregouPython() {
  if (!estado.carregando) return true;
  try {
    await estado.carregando;
    return true;
  } catch {
    return false;
  }
}

function statusDesafio(id) {
  if (estado.progresso.resolvidos.includes(id)) return 'ok';
  if (id === estado.desafioAtual) return 'atual';
  return 'novo';
}

function nivelDe(id) {
  return getLevelForChallenge(id);
}

function barraPython() {
  return `
  <div class="python-loading" id="python-loading">
    <div class="pl-snake">🐍</div>
    <div class="pl-bar"><div class="pl-fill"></div></div>
    <p>Carregando Python para executar seu código...</p>
  </div>`;
}

/* ---------------- renderizadores ---------------- */

function renderHome() {
  const stats = armazenamento.estatisticas(estado.progresso, CHALLENGES.length);
  const primeiroPendente = CHALLENGES.find((c) => !estado.progresso.resolvidos.includes(c.id)) || CHALLENGES[0];
  const nivel = nivelDe(estado.desafioAtual);
  const pct = stats.percentual;
  return `
  <section class="page home">
    <div class="hero">
      <div class="hero-icone">🐍</div>
      <h1>Desafio Python Code</h1>
      <p class="hero-sub">Aprenda Python praticando!</p>
      <p class="hero-texto">Resolva desafios de programação, escreva seu código e descubra imediatamente se sua solução está correta.</p>
      <button class="btn btn-principal btn-grande" data-acao="abrir-desafio" data-id="${primeiroPendente.id}">
        COMEÇAR DESAFIO
      </button>
      <button class="btn btn-secundario" data-acao="abrir-aleatorio">
        🎲 DESAFIO ALEATÓRIO
      </button>
    </div>

    <div class="cards">
      <div class="card card-progresso" data-acao="navegar" data-rota="#/progresso">
        <div class="card-rotulo">Progresso</div>
        <div class="card-valor">${stats.concluidos} / ${CHALLENGES.length} desafios concluídos</div>
        <div class="barra-progresso">
          <div class="barra-fill" style="width:${pct}%"></div>
        </div>
        <div class="card-extra">${pct}% concluído</div>
      </div>
      <div class="card card-nivel">
        <div class="card-rotulo">Nível atual</div>
        <div class="card-valor card-nivel-valor">
          <span class="nivel-icone">${nivel.icone}</span> ${nivel.nome}
        </div>
        <div class="card-extra">Desafios ${nivel.faixa[0]}–${nivel.faixa[1]}</div>
      </div>
      <div class="card card-pontos">
        <div class="card-rotulo">Pontuação</div>
        <div class="card-valor">🏆 ${stats.pontuacao} pts</div>
        <div class="card-extra">Tentativas: ${stats.tentativas}</div>
      </div>
    </div>
  </section>`;
}

function renderDesafios() {
  const grupos = LEVELS.map((nivel) => ({
    nivel,
    itens: CHALLENGES.filter((c) => c.id >= nivel.faixa[0] && c.id <= nivel.faixa[1]),
  }));
  return `
  <section class="page desafios">
    <h2 class="page-titulo">Desafios</h2>
    <p class="page-sub">Escolha um desafio para praticar. Eles seguem uma ordem pedagógica.</p>
    ${grupos
      .map(
        (g) => `
      <div class="nivel-bloco">
        <div class="nivel-cabecalho" style="--cor:${g.nivel.cor}">
          <span class="nivel-icone">${g.nivel.icone}</span>
          <div>
            <strong>${g.nivel.nome}</strong>
            <span class="nivel-faixa">Desafios ${g.nivel.faixa[0]}–${g.nivel.faixa[1]}</span>
          </div>
        </div>
        <div class="lista-desafios">
          ${g.itens
            .map((c) => {
              const status = estado.progresso.resolvidos.includes(c.id) ? 'ok' : '';
              return `
            <button class="item-desafio ${status}" data-acao="abrir-desafio" data-id="${c.id}">
              <span class="item-numero">${String(c.id).padStart(2, '0')}</span>
              <span class="item-info">
                <strong>${esc(c.titulo)}</strong>
                <small>${esc(c.conceitos.join(' · '))}</small>
              </span>
              <span class="item-status">${status ? '✅' : '▶'}</span>
            </button>`;
            })
            .join('')}
        </div>
      </div>`,
      )
      .join('')}
  </section>`;
}

function blocoExemplo(exemplo) {
  return `
  <div class="exemplo-card">
    ${exemplo.rotulo ? `<div class="exemplo-rotulo">${esc(exemplo.rotulo)}</div>` : ''}
    ${exemplo.entrada ? `<div class="exemplo-linha"><span class="tag">Entrada</span><code>${esc(exemplo.entrada)}</code></div>` : ''}
    ${exemplo.saida ? `<div class="exemplo-linha"><span class="tag">Resultado esperado</span><code>${esc(exemplo.saida)}</code></div>` : ''}
  </div>`;
}

function renderDesafio(id) {
  const desafio = CHALLENGES.find((c) => c.id === id);
  if (!desafio) {
    return `<section class="page"><p>Desafio não encontrado.</p></section>`;
  }
  const nivel = nivelDe(id);
  const estatisticas = armazenamento.estatisticas(estado.progresso, CHALLENGES.length);
  const codigoSalvo = armazenamento.codigoSalvo(estado.progresso, id) || '# Digite seu código aqui\n';
  const resolvido = estado.progresso.resolvidos.includes(id);
  const anterior = id > 1 ? id - 1 : null;
  const proximo = id < CHALLENGES.length ? id + 1 : null;
  const primeiroTeste = desafio.testes[0];
  const entradaExemplo = primeiroTeste ? primeiroTeste.input.join(' · ') : '—';

  estado.dicaVista = false;
  estado.desafioAtual = id;
  armazenamento.salvarUltimoDesafio(estado.progresso, id);

  return `
  <section class="page desafio">
    <div class="desafio-topo">
      <button class="icon-btn" data-acao="navegar" data-rota="#/desafios" title="Voltar aos desafios">←</button>
      <div class="desafio-header">
        <div class="chip-nivel" style="--cor:${nivel.cor}">${nivel.icone} ${nivel.nome}</div>
        <div class="desafio-contador">Desafio ${id} de ${CHALLENGES.length}
          <span class="barra-mini"><span style="width:${((id / CHALLENGES.length) * 100).toFixed(0)}%"></span></span>
        </div>
        <h2>${esc(desafio.titulo)}</h2>
      </div>
      ${resolvido ? '<div class="selo-ok">✅ Concluído</div>' : ''}
    </div>

    <div class="area-desafio">
      <h3>Área do desafio</h3>
      <p class="enunciado">${esc(desafio.enunciado)}</p>
      <p class="descricao">${esc(desafio.descricao)}</p>
      <div class="conceitos">
        ${desafio.conceitos.map((c) => `<span class="chip-conceito">${esc(c)}</span>`).join('')}
      </div>

      <h3>Exemplo</h3>
      ${desafio.exemplos.map(blocoExemplo).join('')}
    </div>

    <div class="editor-wrap">
      <div class="editor-cabecalho">
        <h3>Seu código</h3>
        <span class="editor-dica">Tab = indentação · Ctrl+Enter = executar</span>
      </div>
      <div class="editor-corpo">
        <div class="code-lines" aria-hidden="true"></div>
        <div class="code-stack">
          <pre class="code-highlight" aria-hidden="true"></pre>
          <textarea class="code-input" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Editor de código Python"></textarea>
        </div>
      </div>
      <div class="editor-botoes">
        <button class="btn btn-principal btn-executar" data-acao="executar" id="btn-executar">▶ EXECUTAR CÓDIGO</button>
        <button class="btn btn-limpar" data-acao="limpar">🧹 LIMPAR</button>
        <button class="btn btn-reset" data-acao="resetar">↺ RESETAR</button>
      </div>
    </div>

    <div id="area-resultado"></div>

    <div class="desafio-nav">
      ${anterior ? `<button class="btn btn-nav" data-acao="abrir-desafio" data-id="${anterior}">← DESAFIO ANTERIOR</button>` : '<span></span>'}
      ${proximo ? `<button class="btn btn-principal" data-acao="abrir-desafio" data-id="${proximo}">PRÓXIMO DESAFIO →</button>` : '<span></span>'}
    </div>
    <div class="desafio-rodape-info">
      ${estatisticas.concluidos} / ${CHALLENGES.length} desafios concluídos · ${estatisticas.pontuacao} pts
    </div>

    <div id="python-loading-placeholder" style="display:none"></div>
  </section>`;
}

function renderProgresso() {
  const stats = armazenamento.estatisticas(estado.progresso, CHALLENGES.length);
  const aproveitamento = stats.tentativas
    ? Math.round((stats.concluidos / (stats.concluidos + stats.desafiosComTentativa)) * 100)
    : stats.concluidos > 0 ? 100 : 0;
  const linhasNiveis = LEVELS.map((nivel) => {
    const itens = CHALLENGES.filter((c) => c.id >= nivel.faixa[0] && c.id <= nivel.faixa[1]);
    const feitos = itens.filter((c) => estado.progresso.resolvidos.includes(c.id)).length;
    const pct = Math.round((feitos / itens.length) * 100);
    return `
    <div class="nivel-progresso">
      <div class="np-cab">
        <span style="color:${nivel.cor}">${nivel.icone} ${nivel.nome}</span>
        <strong>${feitos}/${itens.length}</strong>
      </div>
      <div class="barra-progresso"><div class="barra-fill" style="width:${pct}%;background:${nivel.cor}"></div></div>
    </div>`;
  }).join('');
  return `
  <section class="page progresso">
    <h2 class="page-titulo">📊 Meu Progresso</h2>
    <div class="mini-cards">
      <div class="mini-card"><div class="mc-valor">${stats.concluidos}</div><div class="mc-rotulo">Desafios concluídos</div></div>
      <div class="mini-card"><div class="mc-valor">${stats.percentual}%</div><div class="mc-rotulo">Concluído</div></div>
      <div class="mini-card"><div class="mc-valor">🏆 ${stats.pontuacao}</div><div class="mc-rotulo">Pontuação</div></div>
      <div class="mini-card"><div class="mc-valor">${stats.tentativas}</div><div class="mc-rotulo">Tentativas</div></div>
    </div>
    <h3>Por nível</h3>
    ${linhasNiveis}
    <div class="progresso-acoes">
      <button class="btn btn-principal" data-acao="abrir-desafio" data-id="${estado.desafioAtual}">Continuar aprendendo →</button>
      <button class="btn btn-secundario" data-acao="navegar" data-rota="#/conquistas">Ver conquistas</button>
    </div>
  </section>`;
}

function renderConquistas() {
  const cards = ACHIEVEMENTS.map((c) => {
    const ganha = c.condicao(estado.progresso);
    return `
    <div class="conquista ${ganha ? 'ganha' : 'bloqueada'}">
      <div class="cq-icone">${ganha ? c.icone : '🔒'}</div>
      <strong>${esc(c.titulo)}</strong>
      <p>${esc(c.descricao)}</p>
    </div>`;
  }).join('');
  const nivelConcluidos = [];
  for (const nivel of LEVELS) {
    const itens = CHALLENGES.filter((c) => c.id >= nivel.faixa[0] && c.id <= nivel.faixa[1]);
    const feitos = itens.filter((c) => estado.progresso.resolvidos.includes(c.id)).length;
    nivelConcluidos.push(`${nivel.icone} ${nivel.nome}: ${feitos}/${itens.length}`);
  }
  const tudo = estado.progresso.resolvidos.length >= CHALLENGES.length;
  return `
  <section class="page conquistas">
    <h2 class="page-titulo">🏆 Conquistas</h2>
    ${tudo ? `<div class="banner-final"><div class="bf-icone">🏆</div><h3>DESAFIO PYTHON CODE CONCLUÍDO!</h3><p>Parabéns! Você concluiu os ${CHALLENGES.length} desafios de Python.</p></div>` : ''}
    <div class="conquistas-grid">
      ${cards}
    </div>
    <h3>Progresso por nível</h3>
    ${nivelConcluidos.map((n) => `<div class="nivel-chip">${n}</div>`).join('')}
  </section>`;
}

const TOPICOS = [
  { icone: '🖨️', titulo: 'print()', oque: 'Serve para mostrar informações na tela.', exemplo: 'print("Olá!")', resultado: 'Olá!', como: 'Escreva o que você quer mostrar dentro dos parênteses. Texto vai entre aspas.' },
  { icone: '⌨️', titulo: 'input()', oque: 'Serve para receber dados digitados pelo usuário. Sempre devolve texto.', exemplo: 'nome = input()', resultado: 'O usuário digita algo e fica guardado na variável nome.', como: 'Se precisar de número, use int(input()) ou float(input()) para transformar o texto em número.' },
  { icone: '📦', titulo: 'variáveis', oque: 'Caixinhas que guardam valores, como números e textos.', exemplo: 'idade = 17\nprint(idade)', resultado: '17', como: 'Use um nome e o sinal = para guardar um valor. Exemplo: idade = 17.' },
  { icone: '🔤', titulo: 'strings', oque: 'Strings são textos em Python. Sempre ficam entre aspas.', exemplo: 'nome = "Maria"\nprint(nome)', resultado: 'Maria', como: 'string = texto. Use aspas simples ou duplas: "oi" ou \'oi\'.' },
  { icone: '🔢', titulo: 'números', oque: 'Python trabalha com inteiros (int) e decimais (float).', exemplo: 'x = 5\ny = 2.5\nprint(x + y)', resultado: '7.5', como: 'Inteiros não têm vírgula. Decimais usam ponto: 2.5. Você pode fazer contas com eles.' },
  { icone: '➗', titulo: 'operadores', oque: 'Símbolos para fazer contas: + soma, - subtrai, * multiplica, / divide.', exemplo: 'print(2 + 3 * 4)', resultado: '14', como: 'A ordem das contas é: parênteses, multiplicação/divisão, depois soma/subtração. Use parênteses para mudar a ordem.' },
  { icone: '🔀', titulo: 'if', oque: 'Executa um bloco de código somente se a condição for verdadeira.', exemplo: 'if idade >= 18:\n    print("maior")', resultado: 'maior (se idade for 18+)', como: 'Escreva if seguido da condição e dois pontos (:). O código dentro do if deve estar com indentação (4 espaços).' },
  { icone: '↩️', titulo: 'else', oque: 'Executa um bloco quando a condição do if for falsa.', exemplo: 'if nota >= 7:\n    print("aprovado")\nelse:\n    print("reprovado")', resultado: 'aprovado ou reprovado', como: 'O else vem depois do if, sem condição. Ele roda quando o if não é verdadeiro.' },
  { icone: '🔣', titulo: 'elif', oque: 'Permite testar várias condições em sequência (senão se...).', exemplo: 'if n > 0:\n    print("positivo")\nelif n < 0:\n    print("negativo")\nelse:\n    print("zero")', resultado: 'positivo / negativo / zero', como: 'Use elif entre o if e o else para testar mais possibilidades.' },
  { icone: '🔁', titulo: 'for', oque: 'Repete um bloco de código um número definido de vezes.', exemplo: 'for i in range(3):\n    print(i)', resultado: '0\n1\n2', como: 'O for percorre uma sequência. range(n) gera de 0 até n-1.' },
  { icone: '♾️', titulo: 'while', oque: 'Repete enquanto uma condição for verdadeira.', exemplo: 'i = 0\nwhile i < 3:\n    print(i)\n    i = i + 1', resultado: '0\n1\n2', como: 'Cuidado: se a condição nunca virar falsa, o loop roda para sempre. Sempre atualize algo dentro do loop.' },
  { icone: '📋', titulo: 'listas', oque: 'Guardam vários valores juntos, em ordem.', exemplo: 'frutas = ["maçã", "banana"]\nprint(frutas[0])', resultado: 'maçã', como: 'Crie com colchetes [ ]. O primeiro item está na posição 0. Use índice para acessar: frutas[0].' },
  { icone: '🧩', titulo: 'funções', oque: 'Blocos de código que executam uma tarefa e podem ser reutilizados.', exemplo: 'def dobro(x):\n    return x * 2\nprint(dobro(5))', resultado: '10', como: 'Use def nome(parametros): para criar. Use return para devolver o resultado calculado.' },
  { icone: '📐', titulo: 'len()', oque: 'Conta quantos itens existem em uma lista ou quantos caracteres tem um texto.', exemplo: 'print(len("abc"))\nprint(len([1, 2, 3]))', resultado: '3\n3', como: 'Coloque o texto ou a lista dentro dos parênteses: len("python") retorna 6.' },
  { icone: '🔢', titulo: 'range()', oque: 'Gera sequências de números para usar com loops.', exemplo: 'for i in range(1, 6):\n    print(i)', resultado: '1\n2\n3\n4\n5', como: 'range(inicio, fim, passo). O fim não entra na conta. range(1, 6) gera 1 até 5.' },
  { icone: '⚖️', titulo: 'comparação', oque: 'Operadores que comparam valores e devolvem verdadeiro (True) ou falso (False).', exemplo: 'print(5 > 3)\nprint(5 == 5)\nprint(4 != 4)', resultado: 'True\nTrue\nFalse', como: 'São eles: > maior, < menor, >= maior ou igual, <= menor ou igual, == igual, != diferente. Use com if, elif e else.' },
];

function renderAprendizado() {
  return `
  <section class="page aprendizado">
    <h2 class="page-titulo">📚 Aprendizado</h2>
    <p class="page-sub">Consultas rápidas e simples sobre os conceitos usados nos desafios.</p>
    <div class="topicos">
      ${TOPICOS.map(
        (t, i) => `
      <details class="topico" ${i === 0 ? 'open' : ''}>
        <summary><span class="t-icone">${t.icone}</span>${esc(t.titulo)}</summary>
        <div class="topico-conteudo">
          <h4>O que é?</h4>
          <p>${esc(t.oque)}</p>
          <h4>Exemplo</h4>
          <pre class="codigo-exemplo"><code>${esc(t.exemplo)}</code></pre>
          <h4>Como usar?</h4>
          <p>${esc(t.como)}</p>
          ${t.resultado ? `<div class="resultado-exemplo"><span class="tag">Resultado</span>${esc(t.resultado)}</div>` : ''}
        </div>
      </details>`,
      )
      .join('')}
    </div>
  </section>`;
}

function renderConfig() {
  const stats = armazenamento.estatisticas(estado.progresso, CHALLENGES.length);
  return `
  <section class="page config">
    <h2 class="page-titulo">⚙️ Configurações</h2>
    <div class="config-card">
      <h3>📱 Instalar aplicativo</h3>
      <p>Instale o Desafio Python Code na tela inicial do seu celular ou computador para usar em tela cheia.</p>
      <button class="btn btn-principal" data-acao="instalar-pwa" id="btn-instalar">📲 INSTALAR APLICATIVO</button>
    </div>
    <div class="config-card">
      <h3>🌓 Tema</h3>
      <p>Escolha o visual do aplicativo.</p>
      <div class="botao-grupo" id="grupo-tema">
        <button class="btn tema-btn ativo" data-acao="tema" data-tema="claro">☀️ Claro</button>
        <button class="btn tema-btn" data-acao="tema" data-tema="escuro">🌙 Escuro</button>
      </div>
    </div>
    <div class="config-card">
      <h3>♻️ Redefinir progresso</h3>
      <p>Apaga todas as conquistas, pontos e desafios resolvidos.</p>
      <button class="btn btn-perigo" data-acao="resetar-progresso">APAGAR MEU PROGRESSO</button>
    </div>
    <div class="config-card">
      <h3>ℹ️ Sobre</h3>
      <p>🐍 Desafio Python Code — professor virtual de Python.<br>
      ${CHALLENGES.length} desafios · execução segura em Pyodide (WebAssembly) · PWA.<br>
      Progresso atual: ${stats.concluidos}/${CHALLENGES.length} desafios · ${stats.pontuacao} pts.</p>
    </div>
  </section>`;
}

/* ---------------- feedback / feedback de erro ---------------- */

function traduzirErro(erro, desafio) {
  if (erro && erro.kind === 'timeout') {
    return {
      titulo: 'Tempo esgotado',
      causa: 'Seu código ficou demorando demais para terminar. Isso costuma acontecer quando existe um loop que nunca para.',
      como: 'Revise o loop. Pergunte-se: em algum momento a condição fica falsa? No for, confira se o range() tem um fim definido. No while, verifique se algo dentro do loop muda o valor que a condição analisa.',
    };
  }
  if (erro) {
    return {
      titulo: 'Falha na execução',
      causa: 'Aconteceu um problema ao rodar seu código: ' + (erro.message || erro),
      como: detectarSolucaoPadrao(desafio).codigo,
    };
  }
  if (erro === 'Bloqueio') return null;
  return null;
}

function detectarSolucaoPadrao(desafio) {
  return { codigo: desafio.solucao, explicacao: desafio.explicacao, dicas: desafio.dicas };
}

function renderResultadoSucesso(resultado, desafio, stats) {
  const pontos = resultado.pontos;
  const bonus = resultado.avaliacao.pontosBonus;
  return `
  <div class="painel-resultado ok animacao-sucesso">
    <div class="sucesso-icone">${resultado.acertoNaPrimeira ? '🌟' : '✅'}</div>
    <div class="sucesso-titulo">PARABÉNS! Desafio concluído!</div>
    <div class="sucesso-mensagem">Você resolveu o desafio corretamente. Diferentes soluções corretas são aceitas!</div>
    <div class="sucesso-detalhes">
      <div class="sd-item"><strong>🏆 +${pontos} pontos</strong>${resultado.acertoNaPrimeira ? ' <em>(de primeira!)</em>' : ''}</div>
      ${bonus ? `<div class="sd-item"><strong>🎁 +${bonus} bônus</strong> <em>testes extras</em></div>` : ''}
      <div class="sd-item"><span class="tag">Saída produzida</span><code>${esc(resultado.saida)}</code></div>
      <div class="sd-item"><span class="tag">Progresso</span><strong>${stats.concluidos}/${CHALLENGES.length} desafios (${stats.percentual}%)</strong></div>
    </div>
    ${resultado.proximaDesafio ? `<button class="btn btn-principal" data-acao="abrir-desafio" data-id="${resultado.proximaDesafio}">PRÓXIMO DESAFIO →</button>` : `<div class="banner-final pequeno">🏆 DESAFIO PYTHON CODE CONCLUÍDO!</div>`}
  </div>`;
}

function renderDicaBloco(desafio) {
  const primDica = desafio.dicas[0];
  return `
  <div class="painel-resultado erro" id="bloco-erro">
    <div class="erro-titulo">Não foi dessa vez...</div>
    <p>Seu programa ainda não está correto. Quer uma ajudinha?</p>
    <div class="erro-acoes">
      <button class="btn btn-dica" data-acao="ver-dica">💡 DICA</button>
      <button class="btn btn-solucao" data-acao="ver-solucao" style="display:none" data-dica="${esc(primDica)}">📖 VER COMO FAZER</button>
    </div>
    <div class="dica-conteudo" id="dica-conteudo" style="display:none"></div>
  </div>`;
}

function renderDica(data) {
  return `
    <div class="dica-caixa">
      <strong>Dica:</strong> ${esc(data.dica)}
      <button class="btn btn-solucao" data-acao="ver-solucao">📖 VER COMO FAZER</button>
    </div>`;
}

function renderSolucao(desafio) {
  return `
  <div class="solucao-caixa">
    <h4>COMO RESOLVER</h4>
    <pre class="codigo-exemplo"><code>${esc(desafio.solucao)}</code></pre>
    <p>${esc(desafio.explicacao)}</p>
    <p class="aviso-solucao">Lembre-se: esta é apenas uma forma possível de resolver. Sua solução pode ser diferente e ainda assim correta!</p>
  </div>`;
}

function renderErroResultado(desafio, erroInfo, ocorrencia, resultado, stats) {
  const teste = ocorrencia.teste;
  const entrada = (teste.input || []).join(' · ');
  const esperado = Array.isArray(teste.expected) ? teste.expected.join(' / ') : teste.expected;
  const produziu = (ocorrencia.dados.output || '').trim();
  let titulo = 'ERRO!';
  let causa = '';
  let linha = '';

  if (erroInfo && erroInfo.causa) {
    titulo = erroInfo.titulo;
    causa = erroInfo.causa;
    linha = '';
  } else if (!ocorrencia.dados.ok) {
    const tipo = ocorrencia.dados.errorType || '';
    if (tipo === 'SyntaxError') {
      titulo = 'ERRO DE SINTAXE';
      const nLinha = ocorrencia.dados.linha || '?';
      causa = `Parece que existe um problema na estrutura do seu código. Verifique se os parênteses, os dois pontos e as aspas estão corretos. Aproximadamente na linha ${nLinha}.`;
    } else if (tipo === 'EOFError') {
      titulo = 'Faltaram valores';
      causa = 'O programa tentou ler mais valores do que foram fornecidos na entrada. Confira a ordem dos input() e quantos valores você usa.';
    } else if (tipo === 'ZeroDivisionError') {
      titulo = 'Divisão por zero';
      causa = 'Seu código tentou dividir por zero, o que não é permitido. Confira os valores usados na divisão.';
    } else if (tipo === 'NameError') {
      titulo = 'Nome não definido';
      causa = 'O programa usou um nome que ainda não foi criado. Confira se a variável ou função foi criada antes de ser usada, com o nome certo.';
    } else if (tipo === 'TypeError' || tipo === 'ValueError') {
      titulo = 'Conversão de dados';
      causa = 'Parece que você tentou fazer uma conta com texto. Transforme o valor recebido pelo input() em número usando int() ou float() antes de operar.';
    } else if (tipo === 'Bloqueio') {
      titulo = 'Operação não permitida';
      causa = ocorrencia.dados.error || 'Essa operação não é permitida neste desafio.';
    } else {
      titulo = 'ERRO!';
      causa = ocorrencia.dados.error
        ? (ocorrencia.dados.error.split('\n').pop() || 'O programa falhou durante a execução.')
        : 'O programa falhou durante a execução.';
    }
  } else {
    titulo = 'ERRO!';
    const esperadoTxt = typeof esperado === 'string' ? esperado : String(esperado);
    causa = `Seu programa produziu "${produziu || '(nada)'}", mas o resultado esperado era "${esperadoTxt}".`;
  }

  return `
  <div class="painel-resultado erro" id="bloco-erro">
    <div class="erro-titulo">${titulo}</div>
    <div class="erro-sub">${esc(entrada ? `Entrada usada: ${entrada}` : 'Execução sem entrada')}</div>

    <h4>O que aconteceu?</h4>
    <p>${esc(causa)}</p>

    <div class="erro-comparacao">
      <div class="ec-col"><span class="tag">Saída produzida</span><code>${esc(produziu || '(vazia)')}</code></div>
      <div class="ec-col"><span class="tag">Esperado</span><code>${esc(String(esperado))}</code></div>
    </div>

    <div class="erro-acoes">
      <button class="btn btn-dica" data-acao="ver-dica">💡 DICA</button>
      <button class="btn btn-repetir" data-acao="executar">↻ TENTAR DE NOVO</button>
    </div>
    <div class="dica-conteudo" id="dica-conteudo" style="display:none"></div>
  </div>`;
}

/* ---------------- execução ---------------- */

async function executarDesafio(atualDesafio) {
  const tela = document.querySelector('.desafio');
  const codigo = obterCodigo(tela) || '';
  if (estado.executando) return;
  if (!codigo.trim() || codigo.trim() === '# Digite seu código aqui') {
    toast('Escreva seu código antes de executar.', 'erro');
    return;
  }

  estado.executando = true;
  const btn = document.getElementById('btn-executar');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ EXECUTANDO...';
  }

  const areaResultado = document.getElementById('area-resultado');
  if (areaResultado) {
    areaResultado.innerHTML = `<div class="painel-executando"><span class="spinner"></span> Executando seu código...</div>`;
  }

  try {
    const pronto = await carregouPython();
    if (!pronto) throw new Error('python-nao-carregou');

    const testes = atualDesafio.testes || [];
    const todasEntradas = testes.map((t) => t.input || []);

    const resultados = await executarCodigo(codigo, todasEntradas);

    const avaliacao = avaliarExecucao(atualDesafio, resultados);
    const tentativasAntes = estado.progresso.tentativas[atualDesafio.id] || 0;
    const armazenamentoProgresso = armazenamento.registrarTentativa(estado.progresso, atualDesafio.id);

    const primeiroTeste = resultados[0] || { ok: false, output: '' };

    if (avaliacao.correto) {
      const usouDica = !!estado.progresso.dicasUsadas[atualDesafio.id];
      const pontos = calcularPontos(tentativasAntes, usouDica) + avaliacao.pontosBonus;
      await armazenamento.registrarAcerto(estado.progresso, atualDesafio.id, pontos);
      const novoSelo = ativarConquistas();
      if (novoSelo) toast(`Conquista desbloqueada: ${novoSelo}`, 'ok');

      const stats = armazenamento.estatisticas(estado.progresso, CHALLENGES.length);
      const proximaDesafio = atualDesafio.id < CHALLENGES.length ? atualDesafio.id + 1 : null;
      areaResultado.innerHTML = renderResultadoSucesso(
        {
          pontos,
          acertoNaPrimeira: tentativasAntes === 0,
          avaliacao,
          saida: primeiroTeste.ok ? (primeiroTeste.output || '').trim().slice(0, 600) : '',
          proximaDesafio,
        },
        atualDesafio,
        stats,
      );
      atualizarStatusNavegacao();
    } else {
      const informacaoErro = traduzirErro(avaliacao.erroDoPrimeiro ? null : null, atualDesafio);
      const ocorrencia = avaliacao.erroDoPrimeiro || { teste: testes[0], dados: primeiroTeste };
      areaResultado.innerHTML = renderErroResultado(atualDesafio, informacaoErro, ocorrencia, { avaliacao }, armazenamento.estatisticas(estado.progresso, CHALLENGES.length));
    }
  } catch (e) {
    const informacao = traduzirErro(e, atualDesafio);
    if (areaResultado && informacao) {
      areaResultado.innerHTML = `
      <div class="painel-resultado erro">
        <div class="erro-titulo">${informacao.titulo}</div>
        <h4>O que aconteceu?</h4>
        <p>${informacao.causa}</p>
        <div class="dica-caixa">
          <button class="btn btn-solucao" data-acao="ver-solucao">📖 VER COMO FAZER</button>
        </div>
      </div>`;
    } else if (areaResultado) {
      areaResultado.innerHTML = `<div class="painel-resultado erro"><div class="erro-titulo">ERRO!</div><p>${esc(e.message || String(e))}</p></div>`;
    }
  } finally {
    estado.executando = false;
    if (btn) {
      btn.disabled = false;
      btn.textContent = '▶ EXECUTAR CÓDIGO';
    }
  }
}

function ativarConquistas() {
  let novoSelo = null;
  for (const c of ACHIEVEMENTS) {
    if (c.condicao(estado.progresso) && !estado.progresso.conquistas.includes(c.id)) {
      armazenamento.registrarConquista(estado.progresso, c.id);
      novoSelo = c.titulo;
    }
  }
  return novoSelo;
}

function atualizarStatusNavegacao() {
  const selo = document.querySelector('.selo-ok');
  if (selo) selo.remove();
}

/* ---------------- navegação (router) ---------------- */

function rotear() {
  const hash = location.hash || '#/';
  window.scrollTo({ top: 0 });

  if (hash.startsWith('#/desafio/')) {
    const id = parseInt(hash.split('/')[2], 10);
    const desafio = CHALLENGES.find((c) => c.id === id);
    estado.desafioAtual = desafio ? id : 1;
    app.innerHTML = renderDesafio(estado.desafioAtual);
    preencherEditor();
    ligarCarregamentoPython();
    return;
  }

  if (hash === '#/desafios') { app.innerHTML = renderDesafios(); return; }
  if (hash === '#/progresso') { app.innerHTML = renderProgresso(); return; }
  if (hash === '#/conquistas') { app.innerHTML = renderConquistas(); return; }
  if (hash === '#/aprendizado') { app.innerHTML = renderAprendizado(); return; }
  if (hash === '#/config') { app.innerHTML = renderConfig(); marcarTema(); return; }
  if (hash === '#/aleatorio') {
    abrirAleatorio();
    return;
  }
  app.innerHTML = renderHome();
}

function preencherEditor() {
  const tela = document.querySelector('.desafio');
  if (!tela) return;
  criarEditor(tela, armazenamento.codigoSalvo(estado.progresso, estado.desafioAtual) || '# Digite seu código aqui\n');
}

function abrirAleatorio() {
  const escolhido = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  estado.desafioAtual = escolhido.id;
  location.hash = `#/desafio/${escolhido.id}`;
}

function ligarCarregamentoPython() {
  if (estado.carregado || estado.carregando) return;
  estado.carregando = carregarPython()
    .then(() => {
      estado.carregando = null;
      estado.carregado = true;
      const el = document.getElementById('python-loading');
      if (el) el.remove();
    })
    .catch(() => {
      estado.carregando = null;
      estado.carregado = false;
      toast('Falha ao carregar o Python. Verifique sua conexão e recarregue.', 'erro');
    });
  // banner de carregamento na página do desafio
  requestAnimationFrame(() => {
    const ph = document.getElementById('python-loading-placeholder');
    if (ph) {
      ph.style.display = '';
      ph.innerHTML = barraPython();
    }
  });
}

function marcarTema() {
  const tema = localStorage.getItem('desafio-tema') || 'claro';
  document.body.dataset.tema = tema;
}

/* ---------------- eventos ---------------- */

document.addEventListener('click', async (e) => {
  const alvo = e.target.closest('[data-acao]');
  if (!alvo) return;
  const acao = alvo.dataset.acao;

  if (acao === 'navegar') {
    location.hash = alvo.dataset.rota;
    return;
  }
  if (acao === 'abrir-desafio') {
    const id = parseInt(alvo.dataset.id, 10);
    estado.desafioAtual = id;
    location.hash = `#/desafio/${id}`;
    ligarCarregamentoPython();
    return;
  }
  if (acao === 'abrir-aleatorio') {
    abrirAleatorio();
    ligarCarregamentoPython();
    return;
  }
  if (acao === 'executar') {
    const desafio = CHALLENGES.find((c) => c.id === estado.desafioAtual);
    if (desafio) {
      ligarCarregamentoPython();
      await executarDesafio(desafio);
    }
    return;
  }
  if (acao === 'limpar') {
    const tela = document.querySelector('.desafio');
    const ta = tela && tela.querySelector('textarea.code-input');
    if (ta) {
      ta.value = '';
      ta.focus();
      import('./editor.js').then((mod) => mod.atualizarEditor(tela));
    }
    return;
  }
  if (acao === 'resetar') {
    const tela = document.querySelector('.desafio');
    const ta = tela && tela.querySelector('textarea.code-input');
    if (ta) {
      ta.value = '# Digite seu código aqui\n';
      import('./editor.js').then((mod) => mod.atualizarEditor(tela));
    }
    return;
  }
  if (acao === 'ver-dica') {
    const desafio = CHALLENGES.find((c) => c.id === estado.desafioAtual);
    const conteudo = document.getElementById('dica-conteudo');
    const bloco = conteudo ? conteudo.closest('.painel-resultado') : null;
    if (conteudo && desafio) {
      conteudo.style.display = '';
      conteudo.innerHTML = renderDica({ dica: desafio.dicas[0] });
      armazenamento.marcarDicaUsada(estado.progresso, desafio.id);
      estado.dicaVista = true;
      const btnDica = alvo;
      if (btnDica) btnDica.style.display = 'none';
    }
    return;
  }
  if (acao === 'ver-solucao') {
    const desafio = CHALLENGES.find((c) => c.id === estado.desafioAtual);
    const conteudo = document.getElementById('dica-conteudo');
    if (conteudo && desafio) {
      conteudo.innerHTML = renderSolucao(desafio);
      armazenamento.marcarDicaUsada(estado.progresso, desafio.id);
    }
    return;
  }
  if (acao === 'tema') {
    const tema = alvo.dataset.tema;
    document.body.dataset.tema = tema;
    localStorage.setItem('desafio-tema', tema);
    document.querySelectorAll('.tema-btn').forEach((b) => b.classList.toggle('ativo', b === alvo));
    return;
  }
  if (acao === 'resetar-progresso') {
    if (confirm('Tem certeza que deseja apagar todo o seu progresso?')) {
      estado.progresso = armazenamento.zerarProgresso();
      toast('Progresso redefinido.', 'ok');
      rotear();
    }
    return;
  }
  if (acao === 'instalar-pwa') {
    if (deferredPromptInstalacao) {
      deferredPromptInstalacao.prompt();
      await deferredPromptInstalacao.userChoice;
      deferredPromptInstalacao = null;
    } else {
      toast('Use "Adicionar à tela inicial" no menu do navegador para instalar.', 'info');
    }
    return;
  }
});

let deferredPromptInstalacao = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPromptInstalacao = e;
  const btn = document.getElementById('btn-instalar');
  if (btn) btn.classList.add('disponivel');
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const area = document.querySelector('.desafio');
    if (area) {
      e.preventDefault();
      const desafio = CHALLENGES.find((c) => c.id === estado.desafioAtual);
      if (desafio) executarDesafio(desafio);
    }
  }
});

window.addEventListener('hashchange', rotear);

/* ---------------- inicio ---------------- */

function iniciar() {
  marcarTema();
  setTimeout(() => ligarCarregamentoPython(), 600);
  rotear();
}

export function appPrincipal() {
  iniciar();
}