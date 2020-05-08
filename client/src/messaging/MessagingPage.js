import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import { reauthenticateAction } from '../redux/actions/authenticationActions'
import TypingBar from './TypingBar'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import { resetCurrentChatGroupAction, resetNewChatGroupMembersAction } from '../redux/actions/chatGroupActions'
import { getMessagesAction, clearMessagesAction } from '../redux/actions/messageActions'
import MessageDisplayArea from './MessageDisplayArea'
import { useChatGroupExists } from '../utils/chatGroup'

export default function MessagingPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const chatGroupExists = useChatGroupExists()
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    const allMessages = useSelector(state => state.message.allMessages)

    useEffect(() => {
        dispatch(reauthenticateAction())
        return () => {
            // Clear chat group and messages data when exiting
            dispatch(resetCurrentChatGroupAction())
            dispatch(resetNewChatGroupMembersAction())
            dispatch(clearMessagesAction())
        }
    }, [])

    // Get the messages after the current chat group (if it exists) loads
    // No dependency, otherwise when sending a new message in a new chatgroup, the message will appear twice
    useEffect(() => {
        if (!chatGroupExists) return
        dispatch(getMessagesAction(currentChatGroup))
    }, [])  

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Header />
            </header>
            <section className={classes.content}>
                <MessageDisplayArea allMessages={allMessages} />
                <CustomSnackbar />
            </section>
            <footer className={classes.footer}>
                <TypingBar />
            </footer>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4rem',
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        top: '4rem',
        bottom: '3.5rem',
        left: 0,
        right: 0,
        overflow: 'auto',
        borderBottom: 'solid 5px transparent',
        overflowY: 'scroll',
        scrollbarWidth: 'none', /* Firefox */
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3.5rem',
        overflow: 'hidden',
    }
}))