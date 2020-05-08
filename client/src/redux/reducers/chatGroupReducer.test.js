import { chatGroup } from '../actionTypes'
import chatGroupReducer from './chatGroupReducer'

const initialState = {
    newChatGroupMembers: [],
    allChatGroups: [],
    currentChatGroup: {}
}

describe('chatGroupReducer', () => {
    it('Should return default state', () => {
        const newState = chatGroupReducer(undefined, {})
        expect(newState).toEqual(initialState)
    })

    it('Should return array of new chat group members for set new chatgroup members', () => {
        const newChatGroupMembers = [
            { _id: 1, username: 'user1' },
            { _id: 2, username: 'user2' },
            { _id: 3, username: 'user3' },
        ]
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.SET_NEW_CHATGROUP_MEMBERS,
            payload: newChatGroupMembers
        })
        expect(newState).toEqual({
            ...initialState,
            newChatGroupMembers
        })
    })

    it('Should return empty newChatGroupMembers for reset new chatgroup members', () => {
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.RESET_NEW_CHATGROUP_MEMBERS,
        })
        expect(newState).toEqual({
            ...initialState,
            newChatGroupMembers: []
        })
    })

    it('Should return current chatGroup and updated allChatGroups for create chatgroup success', () => {
        const newChatGroup = { _id: 1 }
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.CREATE_CHATGROUP_SUCCESS,
            payload: newChatGroup
        })
        expect(newState).toEqual({
            ...initialState,
            currentChatGroup: newChatGroup,
            allChatGroups: [...initialState.allChatGroups, newChatGroup]
        })
    })

    it('Should return empty current chatGroup for create chatgroup fail', () => {
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.CREATE_CHATGROUP_FAIL,
        })
        expect(newState).toEqual({
            ...initialState,
            currentChatGroup: {},
        })
    })

    it('Should return all chat groups for get chatgroup success', () => {
        const allChatGroups = [
            { _id: 1 },
            { _id: 2 },
            { _id: 3 },
        ]
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.GET_CHATGROUPS_SUCCESS,
            payload: allChatGroups
        })
        expect(newState).toEqual({
            ...initialState,
            allChatGroups,
        })
    })

    it('Should return empty allChatGroups for get chatgroup fail', () => {
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.GET_CHATGROUPS_FAIL,
        })
        expect(newState).toEqual({
            ...initialState,
            allChatGroups: []
        })
    })

    it('Should return current chat group for set current chatgroup', () => {
        const currentChatGroup = { _id: 1 }
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.SET_CURRENT_CHATGROUP,
            payload: currentChatGroup
        })
        expect(newState).toEqual({
            ...initialState,
            currentChatGroup,
        })
    })

    it('Should reset current chat group for reset current chatgroup', () => {
        const newState = chatGroupReducer(undefined, {
            type: chatGroup.RESET_CURRENT_CHATGROUP,
        })
        expect(newState).toEqual({
            ...initialState,
            currentChatGroup: {}
        })
    })
})