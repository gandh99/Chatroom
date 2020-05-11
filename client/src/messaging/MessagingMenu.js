import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function MessagingMenu() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const leaveChat = () => {

    }

    return (
        <>
            <MoreVertIcon onClick={handleClick} className={classes.moreVertIcon} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose} >
                <MenuItem dense className={classes.menuItem} onClick={leaveChat}>
                    Leave chat
                </MenuItem>
            </Menu>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    menuItem: {
        fontSize: 12,
    },
    moreVertIcon: {
        cursor: 'pointer',
        color: theme.palette.primary.contrastText,
        fontSize: 20
    },
}))