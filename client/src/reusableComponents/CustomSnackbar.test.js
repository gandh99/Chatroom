import { shallow } from 'enzyme'
import React from 'react'
import * as redux from 'react-redux'
import CustomSnackbar from './CustomSnackbar'
import { Snackbar } from '@material-ui/core'

jest.mock(`react-redux`, () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}))

describe('CustomSnackbar Component', () => {
    describe('Renders', () => {
        let wrapper

        beforeEach(() => {
            redux.useDispatch.mockClear()
            wrapper = shallow(<CustomSnackbar />)
        })

        it('Should render snackbar', () => {
            const component = wrapper.find(Snackbar)
            expect(component.length).toBe(1)
        })

        it('Should render alert', () => {
            const component = wrapper.find('Alert')
            expect(component.length).toBe(1)
        })
    })

    describe('Snackbar functionality', () => {
        let wrapper
        let spy = jest.spyOn(redux, 'useSelector')

        beforeEach(() => {
            redux.useDispatch.mockClear()
        })

        it('Should show the snackbar', () => {
            spy.mockReturnValue(true)
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find(Snackbar)
            expect(component.props().open).toBe(true)
        })

        it('Should not show the snackbar', () => {
            spy.mockReturnValue(false)
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find(Snackbar)
            expect(component.props().open).toBe(false)
        })
    })

    describe('Alert functionality', () => {
        let wrapper
        let spy = jest.spyOn(redux, 'useSelector')

        beforeEach(() => {
            spy.mockClear()
            redux.useDispatch.mockClear()
        })

        it('Should describe the alert severity', () => {
            spy.mockReturnValue('success')
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find('Alert')
            expect(component.props().severity).toBe('success')
        })

        it('Should describe the alert message', () => {
            spy.mockReturnValue('message')
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find('Alert')
            expect(component.props().severity).toBe('message')
        })
    })
})