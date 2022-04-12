import { FETCH_PRODUCTS } from "./types";

const initialState = {
	products : [],
};


const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {...state, products: action.payload}
		default:
			return state
	}
}

export default productsReducer;