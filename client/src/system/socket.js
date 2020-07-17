import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    console.log(reason);
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});

export default socket;
