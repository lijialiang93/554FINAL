import { USER_LOGIN } from '../../actions/actions';

export default function getUserLoginResult (state = {}, action) {
	switch (action.type) {
		case USER_LOGIN:
			return action.payload;
    }
	return state;
}
