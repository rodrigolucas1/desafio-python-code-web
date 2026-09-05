/* Gerador de ícones do Desafio Python Code.
   Renderiza a serpente estilizada (Python) em PNGs de vários tamanhos,
   sem dependências externas (usa zlib do Node para codificar PNG).

   Uso: node scripts/build-icons.mjs
*/

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SAIDA = join(__dirname, '..', 'assets', 'icons');
mkdirSync(SAIDA, { recursive: true });

/* ---------- utilitários PNG ---------- */

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(tipo, dados) {
  const t = Buffer.from(tipo, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(dados.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, dados])));
  return Buffer.concat([len, t, dados, crc]);
}

function encodePNG(largura, altura, rgba) {
  const raw = Buffer.alloc((largura * 4 + 1) * altura);
  for (let y = 0; y < altura; y++) {
    raw[y * (largura * 4 + 1)] = 0;
    rgba.copy(raw, y * (largura * 4 + 1) + 1, y * largura * 4, (y + 1) * largura * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(largura, 0);
  ihdr.writeUInt32BE(altura, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------- geometria ---------- */

// Spline de Catmull-Rom para um contorno suave do "S"
function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

// Pontos de controle da serpente (cabeça no início, cauda no fim)
const CONTROLES = [
  { x: 0.74, y: 0.20 },
  { x: 0.66, y: 0.14 },
  { x: 0.52, y: 0.14 },
  { x: 0.40, y: 0.20 },
  { x: 0.36, y: 0.30 },
  { x: 0.42, y: 0.40 },
  { x: 0.55, y: 0.48 },
  { x: 0.70, y: 0.56 },
  { x: 0.76, y: 0.66 },
  { x: 0.72, y: 0.76 },
  { x: 0.58, y: 0.82 },
  { x: 0.44, y: 0.82 },
  { x: 0.34, y: 0.74 },
];

function amostrarCurva() {
  const pontos = [];
  for (let i = 0; i < CONTROLES.length - 3; i++) {
    const a = CONTROLES[i];
    const b = CONTROLES[i + 1];
    const c = CONTROLES[i + 2];
    const d = CONTROLES[i + 3];
    const passos = 40;
    for (let j = 0; j < passos; j++) {
      pontos.push(catmullRom(a, b, c, d, j / passos));
    }
  }
  return pontos;
}

const CURVA = amostrarCurva();

/* ---------- render ---------- */

function distPontos(px, py) {
  let melhor = Infinity;
  for (const p of CURVA) {
    const dx = px - p.x;
    const dy = py - p.y;
    const d = dx * dx + dy * dy;
    if (d < melhor) melhor = d;
  }
  return Math.sqrt(melhor);
}

const COR_FUNDO_TOPO = [53, 113, 171];
const COR_FUNDO_BASE = [23, 56, 84];
const COR_CORPO = [255, 195, 0];
const COR_CORPO_BASE = [245, 158, 11];
const COR_LINHA = [24, 46, 71];
const COR_OLHO = [255, 255, 255];
const COR_PUPILA = [16, 32, 48];
const COR_LINGUA = [239, 68, 68];

function misturar(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function render(tamanho, maskable) {
  const S = tamanho;
  const px = new Float32Array(S * S * 4);

  // curva em espaço de pixel
  const curvPx = CURVA.map((p) => ({ x: p.x * S, y: p.y * S }));
  const corpo = 0.052 * S;
  const linha = corpo * 0.24;

  function distCurva(xp, yp) {
    let melhor = Infinity;
    for (const p of curvPx) {
      const dx = xp - p.x;
      const dy = yp - p.y;
      const d = dx * dx + dy * dy;
      if (d < melhor) melhor = d;
    }
    return Math.sqrt(melhor);
  }

  // cabeça (no ponto inicial real da curva)
  const cabeca = { x: CONTROLES[0].x * S, y: CONTROLES[0].y * S };
  const raioCabeca = 0.082 * S;
  const dirPonta = (() => {
    const a = { x: CONTROLES[1].x * S, y: CONTROLES[1].y * S };
    const b = cabeca;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const n = Math.hypot(dx, dy) || 1;
    return { x: dx / n, y: dy / n };
  })();
  const nx = -dirPonta.y;
  const ny = dirPonta.x;
  const raioOlho = 0.024 * S;
  const offOlho = 0.04 * S;
  const cxE = cabeca.x + offOlho * 0.3 * dirPonta.x;
  const cyE = cabeca.y + offOlho * 0.3 * dirPonta.y;
  const olho1 = { x: cxE + nx * offOlho, y: cyE + ny * offOlho };
  const olho2 = { x: cxE - nx * offOlho, y: cyE - ny * offOlho };

  // língua
  const linguaIni = { x: cabeca.x + dirPonta.x * raioCabeca, y: cabeca.y + dirPonta.y * raioCabeca };
  const linguaMeio = { x: linguaIni.x + dirPonta.x * 0.045 * S, y: linguaIni.y + dirPonta.y * 0.045 * S };
  const linguaPonta = { x: linguaMeio.x + dirPonta.x * 0.03 * S, y: linguaMeio.y + dirPonta.y * 0.03 * S };
  const raioLingua = 0.011 * S;
  const linguaFork = [
    { x: linguaPonta.x + nx * 0.015 * S, y: linguaPonta.y + ny * 0.015 * S },
    { x: linguaPonta.x - nx * 0.015 * S, y: linguaPonta.y - ny * 0.015 * S },
  ];

  const raioG = 0.2 * S;
  const margem = maskable ? 0 : 0.04 * S;
  const interior = maskable ? 0.92 * S : 0.96 * S;

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const xp = x;
      const yp = y;

      // fundo arredondado
      const cxF = Math.min(Math.max(xp, raioG), S - raioG);
      const cyF = Math.min(Math.max(yp, raioG), S - raioG);
      const dFund = Math.sqrt((xp - cxF) ** 2 + (yp - cyF) ** 2);
      const dentroFundo = dFund <= raioG && xp >= margem && xp <= interior && yp >= margem && yp <= interior;

      if (!dentroFundo) {
        px[i + 3] = 0;
        continue;
      }

      const grad = yp / S;
      const corFundo = misturar(COR_FUNDO_TOPO, COR_FUNDO_BASE, grad);
      let cor = corFundo;

      // corpo da serpente
      const dC = distCurva(xp, yp);
      if (dC <= corpo) {
        const t = Math.min(1, xp / S);
        const corCorpo = misturar(COR_CORPO, COR_CORPO_BASE, t);
        cor = misturar(corCorpo, COR_FUNDO_BASE, Math.max(0, 0.18 - Math.abs(yp / S - 0.5) * 0.3));
        if (dC > corpo * 0.82) {
          cor = misturar(cor, COR_LINHA, (dC - corpo * 0.82) / (corpo * 0.18) * 0.7);
        }
      }

      // cabeça
      const dhC = Math.sqrt((xp - cabeca.x) ** 2 + (yp - cabeca.y) ** 2);
      if (dhC <= raioCabeca) {
        if (dhC > raioCabeca - linha) cor = COR_LINHA;
        else cor = misturar(COR_CORPO, COR_CORPO_BASE, cabeca.x / S);
      }

      // língua
      const dL = segmentoDist(xp, yp, linguaIni, linguaMeio, raioLingua);
      if (dL) cor = COR_LINGUA;
      for (const f of linguaFork) {
        if (segmentoDist(xp, yp, linguaMeio, f, raioLingua)) cor = COR_LINGUA;
      }

      // olhos
      const d1 = Math.sqrt((xp - olho1.x) ** 2 + (yp - olho1.y) ** 2);
      const d2 = Math.sqrt((xp - olho2.x) ** 2 + (yp - olho2.y) ** 2);
      if (d1 <= raioOlho) {
        cor = COR_OLHO;
        if (Math.sqrt((xp - (olho1.x + dirPonta.x * 0.006 * S)) ** 2 + (yp - (olho1.y + dirPonta.y * 0.006 * S)) ** 2) <= raioOlho * 0.55) cor = COR_PUPILA;
      }
      if (d2 <= raioOlho) {
        cor = COR_OLHO;
        if (Math.sqrt((xp - (olho2.x + dirPonta.x * 0.006 * S)) ** 2 + (yp - (olho2.y + dirPonta.y * 0.006 * S)) ** 2) <= raioOlho * 0.55) cor = COR_PUPILA;
      }

      if (dC > corpo + linha) {
        const chevron = desenharChevron(xp, yp, S);
        if (chevron) cor = chevron;
      }

      px[i] = cor[0];
      px[i + 1] = cor[1];
      px[i + 2] = cor[2];
      px[i + 3] = 255;
    }
  }

  const rgba = new Uint8Array(S * S * 4);
  for (let i = 0; i < S * S * 4; i++) {
    rgba[i] = px[i];
  }
  return encodePNG(S, S, Buffer.from(rgba));
}

function desenharChevron(px, py, S) {
  // dois ">>" no canto inferior esquerdo, cor clara translúcida
  const baseX = 0.16 * S;
  const baseY = 0.78 * S;
  const v = 0.028 * S;
  const a = 0.05 * S;
  const dentro1 = linha2d(px, py, baseX - a, baseY, baseX, baseY - a, 0.012 * S);
  const dentro2 = linha2d(px, py, baseX - a, baseY, baseX - v, baseY - a + v, 0.012 * S);
  const dentro3 = linha2d(px, py, baseX - a * 0.55, baseY, baseX - v + a * 0.55, baseY - a + v, 0.012 * S);
  const dentro4 = linha2d(px, py, baseX + v - a, baseY - 2 * v, baseX + v, baseY - a, 0.012 * S);
  if (dentro1 || dentro2 || dentro3 || dentro4) {
    return [150, 190, 235, 200];
  }
  return null;
}

function linha2d(px, py, x1, y1, x2, y2, raio) {
  const d = Math.hypot(x2 - x1, y2 - y1);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (d * d)));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  const dist = Math.hypot(px - cx, py - cy);
  return dist <= raio;
}

function segmentoDist(px, py, a, b, raio, S) {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  if (d <= 0) return null;
  const cx = b.x - a.x;
  const cy = b.y - a.y;
  const ppx = px - a.x;
  const ppy = py - a.y;
  const t = Math.max(0, Math.min(1, (ppx * cx + ppy * cy) / (d * d)));
  const dist = Math.hypot(ppx - t * cx, ppy - t * cy);
  if (dist > raio) return null;
  return true;
}

const tamanhos = [16, 32, 48, 72, 96, 128, 192, 256, 512];
for (const t of tamanhos) {
  const buffer = render(t, false);
  writeFileSync(join(SAIDA, `icon-${t}.png`), buffer);
  console.log('Gerado icon-' + t + '.png');
}
const maskable = render(512, true);
writeFileSync(join(SAIDA, 'icon-maskable-512.png'), maskable);
console.log('Gerado icon-maskable-512.png');
console.log('OK');