import { modal } from '../actionTypes'
import modalReducer from './modalReducer'

describe('modalReducer', () => {
    const initialState = {
        displayAddFriendModal: false
    }

    it('Should return default state', () => {
        const newState = modalReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should show add friend modal', () => {
        const newState = modalReducer(undefined, {
            type: modal.SHOW_ADD_FRIEND_MODAL,
        })
        expect(newState).toEqual({
            displayAddFriendModal: true
        })
    })

    it('Should hide add friend modal', () => {
        const newState = modalReducer(undefined, {
            type: modal.HIDE_ADD_FRIEND_MODAL,
        })
        expect(newState).toEqual({
            displayAddFriendModal: false
        })
    })
})