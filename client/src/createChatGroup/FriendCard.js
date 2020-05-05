import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'

export default function FriendCard(props) {
    const classes = useStyles()
    const [selected, setSelected] = useState(false)

    const handleCheck = () => {
        selected ? props.unselectFriend() : props.selectFriend()
        setSelected(!selected)
    }

    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card onClick={handleCheck} elevation={0} className={classes.card}>
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
                        {
                            selected
                                ? <CheckBoxIcon className={classes.checkbox} />
                                : <CheckBoxOutlineBlankIcon className={classes.checkboxOutline} />
                        }
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
        cursor: 'pointer'
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
        marginRight: '2rem',
        marginTop: '0.5rem',
    },
    checkboxOutline: {
        color: theme.palette.text.hint
    },
    checkbox: {
        color: theme.palette.secondary.main
    },

    // Misc.
    borderBottom: {
        width: '90%',
        margin: '0 auto',
        borderBottom: 'solid 1px lightgray'
    }
}))