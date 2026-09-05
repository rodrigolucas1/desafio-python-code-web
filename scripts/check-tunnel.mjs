/* Testa o túnel público com um navegador real. */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const URL = process.argv[2];
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const executablePath = existsSync(CHROME) ? CHROME : EDGE;

const browser = await puppeteer.launch({ executablePath, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('pageerror:', e.message));
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
const titulo = await page.title();
const home = await page.evaluate(() => !!document.querySelector('.home'));
const texto = await page.evaluate(() => document.body.innerText.slice(0, 120).replace(/\s+/g, ' '));
console.log('Título:', titulo);
console.log('Home renderizada:', home);
console.log('Página começa com:', texto);

if (home) {
  await page.evaluate(() => { location.hash = '#/desafio/1'; });
  await page.waitForSelector('textarea.code-input', { timeout: 15000 });
  await page.$eval('textarea.code-input', (ta) => {
    ta.value = 'print("Maria")';
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  });
  console.log('hash:', await page.evaluate(() => location.hash));
  await page.click('#btn-executar');
  let painel = '(nada ainda)';
  for (let i = 0; i < 60; i++) {
    painel = await page.$eval('#area-resultado', (el) => el.textContent.trim().slice(0, 60).replace(/\s+/g, ' ')).catch(() => '(sem area)');
    const classe = await page.$eval('.painel-resultado', (el) => el.className).catch(() => '');
    if (classe) { painel = classe + ' | ' + (await page.$eval('.painel-resultado', (el) => el.textContent.slice(0, 100).replace(/\s+/g, ' '))); break; }
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.log('Painel de resultado:', painel);
}
await browser.close();