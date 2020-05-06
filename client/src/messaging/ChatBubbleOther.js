import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function ChatBubbleOther(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {props.message.text}
            </div>
            {props.senderChanged && <div className={classes.tail} />}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    container: {
        backgroundColor: theme.palette.grey[200],
        color: 'black',
        borderRadius: '5px',
        fontSize: 12,
        textAlign: 'left',
        marginTop: '0.3rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '0.5rem',
        maxWidth: '70%',
        borderRadius: '5px',
        fontSize: 12,
        textAlign: 'left',
        marginTop: '0.3rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '0.5rem',
        maxWidth: '70%',
        wordWrap: 'break-word'
    },
    tail: {
        backgroundColor: theme.palette.grey[200],
        width: '0.5rem',
        height: '0.5rem',
        borderBottomLeftRadius: '90%',
        position: 'absolute',
        left: '5px',
        top: '5px'
    }
}))