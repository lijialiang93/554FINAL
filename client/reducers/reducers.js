import { combineReducers } from 'redux';
import getMovieByName from './movie_actions/get_movie_by_name.js';
import getMovieById from './movie_actions/get_movie_by_id.js';
import getUserRegisterResult from './user_actions/user_register';
import getUserLoginResult from './user_actions/user_login';
import getPopularMovies from './movie_actions/get_popular_movies';

const reducers = combineReducers({
	movieResult: getMovieByName,
	movieResultById : getMovieById,
	userRegisterResult : getUserRegisterResult,
	userLoginResult : getUserLoginResult,
	popularMovies:getPopularMovies
});

export default reducers;
