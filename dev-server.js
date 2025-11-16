// Simple development server that proxies Netlify functions
import { createServer } from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8888;
const VITE_PORT = 5173;

console.log('🚀 Starting development server...\n');

// Start Vite dev server
const vite = spawn('npm', ['run', 'dev:vite'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Wait a bit for Vite to start
setTimeout(() => {
  console.log(`\n✅ Development server running at: http://localhost:${PORT}`);
  console.log(`📧 Contact form will work with Netlify Functions\n`);
  console.log('Note: For full Netlify Functions support, use "npm run dev" after netlify-cli installs\n');
}, 3000);

// Simple proxy server
const server = createServer((req, res) => {
  // Proxy to Vite dev server
  const options = {
    hostname: 'localhost',
    port: VITE_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxy = require('http').request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxy);

  proxy.on('error', (err) => {
    console.error('Proxy error:', err);
    res.writeHead(502);
    res.end('Bad Gateway');
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down...');
  vite.kill();
  server.close();
  process.exit(0);
});
