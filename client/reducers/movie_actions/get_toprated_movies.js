import { GET_TOP_RATED } from '../../actions/actions';

export default function getTopRatedMovies (state = {}, action) {
	switch (action.type) {
		case GET_TOP_RATED:
			return action.payload;
	}
	
	return state;
}
