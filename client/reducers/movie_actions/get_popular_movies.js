import { GET_POPULAR } from '../../actions/actions';

export default function getMovieByName (state = {}, action) {
	switch (action.type) {
		case GET_POPULAR:
			return action.payload;
	}
	
	return state;
}
