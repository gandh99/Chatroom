import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { history } from '../config/history'
import Fab from '@material-ui/core/Fab'
import ChatIcon from '@material-ui/icons/Chat'

export default function Chats() {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div>
            <Fab
                className={classes.fab}
                color="secondary"
                aria-label="add"
                onClick={() => history.push('/create-chat-group')}
            >
                <ChatIcon />
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
        right: '20px',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    }
}))