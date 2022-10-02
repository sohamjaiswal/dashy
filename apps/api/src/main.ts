import * as express from 'express';
import { Message } from '@dashy/api-interfaces';
import { BOT_TOKEN } from '../../../libs/secrets/src/lib/secrets';

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/token', (_, res) => {
  res.send(BOT_TOKEN)
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
