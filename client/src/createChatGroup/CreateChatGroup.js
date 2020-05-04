import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import FriendCard from './FriendCard'
import Header from './Header'
import { history } from '../config/history'
import { getFriendsAction } from '../redux/actions/friendsActions'
import { reauthenticateAction } from '../redux/actions/authenticationActions'
import { setNewChatgroupMembersAction } from '../redux/actions/chatgroupActions'

export default function CreateChatGroup() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const defaultTitle = 'New Chat'
    const [selectedFriends, setSelectedFriends] = useState([])
    const [title, setTitle] = useState(defaultTitle)
    const allFriends = useSelector(state => state.friend.allFriends)

    useEffect(() => {
        dispatch(reauthenticateAction())
        dispatch(getFriendsAction())
    }, [])

    useEffect(() => {
        if (selectedFriends.length <= 0) {
            setTitle(defaultTitle)
        } else {
            setTitle(`${selectedFriends.length} selected`)
        }
    }, [selectedFriends])

    const selectFriend = (friend) => {
        setSelectedFriends([...selectedFriends, friend])
    }

    const unselectFriend = (friend) => {
        setSelectedFriends(selectedFriends.filter(selectedFriend => selectedFriend._id !== friend._id))
    }

    const onSubmit = () => {
        /* TODO: IMPORTANT: If only 1 person selected, determine if it's a new chat group. 
            If it is, first create the chat group (but only after a message is sent on the MessagingPage).
            Otherwise, redirect to the existing chat group. */

        // If an existing chat group exists, perhaps resetNewChatgroupMembersAction() should be called

        // Temporarily assume it is a new chat group
        dispatch(setNewChatgroupMembersAction(selectedFriends))
        history.push('/messaging')
    }

    return (
        <div className='root'>
            <Header title={title} />
            <Grid
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
            </Grid>
            <Button
                onClick={onSubmit}
                disabled={selectedFriends.length <= 0}
                className={classes.button}
                variant="contained"
                color="primary">
                Start Chat
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    grid: {
        paddingBottom: '3rem'
    },
    button: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        padding: '0.8rem 0'
    }
}))