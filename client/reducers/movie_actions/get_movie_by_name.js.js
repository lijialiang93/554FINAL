import { GET_MOVIE_BY_NAME } from '../../actions/actions';

export default function testing (state = {}, action) {
	switch (action.type) {
		case GET_MOVIE_BY_NAME:
			return action.payload;
    }
	return state;
}
