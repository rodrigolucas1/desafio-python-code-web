/* Gerenciador do worker Python (Pyodide/WASM).
   - Código do aluno roda DENTRO de um Web Worker (isolado, sem acesso ao DOM).
   - Timeout mata o worker (proteção contra loops infinitos).
   - Worker é reaproveitado entre execuções; se morrer, um novo é criado.
*/

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v314.0.4/full/';

let workerAtivo = null;
let readyPromise = null;
let carregandoPromise = null;
let pendingResolve = null;
let pendingReject = null;
let pendingTimeout = null;

export function pyodideDisponivel() {
  return !!(readyPromise || carregandoPromise);
}

function criarWorker() {
  const w = new Worker(new URL('./python-worker.mjs', import.meta.url), { type: 'module' });
  w.onmessage = (e) => {
    const { type, id } = e.data || {};
    if (type === 'loaded') {
      workerAtivo = w;
      if (readyPromise) readyPromise.resolve();
    } else if (type === 'result') {
      if (pendingResolve) {
        const r = pendingResolve;
        pendingResolve = null;
        clearTimeout(pendingTimeout);
        r(e.data.payload && e.data.payload.dados ? e.data.payload.dados : []);
      }
    } else if (type === 'error') {
      const msg = e.data.message || 'Erro interno';
      if (pendingReject) {
        const r = pendingReject;
        pendingReject = null;
        clearTimeout(pendingTimeout);
        r(new Error(msg));
      } else if (readyPromise && !workerAtivo) {
        readyPromise.reject(new Error(msg));
      }
    } else if (type === 'detail') {
      window.dispatchEvent(new CustomEvent('py-runner-note', { detail: e.data.message }));
    }
  };
  w.onerror = (ev) => {
    const msg = (ev && ev.message) || 'O Python falhou e foi reiniciado. Tente novamente.';
    if (pendingReject) {
      const r = pendingReject;
      pendingReject = null;
      clearTimeout(pendingTimeout);
      r(new Error(msg));
    } else if (readyPromise && !workerAtivo) {
      readyPromise.reject(new Error(msg));
    }
    workerAtivo = null;
  };
  return w;
}

export function carregarPython() {
  if (readyPromise) return readyPromise.promise;
  if (carregandoPromise) return carregandoPromise;
  carregandoPromise = (async () => {
    const w = criarWorker();
    w.postMessage({ type: 'init', indexURL: PYODIDE_CDN });
    readyPromise = {};
    readyPromise.promise = new Promise((res, rej) => {
      readyPromise.resolve = res;
      readyPromise.reject = rej;
    });
    const prazo = setTimeout(() => {
      if (readyPromise) {
        readyPromise.reject(new Error('timeout-pyodide'));
      }
      matarWorker();
    }, 45000);
    try {
      await readyPromise.promise;
      clearTimeout(prazo);
      return true;
    } catch (e) {
      clearTimeout(prazo);
      matarWorker();
      throw e;
    }
  })();
  return carregandoPromise;
}

function matarWorker() {
  if (workerAtivo) {
    try { workerAtivo.terminate(); } catch (e) { /* ignore */ }
    workerAtivo = null;
  }
  carregandoPromise = null;
  readyPromise = null;
}

/* Executa o código para cada lista de entradas. Retorna array de resultados. */
export async function executarCodigo(code, inputsList, timeoutMs = 7000) {
  if (!workerAtivo) {
    await carregarPython();
  }
  if (!workerAtivo) {
    throw new Error('O Python ainda não terminou de carregar. Aguarde e tente novamente.');
  }
  const atual = workerAtivo;
  return new Promise((resolve, reject) => {
    pendingResolve = resolve;
    pendingReject = reject;
    pendingTimeout = setTimeout(() => {
      pendingResolve = null;
      pendingReject = null;
      // Loop infinito / travamento: destruímos o worker com segurança.
      matarWorker();
      reject(new Error('timeout'));
    }, timeoutMs);
    atual.postMessage({ type: 'run', code, inputs: inputsList });
  }).catch((err) => {
    if (err && err.message === 'timeout') {
      throw Object.assign(new Error('Seu código demorou demais para terminar (tempo esgotado).'), { kind: 'timeout' });
    }
    throw err;
  });
}