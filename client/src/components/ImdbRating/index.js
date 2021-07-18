import React from 'react'
import './style.css'
import ImdbBackground from '../../assets/images/imdb.png'

const ImdbRating = ({rating, ...rest}) => {
    return (
        <span className="imdb" {...rest}>
            <img src={ImdbBackground} alt="imdb" className="imdb-img"/>
            <div className="imdb-rating">{rating}</div>
        </span>
    )
}

export default ImdbRating
