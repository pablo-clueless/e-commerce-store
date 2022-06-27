import { makeStyles } from '@material-ui/core/styles'

export default  makeStyles(() => ({
    root: {
        maxWidth: '100%',
        transition: '0.5s all ease'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        overflow: 'hidden',
        transition: '0.5s all ease' ,
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))
