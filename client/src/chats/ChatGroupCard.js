import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import AccountCircle from '../images/account_circle.png'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../config/history'
import { setCurrentChatGroupAction } from '../redux/actions/chatGroupActions'
import { generateChatGroupTitle, shortenMessage } from '../utils/chatGroup'

export default function ChatGroupCard({ chatGroup }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const ownUser = useSelector(state => state.authentication.userData)
    const [lastMessage, setLastMessage] = useState('')
    const [participants, setParticipants] = useState([])
    const [chatGroupTitle, setChatGroupTitle] = useState('')
    
    // Update the participants, which is used to generate the title of the card
    useEffect(() => {
        setParticipants([...chatGroup.admins, ...chatGroup.members])
    }, [chatGroup])

    // Update the title of the card
    useEffect(() => {
        try {
            const title = generateChatGroupTitle(ownUser, participants)
            setChatGroupTitle(title)
        } catch (error) {
            console.error(error)            
        }
    }, [ownUser, participants])

    // Update the last message received in the chat group
    useEffect(() => {
        try {
            const lastMessageDisplay = shortenMessage(chatGroup.lastMessage.text)
            setLastMessage(lastMessageDisplay)
        } catch (error) {
            console.error(error)
        }
    }, [chatGroup])

    const onClick = () => {
        dispatch(setCurrentChatGroupAction(chatGroup))
        history.push('/messaging')
    }

    return (
        <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card onClick={onClick} elevation={0} className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.displayPictureArea}>
                        <img src={AccountCircle} className={classes.displayPicture} alt='Account Icon' />
                    </div>
                    <div className={classes.userDataArea}>
                        <Typography className={classes.groupname} variant="h5" component="h2">
                            {chatGroupTitle}
                        </Typography>
                        <Typography className={classes.personalMessage} variant="h6" component="h6">
                            {lastMessage}
                        </Typography>
                    </div>
                    <div className={classes.menuArea} />
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

    // ChatGroup data
    groupname: {
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