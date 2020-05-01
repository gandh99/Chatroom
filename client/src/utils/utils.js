import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../redux/reducers/index'
import { middleware } from '../redux/store'

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState)
}

export function stringLengthIsValid(string, minLength, maxLength) {
    return string.length >= minLength &&
        string.length <= maxLength
}

export function stringCharactersAreValid(string, validPattern) {
    return string.match(validPattern)
}

export function stringHasNoTrailingWhitespaces(string) {
    return string.charAt(0) !== ' ' &&
        string.charAt(string.length - 1) !== ' '
}