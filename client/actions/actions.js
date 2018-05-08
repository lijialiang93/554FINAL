import axios from 'axios';

// Exporting our actions

export const GET_MOVIE_BY_NAME = 'GET_MOVIE_BY_NAME';
export const GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGIN = 'USER_LOGIN';
export const GET_POPULAR = 'GET_POPULAR';
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

export function userRegister(data) {
  return {
    type: USER_REGISTER,
    payload: data,
  };
}

export function userLogin(data) {
  return {
    type: USER_LOGIN,
    payload: data,
  };
}
export function getPopularMovies(data) {
  return {
    type: GET_POPULAR,
    payload: data
  };
}


// This is a redux thunk that will fetch our model data
export function moviesFetchPopularData(url) {
  return (dispatch) => {
    var getPopular = axios.create({
      baseURL: 'http://localhost:3000/api'
    });

    getPopular.get(url)
      .then(function (response) {
        dispatch(getPopularMovies(response.data));
      }).catch(function (error) {
        console.log(error);
      });

  };
}

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

export function userRegisterFetchResult(url, registerData) {
  return (dispatch) => {
    var getResult = axios.create({
      baseURL: 'http://localhost:3000/api'
    });

    console.log(registerData);
    let formData = new FormData();
    for(var key in registerData){
      formData.append(key,registerData[key]);
    }
    const request = getResult.post(url, formData , {
      headers: {
        'Content-Type': 'multipart/form-data'}
    });

    // const request = getResult.post(url, registerData);

    request.then((response) => {
      dispatch(userRegister(response.data));
    });
  };
}

export function userLoginFetchResult(url, loginData) {
  return (dispatch) => {
    var getResult = axios.create({
      baseURL: 'http://localhost:3000/api'
    });

    const request = getResult.post(url, {
      username: loginData.username,
      password: loginData.password
    });

    request.then((response) => {
      dispatch(userLogin(response.data));
    });
  };
}