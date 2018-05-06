import { combineReducers } from 'redux';
import getMovieByName from './movie_actions/get_movie_by_name.js';
import getMovieById from './movie_actions/get_movie_by_id.js';
import getUserRegisterResult from './user_actions/user_register';
import getUserLoginResult from './user_actions/user_login';

const reducers = combineReducers({
	movieResult: getMovieByName,
	movieResultById : getMovieById,
	userRegisterResult : getUserRegisterResult,
	userLoginResult : getUserLoginResult
});

export default reducers;
