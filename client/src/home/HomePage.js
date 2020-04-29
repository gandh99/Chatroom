import React, { useState, useEffect } from 'react'
import './homepage.css'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import { useDispatch } from 'react-redux'
import TabBar from './TabBar'
import ChatsPage from '../chats/ChatsPage'
import FriendsPage from '../friends/FriendsPage'
import AccountPage from '../account/AccountPage'

export default function HomePage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    // For tab bar
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const handleTabChange = (newValue) => {
        setSelectedTabIndex(newValue)
    }

    // Tab content
    const tabContent = [
        <ChatsPage />,
        <FriendsPage />,
        <AccountPage />
    ]

    return (
        <div className={classes.root}>
            <Header />
            <div className={classes.pageArea}>
                {tabContent[selectedTabIndex]}
            </div>
            <div className={classes.footer}>
                <TabBar handleTabChange={handleTabChange} />
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
    }
}))