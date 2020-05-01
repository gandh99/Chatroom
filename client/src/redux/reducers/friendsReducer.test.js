import { friends } from '../actionTypes'
import friendsReducer from './friendsReducer'

const initialState = {
    allFriends: [],
    addedFriend: {},
    deletedFriend: {}
}

describe('friendsReducer', () => {
    it('Should return default state', () => {
        const newState = friendsReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return allFriends for get friend success', () => {
        const allFriends = [
            {
                _id: 1,
                username: 'user1'
            },
            {
                _id: 2,
                username: 'user2'
            },
            {
                _id: 3,
                username: 'user3'
            },
        ]
        const newState = friendsReducer(undefined, {
            type: friends.GET_FRIENDS_SUCCESS,
            payload: allFriends
        })
        expect(newState).toEqual({
            ...initialState,
            allFriends
        })
    })

    it('Should return empty allFriends for get friend fail', () => {
        const newState = friendsReducer(undefined, {
            type: friends.GET_FRIENDS_FAIL,
        })
        expect(newState).toEqual(initialState)
    })

    it('Should return addedFriend and modified allFriends for add friend success', () => {
        const addedFriend = {
            _id: 1,
            username: 'user1'
        }
        const newState = friendsReducer(undefined, {
            type: friends.ADD_FRIEND_SUCCESS,
            payload: addedFriend
        })
        expect(newState).toEqual({
            ...initialState,
            addedFriend,
            allFriends: [...initialState.allFriends, addedFriend]
        })
    })

    it('Should return empty addedFriend for add friend fail', () => {
        const newState = friendsReducer(undefined, {
            type: friends.ADD_FRIEND_FAIL,
        })
        expect(newState).toEqual({
            ...initialState,
            addedFriend: {}
        })
    })

    it('Should return deletedFriend and modified allFriends for delete friend success', () => {
        const deletedFriend = {
            _id: 1,
            username: 'user1'
        }
        const newState = friendsReducer(undefined, {
            type: friends.DELETE_FRIEND_SUCCESS,
            payload: deletedFriend
        })
        expect(newState).toEqual({
            ...initialState,
            deletedFriend,
            allFriends: initialState.allFriends.filter(friend => friend._id !== deletedFriend._id)
        })
    })

    it('Should return empty addedFriend for add friend fail', () => {
        const newState = friendsReducer(undefined, {
            type: friends.DELETE_FRIEND_FAIL,
        })
        expect(newState).toEqual({
            ...initialState,
            deletedFriend: {}
        })
    })    
})