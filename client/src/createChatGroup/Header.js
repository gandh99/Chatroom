import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'

export default function Header() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography className='logo' variant="h6" color="inherit">
                        Start a New Chat
                    </Typography>
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
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main
    },
    logo: {
    },
    button: {
        color: theme.palette.primary.contrastText
    }
}))