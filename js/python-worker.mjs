/* Worker Python (módulo ES). Executa o código do aluno dentro do Pyodide.
   - Sem acesso ao DOM.
   - Sem timeout próprio: o thread principal mata este worker se travar.
*/
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.4/full/pyodide.mjs';
import { HARNESS_PY } from './harness-source.js';

let pyodide = null;

async function iniciar(indexURL) {
  try {
    pyodide = await loadPyodide({
      indexURL: indexURL || 'https://cdn.jsdelivr.net/pyodide/v314.0.4/full/',
    });
    pyodide.runPython(HARNESS_PY);
    self.postMessage({ type: 'loaded' });
  } catch (e) {
    self.postMessage({ type: 'error', message: String(e && e.message ? e.message : e) });
  }
}

self.onmessage = async (e) => {
  const { type } = e.data || {};
  if (type === 'init') {
    await iniciar(e.data.indexURL);
    return;
  }
  if (type === 'run') {
    if (!pyodide) {
      await new Promise((r) => setTimeout(r, 50));
    }
    try {
      const { code, inputs } = e.data;
      const fn = pyodide.globals.get('desafio_run_batch');
      const lista = [];
      for (const entradas of inputs || []) {
        const arr = [];
        for (const linha of entradas || []) arr.push(String(linha));
        lista.push(pyodide.toPy(arr));
      }
      const resultado = fn(code, pyodide.toPy(lista));
      const dados = resultado.toJs({ create_proxies: false });
      resultado.destroy?.();
      fn.destroy?.();
      self.postMessage({ type: 'result', payload: { dados } });
    } catch (e) {
      self.postMessage({ type: 'error', message: String(e && e.message ? e.message : e) });
    }
  }
};