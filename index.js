
const express = require('express');
const app = express();
const venom = require('venom-bot');

app.get('/', (req, res) => res.send('Bot está ativo no Render!'));
app.listen(process.env.PORT || 3000, () => console.log('Servidor HTTP ativo.'));

console.log("Bot iniciado. Aguardando conexão com o WhatsApp...");

venom
  .create({
    headless: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    logQR: true,
    useChrome: false
  })
  .then((client) => {
    console.log('Cliente conectado com sucesso!');
    client.onMessage((message) => {
      if (message.body.toLowerCase() === 'ping') {
        client.sendText(message.from, 'pong');
      }
    });
  })
  .catch((erro) => {
    console.error('Erro ao iniciar o bot:', erro);
  });
