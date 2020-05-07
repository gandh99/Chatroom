import { shallow } from 'enzyme'
import React from 'react'
import LoginPage from './LoginPage'
import { useDispatch } from 'react-redux'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import Header from './Header'
import Banner from './Banner'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn()
}))

describe('LoginPage Component', () => {
    describe('Renders', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<LoginPage />)
        })

        it('Should render header', () => {
            const component = wrapper.find(Header)
            expect(component.length).toBe(1)
        })

        it('Should render banner', () => {
            const component = wrapper.find(Banner)
            expect(component.length).toBe(1)
        })

        it('Should render custom snackbar', () => {
            const component = wrapper.find(CustomSnackbar)
            expect(component.length).toBe(1)
        })
    })
})