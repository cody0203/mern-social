import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

socket.on('disconnect', (reason) => {
  console.log('disconnect', reason);
  socket.connect();
  // else the socket will automatically try to reconnect
});

export default socket;
