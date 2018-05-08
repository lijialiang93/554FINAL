import { GET_REVIEW_BY_MOVIE } from '../../actions/actions';

export default function getReviewByMovie (state = {}, action) {
	switch (action.type) {
		case GET_REVIEW_BY_MOVIE:
			return action.payload;
    }
	return state;
}
