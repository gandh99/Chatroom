import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AddFriendModal from './AddFriendModal'
import { showAddFriendModalAction, hideAddFriendModalAction } from '../redux/actions/modalActions'

export default function Friends() {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className='root'>
            Friends
            <AddFriendModal
                show={useSelector(state => state.modal.displayAddFriendModal)}
                onHide={() => dispatch(hideAddFriendModalAction())}
            />
            <Fab
                className={classes.fab}
                color="secondary"
                aria-label="add"
                onClick={() => dispatch(showAddFriendModalAction())}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    fab: {
        position: 'absolute',
        bottom: '70px',
        right: '20px'
    }
}))