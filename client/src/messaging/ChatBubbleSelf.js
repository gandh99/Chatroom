import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function ChatBubbleSelf(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {props.message.text}
            </div>
            <div className={classes.tail} />
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    container: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
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
        backgroundColor: theme.palette.primary.main,
        width: '0.5rem',
        height: '0.5rem',
        borderBottomRightRadius: '90%',
        position: 'absolute',
        right: '5px',
        top: '5px'
    }
}))