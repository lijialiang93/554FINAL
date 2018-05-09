import { combineReducers } from 'redux';
import getMovieByName from './movie_actions/get_movie_by_name.js';
import getMovieById from './movie_actions/get_movie_by_id.js';
import getUserRegisterResult from './user_actions/user_register';
import getUserLoginResult from './user_actions/user_login';
import addReviewResult from './review_actions/add_review';
import getReviewByAuthor from './review_actions/get_review_by_author';
import getReviewByMovie from './review_actions/get_review_by_movie';
import getTopRatedMovies from './movie_actions/get_toprated_movies';
import addRateResult from './rate_actions/add_rate';

const reducers = combineReducers({
	movieResult: getMovieByName,
	movieResultById : getMovieById,
	userRegisterResult : getUserRegisterResult,
	userLoginResult : getUserLoginResult,
	addReviewResult: addReviewResult,
	ReviewResultByAuthor: getReviewByAuthor,
	ReviewResultByMovie: getReviewByMovie,
	topRatedMovies:getTopRatedMovies,
	addRateResult: addRateResult
});

export default reducers;
