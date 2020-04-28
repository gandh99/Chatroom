import { error } from '../actionTypes'
import errorReducer from './errorReducer'

describe('errorReducer', () => {
    const initialState = {
        message: {}
    }

    it('Should return default state', () => {
        const newState = errorReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return message for get errors', () => {
        const newState = errorReducer(undefined, {
            type: error.GET_ERRORS,
            payload: {
                message: 'message'
            }
        })
        expect(newState).toEqual({
            message: 'message'
        })
    })

    it('Should return initial state for clear errors', () => {
        const newState = errorReducer(undefined, {
            type: error.CLEAR_ERRORS,
            payload: {}
        })
        expect(newState).toEqual(initialState)
    })
})