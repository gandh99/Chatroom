import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function ChatBubbleOther(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {props.message.text}
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    container: {
        backgroundColor: theme.palette.grey[200],
        opacity: 0.8,
        color: 'black',
        borderRadius: '5px',
        fontSize: 12,
        textAlign: 'left',
        marginTop: '0.3rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        padding: '0.5rem',
        maxWidth: '70%',
    },
}))