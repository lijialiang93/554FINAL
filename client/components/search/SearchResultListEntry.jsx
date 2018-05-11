import React from "react";
import { Link, hashHistory } from 'react-router';

function SearchResultListEntry({ movie }) {
  let path = {
    pathname: '/movieinfo',
    query: {
      id: movie._id
    }
  }
  return (
    <div className="card mb-3 text-center">
      <Link to={path} target="_blank">
        <img  className="card-img-top" id="moviePoster" src={movie.image.filename} alt={movie.name}></img>
      </Link>
      <div className="card-block">
        <p className="card-title">{movie.name}</p>
      </div>
    </div>
  )
  hashHistory.push(path);
}

export default SearchResultListEntry;
