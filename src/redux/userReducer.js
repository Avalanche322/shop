import { INIT_USER, GET_PERSONAL_USER, SET_PERSONAL_USER } from "./types";

const initialState = {
	user : JSON.parse(localStorage.getItem('user')),
	personl: {
		address: {},
		contacts: {},
	}
};


const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_USER:
			return {...state, user: action.payload}
		case GET_PERSONAL_USER:
			return {...state, personl: action.payload}
		case SET_PERSONAL_USER:
			return {...state, personl: {...action.payload}}
		default:
			return state
	}
}

export default userReducer;