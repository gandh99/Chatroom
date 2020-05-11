import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Header() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left} />
                    <div className={classes.center}>
                        <Typography className={classes.logo} variant="h6" color="inherit">
                            ChatRoom
                        </Typography>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.logout}>
                            <ExitToAppIcon />
                        </div>
                    </div>
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
        height: '4rem',
        display: 'flex'
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
    },
    logout: {
        cursor: 'pointer',
        float: 'right'
    }
}))