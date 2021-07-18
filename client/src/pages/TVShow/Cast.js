import React from "react";
import { Paper, Typography } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const Cast = ({ cast }) => {
    const classes = useStyles()
    return (
        <Container className={classes.container}>
            {cast.map((elem) => (
                <Paper className={classes.actor}>
                    <img src={`https://image.tmdb.org/t/p/w185${elem.profile_path}`} alt={elem.name} className={classes.actorImage} />
                    <Typography style={{fontWeight:'900', fontSize:'14px', textAlign:'center'}}>{elem.name} </Typography>
                    <Typography style={{fontSize:'14px', textAlign:'center'}}>{elem.character.split('/')[0].trim()} </Typography>
                </Paper>
            ))}
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        justifyContent :'center',
        overflow:'hidden',
        padding: theme.spacing(0,1),
    },
    actor:{
        backgroundColor:'rgba(0,0,0,0)',
        padding: theme.spacing(1),
        cursor:'pointer',
        borderRadius: '4px',
        transition:'.2s',
        '&:hover': {
            backgroundColor:'rgba(0,0,0,1)',
        },


    },
    actorImage:{
        borderRadius: '4px',
        width:'100%'
    }
}))

export default Cast;
