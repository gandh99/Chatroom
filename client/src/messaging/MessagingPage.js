import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import Header from './Header'
import { history } from '../config/history'
import { reauthenticateAction } from '../redux/actions/authenticationActions'

export default function CreateChatGroup() {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reauthenticateAction())
    }, [])

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
            <Button
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
        width: '100vw'
    }
}))