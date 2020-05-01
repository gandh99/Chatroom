import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch } from 'react-redux'
import AddFriendModal from './AddFriendModal'
import { Modal, Button, Form } from 'react-bootstrap'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn()
}))

describe('AddFriendModal Component', () => {
    describe('Renders', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<AddFriendModal />)
        })

        it('Should render modal', () => {
            const component = wrapper.find(Modal)
            expect(component.length).toBe(1)
        })

        it('Should render modal header', () => {
            const component = wrapper.find(Modal.Header)
            expect(component.length).toBe(1)
        })

        it('Should render modal title', () => {
            const component = wrapper.find(Modal.Title)
            expect(component.length).toBe(1)
        })

        it('Should render form', () => {
            const component = wrapper.find(Form)
            expect(component.length).toBe(1)
        })

        it('Should render form group', () => {
            const component = wrapper.find(Form.Group)
            expect(component.length).toBe(1)
        })

        it('Should render form control', () => {
            const component = wrapper.find(Form.Control)
            expect(component.length).toBe(1)
        })

        it('Should render modal body', () => {
            const component = wrapper.find(Modal.Body)
            expect(component.length).toBe(1)
        })

        it('Should render modal footer', () => {
            const component = wrapper.find(Modal.Footer)
            expect(component.length).toBe(1)
        })
        it('Should render button', () => {
            const component = wrapper.find(Button)
            expect(component.length).toBe(1)
        })
    })

    describe('Displays correct content', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<AddFriendModal />)
        })

        it('Should display title in modal title', () => {
            const component = wrapper.find(Modal.Title)
            expect(component.props().children).toBe('Add Friend')
        })

        it('Should display button texr in button', () => {
            const component = wrapper.find(Button)
            expect(component.props().children).toBe('Add Friend')
        })
    })

    describe('Functionality', () => {
        let wrapper
        beforeEach(() => {
            useDispatch.mockClear()
            wrapper = shallow(<AddFriendModal />)
        })

        it('Should set the username value on change event', () => {
            const usernameTextField = wrapper.find(Form.Control)
            usernameTextField.simulate('change', {
                target: {
                    value: 'username',
                },
            })
            expect(wrapper.find(Form.Control).props().value).toBe('username')
        })
    })
})