import io from 'socket.io-client';

const socket = io('/', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

// socket.on('error', (error) => {
//   console.error('Socket error:', error);
// });

socket.emit('ping');
socket.on('pong', (data) => {
  console.log('Received pong:', data);
});

export default socket;