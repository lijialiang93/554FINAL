import { ADD_RATE } from '../../actions/actions';

export default function addRateResult (state = {}, action) {
	switch (action.type) {
		case ADD_RATE:
			return action.payload;
    }
	return state;
}
