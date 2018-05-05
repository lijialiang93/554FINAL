import { combineReducers } from 'redux';
import getMovieByName from './movie_actions/get_movie_by_name.js';
import getMovieById from './movie_actions/get_movie_by_id.js';

const reducers = combineReducers({
	movieResult: getMovieByName,
	movieResultById : getMovieById
});

export default reducers;
