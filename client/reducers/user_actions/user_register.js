import { USER_REGISTER } from '../../actions/actions';

export default function getUserRegisterResult (state = {}, action) {
	switch (action.type) {
		case USER_REGISTER:
			return action.payload;
    }
	return state;
}
