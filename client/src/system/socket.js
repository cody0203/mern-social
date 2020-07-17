import openSocket from 'socket.io-client';
import config from '../config/config';

const socket = openSocket(config.server);

socket.on('disconnect', (reason) => {
  console.log('disconnect', reason);
  socket.connect();
  // else the socket will automatically try to reconnect
});

export default socket;
