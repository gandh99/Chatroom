import { shallow } from 'enzyme'
import React from 'react'
import AuthenticationForm from './AuthenticationForm'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn()
}))

describe('AuthenticationForm Component', () => {
    describe('Renders', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<AuthenticationForm />)
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

    describe('Functionality', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<AuthenticationForm />)
        })

        it('Should set the username value on change event', () => {
            const usernameTextField = wrapper.find(TextField).at(0)
            usernameTextField.simulate('change', {
                target: {
                    value: 'username',
                },
            })
            expect(wrapper.find(TextField).at(0).props().value).toBe('username')
        })

        it('Should set the password value on change event', () => {
            const passwordTextField = wrapper.find(TextField).at(1)
            passwordTextField.simulate('change', {
                target: {
                    value: 'password',
                },
            })
            expect(wrapper.find(TextField).at(1).props().value).toBe('password')
        })

        it('Should respond to button click event', () => {
        })
    })
})