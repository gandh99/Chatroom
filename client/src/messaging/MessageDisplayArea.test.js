import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import { useDispatch } from 'react-redux'
import MessageDisplayArea from './MessageDisplayArea'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

const spy = jest.spyOn(redux, 'useSelector')

describe('MessageDisplayArea Component', () => {
    describe('Renders', () => {
        let wrapper
        const ownUser = {}

        beforeEach(() => {
            spy.mockReturnValue(ownUser)
            useDispatch.mockClear()
            wrapper = shallow(<MessageDisplayArea />)
        })

        it('Should render', () => {
            expect(wrapper.length).toBe(1)
        })
    })
})