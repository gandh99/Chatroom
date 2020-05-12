import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../redux/reducers/index'
import { middleware } from '../redux/store'

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState)
}

export const isEmptyObject = (object) => {
    return Object.keys(object).length !== 0
}