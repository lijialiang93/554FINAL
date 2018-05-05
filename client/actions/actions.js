import axios from 'axios';

// Exporting our actions

export const GET_MOVIE_BY_NAME = 'GET_MOVIE_BY_NAME';
export const GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID';

// An action to check if the recipes are loaded accepts true or false


export function getMovieByName(data) {
  return {
    type: GET_MOVIE_BY_NAME,
    payload: data,
  };
}

export function getMovieById(data) {
  return {
    type: GET_MOVIE_BY_ID,
    payload: data,
  };
}

// This is a redux thunk that will fetch our model data
export function moviesFetchData(url, searchQuery) {
  return (dispatch) => {
    var getMovie = axios.create({
      baseURL: 'http://localhost:3000/api'
    });
  
    const request = getMovie.get(url, {
      params: {
       name: searchQuery
      }
    });
    
    request.then((response) => {
      dispatch(getMovieByName(response.data));
    });
  };
}

export function moviesFetchDataById(url, searchQuery) {
  return (dispatch) => {
    var getMovie = axios.create({
      baseURL: 'http://localhost:3000/api'
    });
  
    const request = getMovie.get(url, {
      params: {
       id: searchQuery
      }
    });
    
    request.then((response) => {
      dispatch(getMovieByName(response.data));
    });
  };
}