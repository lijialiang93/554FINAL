import { combineReducers } from 'redux';
import getMovieByName from './movie_actions/get_movie_by_name.js';

const reducers = combineReducers({
	movieResult: getMovieByName
});

export default reducers;
