import app from './main';
import 'dotenv/config';
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(port);
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
