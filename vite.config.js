import { defineConfig } from 'vite';

export default defineConfig({
  base: '/desafio-python-code-web/',
  server: {
    port: 5173,
    strictPort: false,
    // Permite acesso externo (túnel público / outro PC na rede) sem bloquear o Host.
    allowedHosts: true,
  },
  worker: {
    format: 'es',
  },
});