import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import store from '../redux/store'
import { isEmptyObject } from '../utils/utils'
import { liveMessageReceivedAction } from '../redux/actions/messageActions';
import { liveChatGroupCreatedAction, liveUpdateChatGroupLastMessageAction } from '../redux/actions/chatGroupActions';

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

client.service('message').on('created', message => {
  const currentChatGroup = store.getState().chatGroup.currentChatGroup

  // Add the new message to allMessages. Allows messages to be received in real-time.
  if (!isEmptyObject(currentChatGroup) !== 0 && message.chatgroup === currentChatGroup._id) {
    store.dispatch(liveMessageReceivedAction(message))
  }

  // Update the last message of the chat group
  store.dispatch(liveUpdateChatGroupLastMessageAction(message))
})

client.service('chatgroup').on('created', chatGroup => {
  // Add the new chatgroup to allChatGroups
  store.dispatch(liveChatGroupCreatedAction(chatGroup))
})

export default client;