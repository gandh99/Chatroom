import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useDispatch, useSelector } from 'react-redux'
import { leaveChatGroupAction } from '../redux/actions/chatGroupActions'
import { showSnackbarAction } from '../redux/actions/globalNotificationActions'
import { history } from '../config/history'

export default function MessagingMenu() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const currentChatGroup = useSelector(state => state.chatGroup.currentChatGroup)
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const leaveChat = () => {
        if (!currentChatGroup) return
        dispatch(leaveChatGroupAction(
            currentChatGroup,
            () => history.push('/'),
            () => dispatch(showSnackbarAction('Unable to leave chat. Please try again later.', 'error'))
        ))
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