import React, { useState, useEffect } from 'react'
import './homepage.css'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Header from './Header'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom"
import { PrivateRoute } from '../reusableComponents/PrivateRoute'
import { useDispatch } from 'react-redux'
import TabBar from './TabBar'

export default function HomePage() {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <Router>
            <div className={classes.root}>
                <Header />
                <div className={classes.pageArea}>
                    <Switch>
                        {/* <PrivateRoute path='/diary' component={DiaryPage} />
                        <PrivateRoute path='/friends' component={FriendsPage} />
                        <Redirect from='/' to='/diary' /> */}
                    </Switch>
                </div>
                <div className={classes.footer}>
                    <TabBar />
                </div>
            </div>
        </Router>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    footer :{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
    }
}))