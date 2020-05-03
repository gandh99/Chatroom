import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import FriendCard from '../friends/FriendCard'
import Header from './Header'
import { getFriendsAction } from '../redux/actions/friendsActions'
import { reauthenticateAction } from '../redux/actions/authenticationActions'

export default function CreateChatGroup() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allFriends = useSelector(state => state.friend.allFriends)

    useEffect(() => {
        dispatch(reauthenticateAction())
        dispatch(getFriendsAction())
    }, [])

    return (
        <div className='root'>
            <Header />
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
                    />
                ))}
            </Grid>
            <Button className={classes.button} variant="contained" color="primary">
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
        width: '100vw'
    }
}))