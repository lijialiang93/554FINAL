import { ADD_REVIEW } from '../../actions/actions';

export default function addReviewResult (state = {}, action) {
	switch (action.type) {
		case ADD_REVIEW:
			return action.payload;
    }
	return state;
}
