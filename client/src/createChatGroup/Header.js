import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { history } from '../config/history'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

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
                    </div>
                    <div className={classes.center}>
                        <Typography className={classes.logo} variant="h6" color="inherit">
                            {props.title}
                    </Typography>
                    </div>
                    <div className={classes.right} />
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
    left: {
        flex: 1
    },
    back: {
        cursor: 'pointer',
        float: 'left',
        padding: '0.5rem',
    },
    logo: {
    },
    right: {
        flex: 1
    },
    button: {
        color: theme.palette.primary.contrastText
    }
}))