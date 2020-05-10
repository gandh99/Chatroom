import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import store from '../redux/store'
import { isEmptyObject } from '../utils/utils'
import { liveMessageReceivedAction } from '../redux/actions/messageActions';
import { liveChatGroupCreatedAction } from '../redux/actions/chatGroupActions';

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

// Add the new message to allMessages. Allows messages to be received in real-time.
client.service('message').on('created', message => {
  const currentChatGroup = store.getState().chatGroup.currentChatGroup

  if (!isEmptyObject(currentChatGroup) !== 0 && message.chatgroup === currentChatGroup._id) {
    store.dispatch(liveMessageReceivedAction(message))
  }
})

// Add the new chatgroup to allChatGroups
client.service('chatgroup').on('created', chatGroup => {
  store.dispatch(liveChatGroupCreatedAction(chatGroup))
})

export default client;