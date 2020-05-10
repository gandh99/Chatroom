import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import store from '../redux/store'
import { isEmptyObject } from '../utils/utils'
import { liveMessageUpdateAction } from '../redux/actions/messageActions';

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

// Listen to live message updates
client.service('message').on('created', message => {
  const currentChatGroup = store.getState().chatGroup.currentChatGroup

  if (!isEmptyObject(currentChatGroup) !== 0 && message.chatgroup === currentChatGroup._id) {
    store.dispatch(liveMessageUpdateAction(message))
  }
})

export default client;