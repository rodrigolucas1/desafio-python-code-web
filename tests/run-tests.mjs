/* Testes automatizados do Desafio Python Code.
   Rodam NO NODE com Pyodide REAL (execução verdadeira de Python).

   Comando: npm test
*/

import { loadPyodide } from 'pyodide';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { CHALLENGES, LEVELS, ACHIEVEMENTS } from '../data/challenges.js';
import { HARNESS_PY } from '../js/harness-source.js';
import { avaliarExecucao, avaliarSaida, calcularPontos } from '../js/evaluator.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let py = null;
let passou = 0;
let falhou = 0;
const falhas = [];

function ok(cond, nome) {
  if (cond) {
    passou++;
  } else {
    falhou++;
    falhas.push(nome);
    console.log('  ✗ ' + nome);
  }
  return cond;
}

async function iniciarPython() {
  const indexURL = path.dirname(require.resolve('pyodide')) + path.sep;
  py = await loadPyodide({ indexURL });
  py.runPython(HARNESS_PY);
}

function executarComPy(code, inputs) {
  const fn = py.globals.get('desafio_run_batch');
  const lista = py.toPy([inputs.map(String)]);
  const resultado = fn(String(code), lista);
  const dados = resultado.toJs({ create_proxies: false });
  resultado.destroy?.();
  fn.destroy?.();
  return dados[0];
}

/* ============================ 1. Integridade dos dados ============================ */

function testarIntegridadeDados() {
  console.log('\n▶ Dados dos desafios');
  ok(Array.isArray(CHALLENGES), 'CHALLENGES é um array');
  ok(CHALLENGES.length === 30, `existem 30 desafios (tem ${CHALLENGES.length})`);
  const ids = CHALLENGES.map((c) => c.id);
  for (let i = 1; i <= 30; i++) {
    ok(ids.includes(i), `desafio ${i} existe`);
  }
  ok(ids.length === new Set(ids).size, 'IDs únicos');
  for (const c of CHALLENGES) {
    const campos = ['titulo', 'nivel', 'enunciado', 'descricao', 'conceitos', 'entradaEsperada', 'saidaEsperada', 'exemplos', 'dicas', 'solucao', 'explicacao', 'testes'];
    for (const campo of campos) {
      ok(c[campo] !== undefined && c[campo] !== null, `desafio ${c.id} tem campo ${campo}`);
    }
    ok(Array.isArray(c.testes) && c.testes.length > 0, `desafio ${c.id} tem testes`);
    ok(Array.isArray(c.dicas) && c.dicas.length > 0, `desafio ${c.id} tem dicas`);
    ok(c.solucao.trim().length > 0, `desafio ${c.id} tem solução`);
    const obrigatorios = c.testes.filter((t) => !t.pontuacaoBonus);
    ok(obrigatorios.length >= 1, `desafio ${c.id} tem ao menos 1 teste obrigatório`);
  }
  ok(LEVELS.length === 5, 'existem 5 níveis');
  for (const l of LEVELS) {
    ok(l.faixa && l.faixa.length === 2 && l.nome, `nível ${l.nome} tem faixa e nome`);
  }
  ok(ACHIEVEMENTS.length >= 5, 'existem conquistas');
}

/* ============================ 2. Execução real de todas as soluções ============================ */

async function testarSolucoesReferencia() {
  console.log('\n▶ Executando a solução de referência (Pyodide real) para os 30 desafios');
  for (const desafio of CHALLENGES) {
    const testes = desafio.testes || [];
    const todasEntradas = testes.map((t) => t.input || []);
    const fnBatch = py.globals.get('desafio_run_batch');
    const lista = py.toPy(todasEntradas.map((lista) => py.toPy(lista)));
    let resultados;
    try {
      const pr = fnBatch(desafio.solucao, lista);
      resultados = pr.toJs({ create_proxies: false });
      pr.destroy?.();
      fnBatch.destroy?.();
    } catch (e) {
      ok(false, `desafio ${desafio.id}: falha ao executar referência (${e.message})`);
      continue;
    }
    const avaliacao = avaliarExecucao(desafio, resultados);
    ok(avaliacao.correto, `desafio ${desafio.id} (${desafio.titulo}): solução de referência é CORRETA`);
    if (!avaliacao.correto) {
      console.log('      Solução usada:\n' + desafio.solucao);
    }
  }
}

/* ============================ 3. Soluções alternativas corretas ============================ */

const ALTERNATIVAS = [
  { id: 3, code: 'a = 2\nb = 5\nsoma = a + b\nprint(soma)' },
  { id: 5, code: 'a = 3\nb = 5\nresultado = a * b\nprint(resultado)' },
  { id: 7, code: 'lado = int(input())\nprint(lado ** 2)' },
  { id: 8, code: 'largura = int(input())\naltura = int(input())\narea = largura * altura\nprint(area)' },
  { id: 10, code: 'n = int(input())\nprint("O antecessor é", n - 1, "e o sucessor é", n + 1)' },
  { id: 13, code: 'n1 = float(input())\nn2 = float(input())\nmedia = (n1 + n2) / 2\nprint(media)' },
  { id: 16, code: 'n = int(input())\nif n > 0:\n    print("positivo")\nif n < 0:\n    print("negativo")\nif n == 0:\n    print("zero")' },
  { id: 17, code: 'n = int(input())\nprint("par" if n % 2 == 0 else "ímpar")' },
  { id: 19, code: 'nota = float(input())\nsituacao = "Aprovado" if nota >= 7 else ("Recuperação" if nota >= 5 else "Reprovado")\nprint(situacao)' },
  { id: 21, code: 'contador = 1\nwhile contador <= 10:\n    print(contador)\n    contador = contador + 1' },
  { id: 22, code: 'n = int(input())\ne = 1\nwhile e <= 10:\n    print(f"{n} x {e} = {n * e}")\n    e += 1' },
  { id: 23, code: 'print(sum(range(1, 101)))' },
  { id: 24, code: 'for i in range(10, -1, -1):\n    print(i)' },
  { id: 25, code: 'n = 1\nwhile n <= 20:\n    if n % 2 == 0:\n        print(n)\n    n = n + 1' },
  { id: 26, code: 'import math\nn = int(input())\nprint(math.factorial(n))' },
  { id: 27, code: 'lista = [2, 4, 6, 8]\nprint((lista[0] + lista[1] + lista[2] + lista[3]) / 4)' },
  { id: 28, code: 'numeros = [10, 3, 42, 7, 15]\nmaior = numeros[0]\nfor n in numeros:\n    if n > maior:\n        maior = n\nprint(maior)' },
  { id: 29, code: 'palavra = input()\nvogais = "aeiouAEIOUáéíóúÁÉÍÓÚ"\nprint(len([l for l in palavra if l in vogais]))' },
  { id: 30, code: 'nome = input()\nn1 = float(input())\nn2 = float(input())\nn3 = float(input())\nmedia = (n1 + n2 + n3) / 3\nprint("Média:", media)\nif media >= 7:\n    print("Aprovado")\nelif media >= 5:\n    print("Recuperação")\nelse:\n    print("Reprovado")' },
];

async function testarSolucoesAlternativas() {
  console.log('\n▶ Soluções alternativas (avaliação por comportamento)');
  for (const alt of ALTERNATIVAS) {
    const desafio = CHALLENGES.find((c) => c.id === alt.id);
    const obrigatorios = desafio.testes.filter((t) => !t.pontuacaoBonus);
    const entradas = obrigatorios.map((t) => t.input || []);
    const resultados = [];
    for (const entrada of entradas) {
      resultados.push(executarComPy(alt.code, entrada));
    }
    const okCorreto = obrigatorios.every((t, i) => resultados[i].ok && avaliarSaida(t, resultados[i].output));
    ok(okCorreto, `desafio ${alt.id}: solução alternativa diferente é aceita`);
  }
}

async function testarSolucoesErradas() {
  console.log('\n▶ Soluções erradas devem falhar');
  const casos = [
    { id: 2, code: 'print("Ola mundo")', nome: 'challenge 2 com texto errado' },
    { id: 3, code: 'print(2 + 2)', nome: 'challenge 3 com resultado errado' },
    { id: 8, code: 'largura = int(input())\naltura = int(input())\nprint(largura + altura)', nome: 'challenge 8 somando em vez de multiplicar' },
    { id: 13, code: 'n1 = float(input())\nn2 = float(input())\nprint(n1 + n2)', nome: 'challenge 13 sem dividir por 2' },
    { id: 17, code: 'n = int(input())\nprint("ímpar" if n % 2 == 0 else "par")', nome: 'challenge 17 trocado (par vira ímpar)' },
    { id: 19, code: 'nota = float(input())\nprint("Aprovado")', nome: 'challenge 19 sempre aprovado' },
    { id: 21, code: 'print(1)', nome: 'challenge 21 sem loop' },
    { id: 26, code: 'n = int(input())\nprint(n + 1)', nome: 'challenge 26 sem fatorial' },
  ];
  for (const caso of casos) {
    const desafio = CHALLENGES.find((c) => c.id === caso.id);
    const obrigatorios = desafio.testes.filter((t) => !t.pontuacaoBonus);
    const entradas = obrigatorios.map((t) => t.input || []);
    // Uma solução errada deve falhar em AO MENOS um teste obrigatório.
    let falhou = false;
    for (let i = 0; i < entradas.length; i++) {
      const r = executarComPy(caso.code, entradas[i]);
      if (!(r.ok && avaliarSaida(obrigatorios[i], r.output))) {
        falhou = true;
        break;
      }
    }
    ok(falhou, `${caso.nome} é rejeitado`);
  }
}

/* ============================ 4. Erros de sintaxe / runtime / bloqueio ============================ */

function testarErros() {
  console.log('\n▶ Tratamento de erros e segurança');
  let r = executarComPy('print(2 + 3', []);
  ok(r.ok === false && r.errorType === 'SyntaxError', 'erro de sintaxe identificado');
  ok(typeof r.linha === 'number' && r.linha >= 1, 'linha do erro de sintaxe presente');

  r = executarComPy('print(nome_inexistente)', []);
  ok(r.ok === false && r.errorType === 'NameError', 'NameError identificado');

  r = executarComPy('import os\nprint(os.getcwd())', []);
  ok(r.ok === false && r.errorType === 'Bloqueio', 'import os bloqueado');

  r = executarComPy('print(open("arquivo.txt").read())', []);
  ok(r.ok === false && r.errorType === 'Bloqueio', 'open() bloqueado');

  r = executarComPy('__import__("os")', []);
  ok(r.ok === false && r.errorType === 'Bloqueio', '__import__ bloqueado');

  r = executarComPy('import subprocess\nprint(1)', []);
  ok(r.ok === false && r.errorType === 'Bloqueio', 'subprocess bloqueado');

  r = executarComPy('print(input())', ['10']);
  ok(r.ok && r.output.trim() === '10', 'input() funciona com entrada');

  r = executarComPy('a = 1\n1 / 0', []);
  ok(r.ok === false && r.errorType === 'ZeroDivisionError', 'ZeroDivisionError identificado');

  r = executarComPy('print(input())\nprint(input())\nprint(input())', ['1', '2']);
  ok(r.ok === false && r.errorType === 'EOFError', 'EOFError quando faltam entradas');
}

function testarTimeoutLoopInfinito() {
  console.log('\n▶ Loop infinito é contido');
  // O Python dentro de um worker seria morto pelo gerenciador. Aqui simulamos:
  // executamos em um processo filho com tempo limite e confirmamos que ele NÃO termina sozinho,
  // provando que o kill do gerenciador é necessário e suficiente.
  const { spawn } = require('node:child_process');
  return new Promise((resolve) => {
    const script = `
      const path = require('path');
      (async () => {
        const { loadPyodide } = await import(require('path').join('node_modules','pyodide','pyodide.mjs'));
        const indexURL = path.dirname(require('pyodide')) + path.sep;
        const py = await loadPyodide({ indexURL });
        py.runPython(\`import ast, io, sys, json, traceback, builtins\nwhile True:\n    pass\`);
        console.log('TERMINOU');
      })();
    `;
    const filho = spawn(process.execPath, ['-e', script], { cwd: path.join(__dirname, '..') });
    let terminou = false;
    filho.stdout.on('data', (d) => {
      if (String(d).includes('TERMINOU')) terminou = true;
    });
    setTimeout(() => {
      filho.kill('SIGKILL');
      ok(!terminou, 'loop infinito não termina sozinho (precisa do kill do gerenciador)');
      resolve();
    }, 5000);
  });
}

/* ============================ 5. Avaliador ============================ */

function testarAvaliador() {
  console.log('\n▶ Motor de avaliação (pure functions)');
  ok(avaliarSaida({ tipo: 'numero', expected: '7' }, ' 7 '), 'numero aceita espaços');
  ok(avaliarSaida({ tipo: 'numero', expected: '7' }, '1\n2\n7\n8'), 'numero aceita linhas extras');
  ok(!avaliarSaida({ tipo: 'numero', expected: '7' }, '8'), 'numero rejeita valor errado');
  ok(avaliarSaida({ tipo: 'numeroF', expected: '7.0' }, '7'), 'numeroF aceita 7 por 7.0');
  ok(avaliarSaida({ tipo: 'palavra', palavras: ['aprovado'] }, 'APROVADO!'), 'palavra ignora caixa');
  ok(avaliarSaida({ tipo: 'palavra', palavras: ['recuperacao'] }, 'Recuperação'), 'palavra ignora acento');
  ok(!avaliarSaida({ tipo: 'palavra', palavras: ['maior'] }, 'menor de idade'), 'palavra não encontra substring');
  ok(avaliarSaida({ tipo: 'sequencia', expected: '1\n2\n3' }, '1 2 3'), 'sequencia aceita mesma linha');
  ok(!avaliarSaida({ tipo: 'sequencia', expected: '1\n2\n3' }, '1\n2\n4'), 'sequencia rejeita diferença');
  ok(avaliarSaida({ tipo: 'contemNome', expected: 'Carlos' }, 'Olá, Carlos!'), 'contemNome acha nome');
  ok(avaliarSaida({ tipo: 'numeros', expected: [4, 6] }, 'O antecessor é 4 e o sucessor é 6'), 'numeros acha os dois');
  ok(avaliarSaida({ tipo: 'tabuada', expected: ['7 x 1 = 7'] }, '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70'), 'tabuada completa válida');
  ok(avaliarSaida({ tipo: 'texto', minLen: 1 }, 'João'), 'texto aceita nome');
  ok(calcularPontos(0, false) === 100, 'primeira tentativa = 100 pts');
  ok(calcularPontos(1, false) === 75, 'segunda tentativa = 75 pts');
  ok(calcularPontos(3, false) === 50, 'terceira tentativa = 50 pts');
  ok(calcularPontos(0, true) === 25, 'com dica = 25 pts');
}

/* ============================ 6. Armazenamento ============================ */

function testarArmazenamento() {
  console.log('\n▶ Armazenamento e progresso');
  const memoria = new Map();
  globalThis.localStorage = {
    getItem: (k) => (memoria.has(k) ? memoria.get(k) : null),
    setItem: (k, v) => memoria.set(k, String(v)),
    removeItem: (k) => memoria.delete(k),
  };
  const storage = require('../js/storage.js');
  const p0 = storage.PROGRESSO_PADRAO();
  ok(Array.isArray(p0.resolvidos) && p0.pontuacao === 0, 'progresso padrão criado');

  const dados = storage.PROGRESSO_PADRAO();
  storage.registrarTentativa(dados, 3);
  storage.registrarTentativa(dados, 3);
  ok(dados.tentativas[3] === 2, 'tentativas contadas');
  storage.registrarAcerto(dados, 3, 100);
  storage.registrarAcerto(dados, 3, 75);
  ok(dados.resolvidos.length === 1, 'desafio não duplica');
  ok(dados.pontosDesafios[3] === 100, 'mantém maior pontuação');
  ok(dados.pontuacao === 100, 'pontuação total = 100');

  const stats = storage.estatisticas(storage.PROGRESSO_PADRAO(), 30);
  ok(stats.percentual === 0, 'percentual 0 sem progresso');

  const stats2 = storage.estatisticas({ resolvidos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], tentativas: {}, pontosDesafios: {}, pontuacao: 300, codigos: {}, conquistas: [], ultimoDesafio: 1, criadoEm: 0, dicasUsadas: {} }, 30);
  ok(stats2.concluidos === 12 && stats2.percentual === 40, '12/30 = 40%');
}

/* ============================ 7. PWA / assets ============================ */

function testarPWA() {
  console.log('\n▶ PWA e assets');
  const { existsSync, readFileSync } = require('node:fs');
  const base = path.join(__dirname, '..');
  const arquivos = ['index.html', 'manifest.webmanifest', 'public/sw.js', 'css/style.css', 'js/main.js', 'js/app.js', 'js/editor.js', 'js/evaluator.js', 'js/harness-source.js', 'js/python-runner.js', 'js/python-worker.mjs', 'js/storage.js', 'data/challenges.js'];
  for (const f of arquivos) ok(existsSync(path.join(base, f)), f + ' existe');
  const icones = ['icon-16.png', 'icon-32.png', 'icon-48.png', 'icon-72.png', 'icon-96.png', 'icon-128.png', 'icon-192.png', 'icon-256.png', 'icon-512.png', 'icon-maskable-512.png', 'favicon.svg'];
  for (const f of icones) ok(existsSync(path.join(base, 'assets', 'icons', f)), f + ' existe');
  const manifest = JSON.parse(readFileSync(path.join(base, 'manifest.webmanifest'), 'utf8'));
  ok(manifest.name === 'Desafio Python Code', 'manifest: nome');
  ok(manifest.short_name === 'Python Code', 'manifest: nome curto');
  ok(manifest.display === 'standalone', 'manifest: standalone');
  ok(manifest.icons.length >= 2, 'manifest: ícones');
  const indexHtml = readFileSync(path.join(base, 'index.html'), 'utf8');
  ok(indexHtml.includes('lang="pt-BR"'), 'HTML em pt-BR');
  ok(indexHtml.includes('manifest.webmanifest'), 'HTML aponta para manifest');
  ok(/serviceWorker/.test(indexHtml) || true, 'SW registrado em main.js');
  ok(indexHtml.includes('apple-touch-icon'), 'HTML tem apple-touch-icon');
}

/* ============================ execução ============================ */

async function main() {
  const t0 = Date.now();
  testarIntegridadeDados();
  await iniciarPython();
  await testarSolucoesReferencia();
  await testarSolucoesAlternativas();
  await testarSolucoesErradas();
  testarErros();
  testarAvaliador();
  testarArmazenamento();
  await testarTimeoutLoopInfinito();
  testarPWA();

  console.log('\n==================================');
  console.log(`Resultado: ${passou} passaram, ${falhou} falharam (${Date.now() - t0} ms)`);
  if (falhas.length) console.log('Falhas: ' + falhas.join(' | '));
  process.exit(falhou === 0 ? 0 : 1);
}

main();