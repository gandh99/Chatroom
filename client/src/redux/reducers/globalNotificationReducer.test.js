import { globalNotification } from '../actionTypes'
import globalNotificationReducer from './globalNotificationReducer'

describe('globalNotificationReducer', () => {
    const initialState = {
        snackbar: {
            show: false,
            severity: '',
            message: ''
        }
    }

    it('Should return default state', () => {
        const newState = globalNotificationReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return snackbar for show snackbar', () => {
        const newState = globalNotificationReducer(undefined, {
            type: globalNotification.SHOW_SNACKBAR,
            payload: {
                severity: 'severity',
                message: 'message'
            }
        })
        expect(newState).toEqual({
            snackbar: {
                show: true,
                severity: 'severity',
                message: 'message'
            }
        })
    })

    it('Should return initial state for hide snackbar', () => {
        const newState = globalNotificationReducer(undefined, {
            type: globalNotification.HIDE_SNACKBAR,
            payload: {}
        })
        expect(newState).toEqual(initialState)
    })
})