export const authentication = {
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    REAUTHENTICATE_SUCCESS: 'REAUTHENTICATE_SUCCESS',
    REAUTHENTICATE_FAIL: 'REAUTHENTICATE_FAIL',
}

export const friends = {
    GET_FRIENDS_SUCCESS: 'GET_FRIENDS_SUCCESS',
    GET_FRIENDS_FAIL: 'GET_FRIENDS_FAIL',
    ADD_FRIEND_SUCCESS: 'ADD_FRIEND_SUCCESS',
    ADD_FRIEND_FAIL: 'ADD_FRIEND_FAIL',
    DELETE_FRIEND_SUCCESS: 'DELETE_FRIEND_SUCCESS',
    DELETE_FRIEND_FAIL: 'DELETE_FRIEND_FAIL',
}

export const chatGroup = {
    SET_NEW_CHATGROUP_MEMBERS: 'SET_NEW_CHATGROUP_MEMBERS',
    RESET_NEW_CHATGROUP_MEMBERS: 'RESET_NEW_CHATGROUP_MEMBERS',
    GET_CHATGROUPS_SUCCESS: 'GET_CHATGROUPS_SUCCESS',
    GET_CHATGROUPS_FAIL: 'GET_CHATGROUPS_FAIL',
    CREATE_CHATGROUP_SUCCESS: 'CREATE_CHATGROUP_SUCCESS',
    CREATE_CHATGROUP_FAIL: 'CREATE_CHATGROUP_FAIL',
}

export const message = {
    GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',
    GET_MESSAGES_FAIL: 'GET_MESSAGES_FAIL',
    SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAIL: 'SEND_MESSAGE_FAIL',
}

export const error = {
    GET_ERRORS: 'GET_ERRORS',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
}

export const globalNotification = {
    SHOW_SNACKBAR: 'SHOW_SNACKBAR',
    HIDE_SNACKBAR: 'HIDE_SNACKBAR',
}

export const modal = {
    SHOW_ADD_FRIEND_MODAL: 'SHOW_ADD_FRIEND_MODAL',
    HIDE_ADD_FRIEND_MODAL: 'HIDE_ADD_FRIEND_MODAL',
}