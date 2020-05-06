import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

export default function Header() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.logo} variant="h6" color="inherit">
                        ChatRoom
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
    toolbar: {
        height: '4rem'
    }
}))