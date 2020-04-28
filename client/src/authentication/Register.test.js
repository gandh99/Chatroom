import { shallow } from 'enzyme'
import React from 'react'
import Register from './Register'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn()
}))

describe('Register Component', () => {
    let wrapper
    beforeEach(() => {
        useDispatch.mockClear()
        wrapper = shallow(<Register />)
    })

    it('Should render header', () => {
        const component = wrapper.find('Header')
        expect(component.length).toBe(1)
    })

    it('Should render banner', () => {
        const component = wrapper.find('Banner')
        expect(component.length).toBe(1)
    })

    it('Should render two text fields', () => {
        const component = wrapper.find(TextField)
        expect(component.length).toBe(2)
    })

    it('Should render username text field', () => {
        const component = wrapper.find('#username')
        expect(component.length).toBe(1)
    })

    it('Should render password text field', () => {
        const component = wrapper.find('#password')
        expect(component.length).toBe(1)
    })

    it('Should render submit button', () => {
        const component = wrapper.find(Button)
        expect(component.length).toBe(1)
    })
})