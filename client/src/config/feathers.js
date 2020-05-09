import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Default URL, used only in development
let socket = io('http://localhost:5000')

if (process.env.NODE_ENV === 'production') {
  socket = io('https://feathers-chatroom.herokuapp.com')
}

// Initial config of the client
const client = feathers();
client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));

export default client;