import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Header from './Header'
import { reauthenticateAction } from '../redux/actions/authenticationActions'
import TypingBar from './TypingBar'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import { resetCurrentChatGroupAction, resetNewChatGroupMembersAction } from '../redux/actions/chatGroupActions'
import { getMessagesAction } from '../redux/actions/messageActions'

export default function MessagingPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    const messages = useSelector(state => state.message.allMessages)

    useEffect(() => {
        dispatch(reauthenticateAction())
        return () => {
            // For safety, clear the data of the current chat group/potential new chat group when exiting
            dispatch(resetCurrentChatGroupAction())
            dispatch(resetNewChatGroupMembersAction())
        }
    }, [])

    // Get the messages after the current chat group (if it exists) loads
    useEffect(() => {
        if (Object.entries(currentChatGroup).length === 0) return
        dispatch(getMessagesAction(currentChatGroup))
    }, [currentChatGroup])

    return (
        <div className='root'>
            <Header />
            {/* <Grid
                className={classes.grid}
                container
                spacing={0}
                direction="row"
                justify="flex-start"
                alignItems="center" >
                {allFriends.map(friend => (
                    <FriendCard
                        key={friend._id}
                        friend={friend}
                        selectFriend={() => selectFriend(friend)}
                        unselectFriend={() => unselectFriend(friend)}
                    />
                ))}
            </Grid> */}
            <div className={classes.typingBar}>
                <TypingBar />
            </div>
            <CustomSnackbar />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    grid: {
        paddingBottom: '3rem'
    },
    typingBar: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw'
    }
}))