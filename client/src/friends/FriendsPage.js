import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AddFriendModal from './AddFriendModal'
import { showAddFriendModalAction } from '../redux/actions/modalActions'
import { Grid } from '@material-ui/core'
import FriendCard from './FriendCard'

export default function Friends() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allFriends = useSelector(state => state.friend.allFriends)

    return (
        <div className='root'>
            <AddFriendModal
                show={useSelector(state => state.modal.displayAddFriendModal)}
            />
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
                    />
                ))}
            </Grid>
            <Fab
                className={classes.fab}
                color="secondary"
                aria-label="add"
                onClick={() => dispatch(showAddFriendModalAction())}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    fab: {
        position: 'absolute',
        bottom: '70px',
        right: '20px',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    }
}))