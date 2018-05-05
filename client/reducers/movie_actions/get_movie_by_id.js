import { GET_MOVIE_BY_ID } from '../../actions/actions';

export default function getMovieById (state = {}, action) {
	switch (action.type) {
		case GET_MOVIE_BY_ID:
			return action.payload;
    }
	return state;
}
