import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

export default function Friends() {
    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className='root'>
            Friends
            <Fab
                className={classes.fab}
                color="secondary"
                aria-label="add"
            // onClick={() => dispatch(showAddDiaryPostModal())}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
    },
    fab: {
        position: 'absolute',
        bottom: '70px',
        right: '20px'
    }
}))