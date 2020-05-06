import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import FriendCard from './FriendCard'
import Header from './Header'
import { history } from '../config/history'
import { getFriendsAction } from '../redux/actions/friendsActions'
import { reauthenticateAction } from '../redux/actions/authenticationActions'
import { setNewChatGroupMembersAction, setChatGroupDataForMessagingAction } from '../redux/actions/chatGroupActions'
import { getPrivateChatGroup } from '../utils/chatGroupProcessor'

export default function CreateChatGroup() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [selectedFriends, setSelectedFriends] = useState([])
    const allFriends = useSelector(state => state.friend.allFriends)

    // Only used to check if a private chatGroup exists
    const self = useSelector(state => state.authentication.userData)
    const allChatGroups = useSelector(state => state.chatGroup.allChatGroups)

    useEffect(() => {
        dispatch(reauthenticateAction())
        dispatch(getFriendsAction())
    }, [])

    const selectFriend = (friend) => {
        setSelectedFriends([...selectedFriends, friend])
    }

    const unselectFriend = (friend) => {
        setSelectedFriends(selectedFriends.filter(selectedFriend => selectedFriend._id !== friend._id))
    }

    const onSubmit = () => {
        const privateChatGroup = getPrivateChatGroup(self, selectedFriends, allChatGroups)

        if (privateChatGroup) {
            // If a private chat group exists, set the current chat group
            dispatch(setChatGroupDataForMessagingAction(privateChatGroup))
        } else {
            // Otherwise, set the new chat group members
            dispatch(setNewChatGroupMembersAction(selectedFriends))
        }

        // Proceed to the messaging page
        history.push('/messaging')
    }

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Header numOfFriends={selectedFriends.length} />
            </header>
            <section className={classes.content}>
                <Grid
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
            </section>
            <footer className={classes.footer}>
                <Button
                    onClick={onSubmit}
                    disabled={selectedFriends.length <= 0}
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Start Chat
                </Button>
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
    },
    button: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        padding: '0.8rem 0'
    }
}))