import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Button, Form } from 'react-bootstrap'
import { hideAddFriendModalAction } from '../redux/actions/modalActions'
import { addFriendAction } from '../redux/actions/friendsActions'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'

export default function AddFriendModal(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()

        // Validate input
        if (!inputIsValid()) {
            return
        }

        dispatch(addFriendAction(
            username,
            () => dispatch(showSnackbarAction('Successfully added friend.', 'success')),
            (errorMessage) => dispatch(showSnackbarAction(errorMessage, 'error')),
        ))
        onHide()
    }

    const onHide = () => {
        dispatch(hideAddFriendModalAction())
    }

    const inputIsValid = () => {
        return username.length > 0 && username.length <= 10
    }

    return (
        <Modal
            {...props}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header className='modal-header'>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title'>
                    {'Add Friend'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body className='modal-body'>
                    <Form.Group controlId={'username'}>
                        <Form.Control
                            className='form-text-input'
                            type="text"
                            placeholder='Enter username'
                            onChange={(e) => { setUsername(e.target.value) }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button type='submit' className={classes.button}>
                        Add Friend
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.main
    }
}))