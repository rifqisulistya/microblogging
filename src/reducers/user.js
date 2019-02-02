import {
	LOGIN_SUCCESS
} from '../actions/';

let cloneObject = function(obj) {
	return JSON.parse(JSON.stringify(obj))
}

let newState = {user: {loggedIn: false}};

export default function (state, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			newState = cloneObject(state);
			newState.user.loggedIn = true;
			return newState;
		default:
			return state || newState;
	}
}