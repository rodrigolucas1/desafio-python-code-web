/* Motor de avaliação do Desafio Python Code.
   Avalia a solução do aluno pelo COMPORTAMENTO (saída produzida),
   aceitando diferentes formas corretas de resolver o problema.
   Funções puras, sem dependência de DOM (testáveis em Node).
*/

function normalizarTexto(t) {
  if (t === null || t === undefined) return '';
  let s = String(t)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return s.toLowerCase().trim();
}

export function rodapeLinhas(saida) {
  return String(saida || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

function extrairNumeros(texto) {
  const resultado = [];
  const re = /-?\d+(?:[.,]\d+)?/g;
  let m;
  while ((m = re.exec(String(texto || ''))) !== null) {
    const bruto = m[0].replace(',', '.');
    resultado.push(parseFloat(bruto));
  }
  return resultado;
}

function palavraPresente(saida, palavra) {
  const alvos = Array.isArray(palavra) ? palavra : [palavra];
  const tokens = String(saida || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9à-ú]/gi)
    .filter((t) => t.length > 0);
  const aceitas = alvos.map(normalizarTexto);
  return tokens.some((t) => aceitas.includes(t));
}

function haPalavra(saida, lista) {
  return lista.some((p) => palavraPresente(saida, p));
}

function numerosIguais(a, b, tolerancia = 0.001) {
  return Math.abs(a - b) <= tolerancia;
}

function dados_do_teste(teste) {
  return {
    ...teste,
    expected: Array.isArray(teste.expected) ? teste.expected : String(teste.expected),
  };
}

/* Avalia a saída de UM teste contra o matcher definido no desafio. */
export function avaliarSaida(teste, saida) {
  const t = dados_do_teste(teste);
  const tipo = t.tipo || 'exato';
  const out = String(saida || '');
  const linhas = rodapeLinhas(out);

  switch (tipo) {
    case 'exato': {
      const esperado = String(t.expected).trim();
      const normalizado = normalizarTexto(out);
      const esperadoNorm = normalizarTexto(esperado);
      if (t.ignoreCase) return normalizado === esperadoNorm;
      return out.trim() === esperado;
    }

    case 'numero': {
      const esperado = parseFloat(t.expected);
      if (Number.isNaN(esperado)) return false;
      return extrairNumeros(out).some((n) => numerosIguais(n, esperado, 0.0001));
    }

    case 'numeroF': {
      const esperado = parseFloat(t.expected);
      if (Number.isNaN(esperado)) return false;
      return extrairNumeros(out).some((n) => numerosIguais(n, esperado, 0.01));
    }

    case 'numeros': {
      const esperados = t.expected.map((x) => parseFloat(x));
      const encontrados = extrairNumeros(out);
      return esperados.every((e) => encontrados.some((n) => numerosIguais(n, e, 0.0001)));
    }

    case 'doisNumeros': {
      const esperados = t.expected.map((x) => parseFloat(x));
      const encontrados = extrairNumeros(out);
      if (esperados.length === 2 && encontrados.length >= 2) {
        const [a, b] = esperados;
        const nums = [...encontrados];
        const ia = nums.findIndex((n) => numerosIguais(n, a, 0.0001));
        if (ia === -1) return false;
        nums.splice(ia, 1);
        return nums.some((n) => numerosIguais(n, b, 0.0001));
      }
      return esperados.every((e) => encontrados.some((n) => numerosIguais(n, e, 0.0001)));
    }

    case 'palavra': {
      return haPalavra(out, t.palavras || [t.expected]);
    }

    case 'texto': {
      if (t.minLen) return normalizarTexto(out).length >= t.minLen;
      return linhas.length > 0;
    }

    case 'contemNome': {
      const nomes = Array.isArray(t.expected) ? t.expected : [t.expected];
      const saidaNorm = normalizarTexto(out);
      const stub = normalizarTexto(out.replace(/\s+/g, ' '));
      return nomes.every((n) => {
        const nomeNorm = normalizarTexto(n);
        return saidaNorm.includes(nomeNorm) || stub.includes(nomeNorm);
      });
    }

    case 'contemMedia': {
      const media = parseFloat(t.expected);
      const nums = extrairNumeros(out);
      const okNumero = nums.some((n) => numerosIguais(n, media, 0.05));
      if (!okNumero) return false;
      if (!t.notaFinal) return true;
      const palavrasSituacao = {
        'Aprovado': ['aprovado'],
        'Recuperação': ['recuperacao'],
        'Recuperacaoo': ['recuperacao'],
        'Reprovado': ['reprovado'],
      };
      const buscar = palavrasSituacao[t.notaFinal] || [t.notaFinal];
      return haPalavra(out, buscar);
    }

    case 'sequencia': {
      const esperada = String(t.expected).trim().split(/\s+/).map((x) => parseInt(x, 10));
      const produzida = extrairNumeros(out).map((n) => Math.trunc(n));
      if (esperada.length !== produzida.length) return false;
      return esperada.every((v, i) => v === produzida[i]);
    }

    case 'tabuada': {
      const tabela = t.expected;
      const linhasOut = rodapeLinhas(out);
      const produtos = {};
      let numBase = null;
      for (const linha of linhasOut) {
        const nums = extrairNumeros(linha);
        if (nums.length < 3) return false;
        const [a, b, p] = nums.map((x) => Math.trunc(x));
        if (a * b !== p) return false;
        if (numBase === null) numBase = a;
        else if (numBase !== a) return false;
        produtos[b] = p;
      }
      if (linhasOut.length < 9) return false;
      for (const linhaTabuada of tabela) {
        const esperadoN = String(linhaTabuada);
        const numerosTabuada = extrairNumeros(esperadoN);
        if (numerosTabuada.length >= 3) {
          const [nbase] = numerosTabuada;
          for (let i = 1; i <= 10; i++) {
            if (produtos[i] === undefined || produtos[i] !== nbase * i) return false;
          }
          return true;
        }
      }
      return false;
    }

    case 'regex': {
      return t.regra ? t.regra.test(out) : false;
    }

    default:
      return out.trim() === String(t.expected).trim();
  }
}

/* Avaliação completa: todos os testes obrigatórios + bônus. */
export function avaliarExecucao(challenge, resultadosPorTeste) {
  const testes = challenge.testes || [];
  const ocorrencias = {};
  const bonus = [];

  testes.forEach((teste, idx) => {
    const dados = resultadosPorTeste[idx] || { ok: false, output: '' };
    const alvo = teste.pontuacaoBonus ? bonus : ocorrencias;
    if (teste.pontuacaoBonus) {
      bonus.push({ teste, dados });
    } else {
      ocorrencias[idx] = { teste, dados };
    }
  });

  const detalhesObrigatorios = Object.entries(ocorrencias).map(([k, v]) => {
    const ok = v.dados.ok && avaliarSaida(v.teste, v.dados.output);
    return { indice: parseInt(k, 10), ok };
  });

  const corretos = detalhesObrigatorios.filter((d) => d.ok).length;
  const obrigatorios = detalhesObrigatorios.length;
  const correto = corretos === obrigatorios && obrigatorios > 0;

  const detalhesBonus = bonus.map(({ teste, dados }) => {
    const ok = dados.ok && avaliarSaida(teste, dados.output);
    return { ok };
  });
  const pontosBonus = detalhesBonus.filter((d) => d.ok).length * 10;

  let erroDoPrimeiro = null;
  for (const { indice, ok } of detalhesObrigatorios) {
    if (!ok) {
      erroDoPrimeiro = {
        indice,
        dados: ocorrencias[indice].dados,
        teste: ocorrencias[indice].teste,
      };
      break;
    }
  }

  return { correto, obrigatorios, corretos, pontosBonus, erroDoPrimeiro, detalhesObrigatorios, detalhesBonus };
}

export function calcularPontos(tentativasAntes, usouDica) {
  let pontosBase = 25;
  if (tentativasAntes === 0) pontosBase = 100;
  else if (tentativasAntes === 1) pontosBase = 75;
  else pontosBase = 50;
  if (usouDica) pontosBase = 25;
  return pontosBase;
}

export { numerosIguais, extrairNumeros };