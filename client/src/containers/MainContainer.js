import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const MainContainer = ({children,...rest}) => {
    const classes = useStyles()
    return (
        <div className={classes.container} {...rest}>
            {children}
        </div>
    )
}

const useStyles = makeStyles((theme)=>({
    container:{
        minHeight: '100vh'
    }
}))

export default MainContainer
