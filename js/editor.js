/* Editor de código Python: numeração de linhas, destaque de sintaxe,
   autoindentação e suporte a touch/smartphone e teclado. */

const KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def',
  'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global',
  'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'True', 'try', 'while', 'with', 'yield',
]);

const BUILTINS = new Set([
  'print', 'input', 'int', 'float', 'str', 'len', 'range', 'sum', 'max', 'min',
  'abs', 'round', 'list', 'tuple', 'dict', 'set', 'bool', 'type', 'format',
  'enumerate', 'zip', 'sorted', 'reversed', 'map', 'filter', 'input', 'open',
]);

function aplicarDestaqueTriplo(codigo) {
  const linhas = String(codigo).split('\n');
  return linhas.map((linha) => destaqueLinha(linha)).join('\n');
}

function escaparHtml(tex) {
  return String(tex)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function destaqueLinha(linha) {
  if (linha.trim() === '') return '';
  const regex = /(#.*?$)|("""[\s\S]*?"""|'''[\s\S]*?''')|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_]\w*)\b/g;
  let saida = '';
  let ultimo = 0;
  let m;
  while ((m = regex.exec(linha)) !== null) {
    if (m.index > ultimo) {
      saida += escaparHtml(linha.slice(ultimo, m.index));
    }
    const [todo, comentario, doc, string, numero, palavra] = m;
    if (comentario !== undefined) {
      saida += `<span class="tok-com">${escaparHtml(comentario)}</span>`;
    } else if (string !== undefined) {
      saida += `<span class="tok-str">${escaparHtml(string)}</span>`;
    } else if (numero !== undefined) {
      saida += `<span class="tok-num">${escaparHtml(numero)}</span>`;
    } else if (palavra !== undefined) {
      const chave = palavra;
      if (KEYWORDS.has(chave)) {
        saida += `<span class="tok-kw">${escaparHtml(chave)}</span>`;
      } else if (BUILTINS.has(chave)) {
        saida += `<span class="tok-fn">${escaparHtml(chave)}</span>`;
      } else {
        saida += `<span class="tok-pl">${escaparHtml(chave)}</span>`;
      }
    } else {
      saida += escaparHtml(todo);
    }
    ultimo = m.index + todo.length;
  }
  if (ultimo < linha.length) {
    saida += escaparHtml(linha.slice(ultimo));
  }
  return saida;
}

export function atualizarEditor(tela) {
  const textarea = tela.querySelector('textarea.code-input');
  const destaque = tela.querySelector('.code-highlight');
  const numCol = tela.querySelector('.code-lines');
  if (!textarea || !destaque || !numCol) return;
  const valor = textarea.value;
  destaque.innerHTML = aplicarDestaqueTriplo(valor) + '\n';
  const totalLinhas = valor.split('\n').length;
  let numTexto = '';
  for (let i = 1; i <= totalLinhas; i++) {
    numTexto += `<span>${i}</span>`;
  }
  numCol.innerHTML = numTexto + '<span></span>';
  destaque.scrollTop = textarea.scrollTop;
  destaque.scrollLeft = textarea.scrollLeft;
  numCol.scrollTop = textarea.scrollTop;
}

export async function criarEditor(tela, valorInicial) {
  const textarea = tela.querySelector('textarea.code-input');
  const destaque = tela.querySelector('.code-highlight');
  const numCol = tela.querySelector('.code-lines');
  if (!textarea) return;
  textarea.value = valorInicial || '# Digite seu código aqui';
  atualizarEditor(tela);

  textarea.addEventListener('scroll', () => {
    destaque.scrollTop = textarea.scrollTop;
    destaque.scrollLeft = textarea.scrollLeft;
    numCol.scrollTop = textarea.scrollTop;
  });

  textarea.addEventListener('input', () => atualizarEditor(tela));

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const inicio = textarea.selectionStart;
      const fim = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, inicio) + '    ' + textarea.value.slice(fim);
      textarea.selectionStart = textarea.selectionEnd = inicio + 4;
      atualizarEditor(tela);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const inicio = textarea.selectionStart;
      const linha = textarea.value.slice(0, inicio).split('\n').pop();
      const recuo = (linha.match(/^[ \t]*/) || [''])[0];
      let novo = '\n' + recuo;
      if (/:\s*$/.test(linha)) novo += '    ';
      if (linha.trim() === '') novo = '';
      textarea.value = textarea.value.slice(0, inicio) + novo + textarea.value.slice(inicio);
      textarea.selectionStart = textarea.selectionEnd = inicio + novo.length;
      atualizarEditor(tela);
    }
  });

  textarea.addEventListener('focus', () => textarea.parentElement.classList.add('focado'));
  textarea.addEventListener('blur', () => textarea.parentElement.classList.remove('focado'));
}

export function obterCodigo(tela) {
  const textarea = tela.querySelector('textarea.code-input');
  return textarea ? textarea.value : '';
}