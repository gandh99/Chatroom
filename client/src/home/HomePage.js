import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import TabBar from './TabBar'
import ChatsPage from '../chats/ChatsPage'
import FriendsPage from '../friends/FriendsPage'
import AccountPage from '../account/AccountPage'
import CustomSnackbar from '../reusableComponents/CustomSnackbar'
import { getFriendsAction } from '../redux/actions/friendsActions'
import { reauthenticateAction } from '../redux/actions/authenticationActions'
import { getChatGroupsAction } from '../redux/actions/chatGroupActions'

export default function HomePage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    // Tab content
    const tabContent = [
        <ChatsPage />,
        <FriendsPage />,
        <AccountPage />
    ]

    useEffect(() => {
        dispatch(reauthenticateAction())
        dispatch(getChatGroupsAction())
        dispatch(getFriendsAction())
    }, [])

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Header />
            </header>
            <section className={classes.content}>
                {tabContent[selectedTabIndex]}
            </section>
            <footer className={classes.footer}>
                <TabBar selectedTabIndex={selectedTabIndex} setSelectedTabIndex={setSelectedTabIndex} />
            </footer>
            <CustomSnackbar />
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
        bottom: '3rem',
        left: 0,
        right: 0,
        overflow: 'auto',
        overflowY: 'scroll',
        scrollbarWidth: 'none', /* Firefox */
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3rem',
        overflow: 'hidden',
    }
}))