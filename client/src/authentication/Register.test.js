import { shallow } from 'enzyme'
import React from 'react'
import Register from './Register'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import Header from './Header'
import Banner from './Banner'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn()
}))

describe('Register Component', () => {
    describe('Renders', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<Register />)
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
            wrapper = shallow(<Register />)
        })

        // it('Should show error when nothing entered', () => {
        //     wrapper.find(TextField).at(0).simulate('change', {
        //         target: { value: 'username' }
        //     })
        //     wrapper.update()
        //     const submitButton = wrapper.find(Button)
        //     submitButton.simulate('click')
        //     expect(wrapper.find(TextField).at(0).props().error).toBe(true)
        // })

        it('Should set the username value on change event', () => {
            const passwordTextField = wrapper.find(TextField).at(0)
            passwordTextField.simulate('change', {
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
    })
})