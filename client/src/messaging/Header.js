import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { history } from '../config/history'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import AccountCircle from '../images/account_circle.png'

export default function Header(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        <div onClick={() => history.push('/')} className={classes.back}>
                            <KeyboardBackspaceIcon />
                        </div>
                        <div className={classes.displayPictureArea}>
                            <span className={classes.helper} />
                            <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                        </div>
                        <div className={classes.groupInfoArea}>
                            <Typography className={classes.groupName} color="inherit">
                                Group Name
                            </Typography>
                        </div>
                    </div>
                    {/* <div className={classes.center}>
                        </div> */
                    /* <div className={classes.right} /> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: theme.palette.primary.main
    },
    toolbar: {
        display: 'flex'
    },

    // Helper is needed to vertically align the img in the div
    helper: {
        height: '100%',
        verticalAlign: 'middle',
        display: 'inline-block'
    },

    // Left div
    left: {
        flex: 1,
        display: 'flex',
    },
    back: {
        cursor: 'pointer',
        float: 'left',
        padding: '0.5rem',
    },
    displayPictureArea: {
        width: '2rem',
        marginLeft: '1rem',
    },
    displayPicture: {
        width: '100%',
        verticalAlign: 'middle'
    },
    groupInfoArea: {
        marginLeft: '1rem',
        display: 'flex',
        alignItems: 'center',
        width: '10rem',
    },
    groupName: {
        fontWeight: 'bold'
    },

    // Center div
    center: {
    },

    // Right div
    right: {
        flex: 1,
    },

    button: {
        color: theme.palette.primary.contrastText
    }
}))