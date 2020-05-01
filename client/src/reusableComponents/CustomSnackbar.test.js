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

    describe('Show modal functionality', () => {
        let wrapper
        let spy = jest.spyOn(redux, 'useSelector')

        beforeEach(() => {
            redux.useDispatch.mockClear()
        })

        it('Should show the modal', () => {
            spy.mockReturnValue(true)
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find(Snackbar)
            expect(component.props().open).toBe(true)
        })

        it('Should not show the modal', () => {
            spy.mockReturnValue(false)
            wrapper = shallow(<CustomSnackbar />)
            const component = wrapper.find(Snackbar)
            expect(component.props().open).toBe(false)
        })
    })
})