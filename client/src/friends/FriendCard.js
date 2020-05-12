import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography, Menu, MenuItem } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deleteFriendAction } from '../redux/actions/friendsActions'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'

export default function FriendCard({ friend }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    // Menu
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const deleteFriend = () => {
        dispatch(deleteFriendAction(
            friend,
            () => dispatch(showSnackbarAction('Deleted friend.', 'success')),
            () => dispatch(showSnackbarAction('Unable to delete friend.', 'error')),
        ))
        handleClose()
    }

    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card elevation={0} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.displayPictureArea}>
                        <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                    </div>
                    <div className={classes.userDataArea}>
                        <Typography className={classes.username} variant="h5" component="h2">
                            {friend.username}
                        </Typography>
                        <Typography className={classes.personalMessage} variant="h6" component="h6">
                            {friend.personalMessage}
                        </Typography>
                    </div>
                    <div className={classes.menuArea}>
                        <MoreVertIcon onClick={handleClick} className={classes.moreVertIcon} />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem dense className={classes.menuItem} onClick={deleteFriend}>
                                Delete Friend
                            </MenuItem>
                        </Menu>
                    </div>
                </CardContent>
                <div className={classes.borderBottom} />
            </Card>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        textAlign: 'start',
        position: 'relative',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
    },

    // Display picture
    displayPictureArea: {
        minWidth: '50px',
        maxWidth: '50px',
        marginRight: '15px'
    },
    displayPicture: {
        width: '100%',
    },

    // User data
    username: {
        fontSize: 16,
        margin: '0.2rem 0',
        fontWeight: 'bold'
    },
    personalMessage: {
        fontSize: 12,
        margin: '0 0',
        color: theme.palette.text.hint
    },

    // Menu
    menuArea: {
        marginLeft: 'auto',
        cursor: 'pointer'
    },
    menuItem: {
        fontSize: 12,
    },
    moreVertIcon: {
        color: theme.palette.text.hint,
        fontSize: 20
    },

    // Misc.
    borderBottom: {
        width: '90%',
        margin: '0 auto',
        borderBottom: 'solid 1px lightgray'
    }
}))