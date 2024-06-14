// gatewayService.js
const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const cors = require('cors'); // Импортируем пакет cors
const app = express();
const port = 3000;

const proxy = httpProxy.createProxyServer();

app.use(cors()); // Используем cors для всех маршрутов
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для микросервиса 2
app.get('/chado', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3002' });
});

// Маршрут для микросервиса Perplexity
app.get('/ai', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:4000' });
});

app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`);
});
