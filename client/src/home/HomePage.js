import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import './homepage.css'
import Header from './Header'
import TabBar from './TabBar'
import ChatsPage from '../chats/ChatsPage'
import FriendsPage from '../friends/FriendsPage'
import AccountPage from '../account/AccountPage'
import { getFriendsAction } from '../redux/actions/friendsActions'
import { reauthenticateAction } from '../redux/actions/authenticationActions'

export default function HomePage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(1)

    // Tab content
    const tabContent = [
        <ChatsPage />,
        <FriendsPage />,
        <AccountPage />
    ]

    useEffect(() => {
        dispatch(reauthenticateAction())
        dispatch(getFriendsAction())
    }, [])

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.pageArea}>
                {tabContent[selectedTabIndex]}
            </div>
            <div className={classes.footer}>
                <TabBar selectedTabIndex={selectedTabIndex} setSelectedTabIndex={setSelectedTabIndex} />
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: '100vh'
    },
    pageArea: {
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
}))