import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography, Button } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function FriendCard(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const unfriendUser = () => {
        // dispatch(unfriendAction(
        //     props.friend,
        //     // successCallback
        //     () => {
        //         props.displaySnackbar('Unfriended user', 'success')
        //     }
        // ))
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
                            {props.friend.username}
                        </Typography>
                        <Typography className={classes.personalMessage} variant="h6" component="h6">
                            {props.friend.personalMessage}
                        </Typography>
                    </div>
                    <div className={classes.menuArea}>
                        <MoreVertIcon className={classes.moreVertIcon} />
                    </div>
                </CardContent>
                <div className={classes.borderBottom} />
            </Card>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    card: {
        textAlign: 'start',
        position: 'relative',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    displayPictureArea: {
        minWidth: '50px',
        maxWidth: '50px',
        marginRight: '15px'
    },
    displayPicture: {
        width: '100%',
    },
    username: {
        fontSize: 16,
        margin: '0.2rem 0'
    },
    personalMessage: {
        fontSize: 12,
        margin: '0 0',
        color: theme.palette.text.hint
    },
    menuArea: {
        marginLeft: 'auto',
        cursor: 'pointer'
    },
    moreVertIcon: {
        color: theme.palette.text.hint,
        fontSize: 20
    },
    borderBottom: {
        width: '90%',
        margin: '0 auto',
        borderBottom: 'solid 1px lightgray'
    }
}))