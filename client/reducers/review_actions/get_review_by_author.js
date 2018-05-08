import { GET_REVIEW_BY_AUTHOR } from '../../actions/actions';

export default function getReviewByAuthor (state = {}, action) {
	switch (action.type) {
		case GET_REVIEW_BY_AUTHOR:
			return action.payload;
    }
	return state;
}
