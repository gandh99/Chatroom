import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ForumIcon from '@material-ui/icons/Forum';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import PersonPinIcon from '@material-ui/icons/PersonPin';

export default function TabBar(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handleTabChange(newValue)
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="none"
                textColor="primary"
                aria-label="icon tabs example"
            >
                <Tab icon={<ForumIcon />} aria-label="chats" />
                <Tab icon={<PeopleIcon />} aria-label="friends" />
                <Tab icon={<PersonPinIcon />} aria-label="person" />
            </Tabs>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        backgroundColor: theme.palette.grey[100]
    }
}))