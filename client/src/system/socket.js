import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

socket.on('disconnect', (reason) => {
  socket.open();
  // else the socket will automatically try to reconnect
});

export default socket;
