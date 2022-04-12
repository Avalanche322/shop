import { getDocs,collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { 
	RecaptchaVerifier, 
	signInWithPhoneNumber, 
	onAuthStateChanged, 
	signOut, 
	updateEmail,
	 getAdditionalUserInfo 
} from "firebase/auth";
import { db, auth } from "../firebase";
import { 
	SHOW_ERROR, 
	HIDE_ERROR, 
	HIDE_LOADER, 
	SHOW_LOADER, 
	FETCH_PRODUCTS, 
	INIT_USER,
	GET_PERSONAL_USER } from "./types";

/*App function*/
export function hideError(){
	return {
		type: HIDE_ERROR
	}
}
export function showError(text){
	return dispatch => {
		dispatch({
			type: SHOW_ERROR, 
			payload: text
		})
	}
}

/*Fetch Products*/
export function fetchProducts() {
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const productsSnapshot = await getDocs(collection(db, "products"));
			const productsList = productsSnapshot.docs.map(doc => doc.data())
			dispatch({type: FETCH_PRODUCTS, payload: productsList})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Auth*/
const generateRecapthca = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
	'size': 'invisible',
	'callback': (response) => {}
	}, auth);
}
export function requestOTP(phoneNumber) {
	return async dispatch => {
		if(phoneNumber.length >= 13) {
			try{
				dispatch({type: HIDE_ERROR});
				dispatch({type: SHOW_LOADER});
				generateRecapthca();
				let appVerifier = window.recaptchaVerifier;
				const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
				window.confirmationResult = confirmationResult;
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showError(e.message) );
				dispatch({type: HIDE_LOADER});
			}
		}
	}
}
export function verifyOTP(otp) {
	return async dispatch => {
		if(otp.length === 6) {
			const contacts = {
				firstName: '',
				secondName: '',
				surname: '',
				dateBirth: ''
			}
			const address = {
				addressType: 'flat',
				region: '',
				town: '',
				street: '',
				house: '',
				flat: '',
				index: ''
			}
			try{
				dispatch({type: HIDE_ERROR});
				dispatch({type: SHOW_LOADER});
				let confirmationResult = window.confirmationResult
				const result = await confirmationResult.confirm(otp)
				const uid = result.user.uid
				const { isNewUser } = getAdditionalUserInfo(result)
				if(isNewUser) {
					await setDoc(doc(db, 'users', uid), {contacts, address})
					dispatch({type: GET_PERSONAL_USER, payload: {contacts, address}});
				} else {
					dispatch(getUserData(result.user));
				}
				dispatch({type: INIT_USER, payload: result.user});
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showError(e.message) );
				dispatch({type: HIDE_LOADER});
			}
	} 
	}
}
export function logout(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await signOut(auth);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*User*/
export function updateUserEmail(user, email = ''){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await updateEmail(user, email)
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserData(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, data)

			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function getUserData(user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const data = (await getDoc(usersRef)).data()
			dispatch({type: GET_PERSONAL_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/* Unsubscribe function*/
export function unsubscribe() {
	return async dispatch => {
		onAuthStateChanged(auth, async (user) => {
			if(user){
				dispatch({type: INIT_USER, payload: user});
				localStorage.setItem('user', JSON.stringify(user));
			} else{
				dispatch({type: INIT_USER, payload: null});
				localStorage.removeItem('user');
				dispatch({type: HIDE_LOADER});
			}
		})
	}
}