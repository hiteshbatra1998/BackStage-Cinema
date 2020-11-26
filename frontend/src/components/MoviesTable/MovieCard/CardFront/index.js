import { connect } from "react-redux";
import React from "react";
import "./style.css";

const CardFront = ({
  coverImage,
  rate,
  title,
  genre,
  trailerLink,
  movieLength,
  loggedIn
}) => {
  return (
    <div className="front">
      <img src={coverImage} alt="coverImage" />
      <div className="card-footer">
        <h4> {title} </h4>
        <p>
          {movieLength} / {genre}
        </p>

        
        {  loggedIn ? <div  style={{ display:'flex' , justifyContent:'space-between' , color:'black' } }>
          <div>
          <a
          href={trailerLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{color:'red'}}
        >
          Watch trailer
        </a>
          </div>
          <div>
          <a
          href='https://in.bookmyshow.com/'
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Book movie
        </a>
          </div>
        </div>  : <a
          href={trailerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="trailer-btn"
        >
          watch trailer
        </a>   }
        
      </div>
      <span className="like"> {rate}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};
export default connect(mapStateToProps)(CardFront);

