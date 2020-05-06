import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { history } from '../config/history'
import Fab from '@material-ui/core/Fab'
import ChatIcon from '@material-ui/icons/Chat'
import { Grid } from '@material-ui/core'
import ChatGroupCard from './ChatGroupCard'

export default function Chats() {
    const classes = useStyles()
    const allChatGroups = useSelector(state => state.chatGroup.allChatGroups)

    return (
        <div>
            <Grid
                className={classes.grid}
                container
                spacing={0}
                direction="row"
                justify="flex-start"
                alignItems="center" >
                {allChatGroups.map(chatGroup => (
                    <ChatGroupCard
                        key={chatGroup._id}
                        chatGroup={chatGroup}
                    />
                ))}
            </Grid>
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
        position: 'fixed',
        bottom: '70px',
        right: '20px',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    }
}))