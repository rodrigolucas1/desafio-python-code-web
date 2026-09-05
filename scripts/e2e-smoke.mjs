/* Teste end-to-end (smoke) com Chrome real + build de produção (vite preview).
   Verifica: render, editor, execução real em Pyodide (worker), pontuação,
   persistência, erro amigável, timeout (loop infinito) e bloqueio em produção.

   Uso: node scripts/e2e-smoke.mjs
*/

import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const PORT = 4180;
const URL_BASE = `http://127.0.0.1:${PORT}`;

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
import { existsSync } from 'node:fs';
const executablePath = existsSync(CHROME) ? CHROME : EDGE;
console.log('Usando:', executablePath);

let falhas = 0;
function ok(cond, nome) {
  console.log((cond ? '  ✓ ' : '  ✗ ') + nome);
  if (!cond) falhas++;
}

async function servidorPreview() {
  const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
  const p = spawn(process.execPath, [viteBin, 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
    cwd: root,
    stdio: 'ignore',
    windowsHide: true,
  });
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      await fetch(URL_BASE + '/');
      return p;
    } catch (e) { /* ainda subindo */ }
  }
  throw new Error('vite preview não subiu');
}

function aguardar(ms) { return new Promise((r) => setTimeout(r, ms)); }

const BROWSER = await (async () => {
  const sv = await servidorPreview();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const errosJs = [];
  page.on('pageerror', (e) => errosJs.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', (ev) => window.__errosCapturados.push(ev.message + ' @ ' + (ev.filename || '')));
    window.addEventListener('unhandledrejection', (ev) => window.__errosCapturados.push('rejeicao: ' + String(ev.reason && ev.reason.message ? ev.reason.message : ev.reason)));
    window.__errosCapturados = [];
  });
  page.on('console', (m) => {
    const txt = m.text();
    if (m.type() === 'error') errosJs.push('console: ' + txt);
  });
  page.on('requestfailed', (r) =>
    errosJs.push('requestfailed: ' + r.url() + ' (' + (r.failure() || {}).errorText + ')'),
  );

  async function aguardarPainel(sel, timeout, nome) {
    try {
      await page.waitForSelector(sel, { timeout });
    } catch (e) {
      const area = await page.$eval('#area-resultado', (el) => el.innerHTML).catch(() => '(sem area-resultado)');
      const cap = await page.evaluate(() => window.__errosCapturados || []).catch(() => []);
      const btns = await page.$$eval('#btn-executar', (els) => els.map((b) => ({ disabled: b.disabled, txt: b.textContent }))).catch(() => []);
      const ta = await page.$eval('textarea.code-input', (el) => el ? 'existe' : 'NÃO existe').catch(() => 'sem textarea');
      const overlay = await page.evaluate(() => !!document.getElementById('python-loading'));
      console.log(`   [DIAG] espera por ${nome} falhou.`);
      console.log('   [DIAG] #area-resultado:', (area || '').slice(0, 400));
      console.log('   [DIAG] textarea:', ta, '| overlay python-loading:', overlay);
      console.log('   [DIAG] btn-executar:', JSON.stringify(btns));
      console.log('   [DIAG] erros capturados na página:', JSON.stringify(cap.slice(0, 6)));
      const paineis = await page.$$eval('.painel-resultado', (els) => els.length).catch(() => 0);
      const rais = await page.$eval('#area-resultado', (el) => ({ id: el.id, tag: el.tagName, filhos: el.children.length, texto: (el.textContent || '').slice(0, 80) })).catch(() => null);
      console.log('   [DIAG] .painel-resultado:', paineis, '| #area-resultado:', JSON.stringify(rais));
      const painelTexto = await page.$eval('.painel-resultado', (el) => el.textContent).catch(() => '');
      console.log('   [DIAG] painel completo:', JSON.stringify(painelTexto));
      await page.screenshot({ path: path.join(__dirname, 'e2e-falha.png'), fullPage: false });
      if (errosJs.length) console.log('   [DIAG] console/network:', errosJs.slice(0, 6).join(' | '));
      throw e;
    }
  }

  const definirCodigo = (codigo) =>
    page.$eval('textarea.code-input', (ta, valor) => {
      ta.value = valor;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }, codigo);

  try {
    console.log('▶ Carga inicial e navegação');
    await page.goto(`${URL_BASE}/`, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('.home', { timeout: 15000 });
    ok(true, 'home renderizada');

    // PWA: manifest presente
    const links = await page.$$eval('link', (ls) => ls.map((l) => l.rel).join(','));
    ok(String(links).includes('manifest'), 'link do manifest presente');

    // PWA: service worker registrado (build de produção)
    const swRegistrado = await page.evaluate(() =>
      navigator.serviceWorker.getRegistrations().then((rs) => rs.length > 0),
    );
    ok(swRegistrado, 'service worker registrado');

    console.log('▶ Desafio 1 (solucao de referencia)');
    await page.evaluate(() => { location.hash = '#/desafio/1'; });
    await page.waitForSelector('.desafio', { timeout: 15000 });
    await definirCodigo(await page.$eval('#app', (el) => el.innerHTML.includes('print') ? '' : 'print("Maria")'));
    const solucao1 = await page.evaluate(() => {
      const app = document.getElementById('app');
      const m = app.innerHTML.match(/<h2[^>]*>(.*?)<\/h2>/s);
      return m ? m[1].replace(/<[^>]+>/g, '') : '?';
    });
    console.log('   Desafio 1:', solucao1);
    await definirCodigo('print("Maria")');
    await page.click('#btn-executar');
    await page.waitForSelector('.painel-resultado.ok', { timeout: 120000 });
    const sucesso1 = await page.$eval('.painel-resultado.ok', (el) => el.textContent);
    ok(sucesso1.includes('PARABÉNS'), 'desafio 1 concluído (painel de sucesso)');
    ok(sucesso1.includes('+100') || sucesso1.includes('+75') || /\+1\d\d/.test(sucesso1), 'pontos mostrados');

    const progresso1 = await page.evaluate(() => JSON.parse(localStorage.getItem('desafio-python-code-progresso-v1')));
    ok(progresso1 && progresso1.resolvidos.includes(1), 'desafio 1 salvo no progresso');
    ok(progresso1.pontuacao >= 75, `pontuação salva (${progresso1.pontuacao})`);

    console.log('▶ Desafio 2 (erro amigável primeiro, depois acerto)');
    await page.evaluate(() => { location.hash = '#/desafio/2'; });
    await page.waitForSelector('.desafio', { timeout: 15000 });
    await definirCodigo('print(1+1)');
    await page.click('#btn-executar');
    await aguardarPainel('.painel-resultado.erro', 120000, 'painel de erro do desafio 2');
    const erro2 = await page.$eval('.painel-resultado.erro', (el) => el.textContent);
    ok(erro2.includes('produziu'), 'desafio 2 mostrou comparação de saída no erro');

    await definirCodigo('print("Olá, mundo!")');
    await page.click('#btn-executar');
    await page.waitForSelector('.painel-resultado.ok', { timeout: 120000 });
    const sucesso2 = await page.$eval('.painel-resultado.ok', (el) => el.textContent);
    ok(sucesso2.includes('PARABÉNS'), 'desafio 2 concluído após retentativa');
    const progresso2 = await page.evaluate(() => JSON.parse(localStorage.getItem('desafio-python-code-progresso-v1')));
    ok(progresso2.resolvidos.includes(2), 'desafio 2 salvo');

    console.log('▶ Bloqueio (import os)');
    await page.evaluate(() => { location.hash = '#/desafio/30'; });
    await page.waitForSelector('.desafio', { timeout: 15000 });
    await definirCodigo('import os\nprint(os.getcwd())');
    await page.click('#btn-executar');
    await aguardarPainel('.painel-resultado.erro', 120000, 'painel de bloqueio');
    const bloqueio = await page.$eval('.painel-resultado.erro', (el) => el.textContent);
    ok(bloqueio.includes('não permitida'), 'import os mostrou mensagem de bloqueio');

    console.log('▶ Loop infinito (timeout)');
    await definirCodigo('while True:\n    pass');
    await page.click('#btn-executar');
    await aguardarPainel('.painel-resultado.erro', 30000, 'painel de timeout');
    const timeoutMsg = await page.$eval('.painel-resultado.erro', (el) => el.textContent);
    ok(timeoutMsg.includes('Tempo esgotado'), 'loop infinito terminou com aviso de tempo esgotado');

    console.log('▶ Navegação para progresso');
    await page.evaluate(() => { location.hash = '#/progresso'; });
    await page.waitForSelector('.mini-card', { timeout: 15000 });
    const pdf = await page.$$eval('.mini-card .mc-valor', (els) => els.map((e) => e.textContent.trim()));
    ok(parseInt(pdf[0], 10) >= 2, `progresso mostra ${pdf[0]} desafios concluídos`);

    console.log('▶ Erros de console da página:');
    if (errosJs.length) {
      console.log('   ' + errosJs.join('\n   '));
      ok(false, 'nenhum erro de console relevante');
    } else {
      ok(true, 'nenhum erro de console');
    }
  } catch (e) {
    console.error('ERRO NO TESTE E2E:', e.message);
    falhas++;
  } finally {
    await browser.close();
    (await sv).kill();
  }
})();

console.log('\n==================================');
console.log(falhas === 0 ? 'E2E: TODOS OS TESTES PASSARAM' : `E2E: ${falhas} FALHAS`);
process.exit(falhas === 0 ? 0 : 1);