import io from 'socket.io-client';
import feathers from '@feathersjs/client';

let socket

if (process.env.NODE_ENV === 'development') {
  socket = io('http://localhost:5000');
} else if (process.env.NODE_ENV === 'production') {
  socket = io('https://feathers-chatroom.herokuapp.com')
}

const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;