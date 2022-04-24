import { 
	getDocs,
	collection, 
	setDoc, 
	doc, 
	getDoc, 
	updateDoc,
	addDoc, 
	query, 
	limit, 
	where, 
	collectionGroup, 
	arrayUnion, 
	arrayRemove 
} from "firebase/firestore";
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
	SHOW_MESSAGE, 
	HIDE_MESSAGE, 
	HIDE_LOADER, 
	SHOW_LOADER, 
	FETCH_PRODUCTS, 
	INIT_USER,
	GET_PERSONAL_USER, 
	SHOW_BG_LOADER,
	HIDE_BG_LOADER,
	SET_PERSONAL_USER,
	ADD_TO_ORDER,
	REMOVE_ORDER, 
	REMOVE_FROM_ORDER,
	SET_ORDER,
	MAKE_ORDER,
	FETCH_ORDER,
	UPDATE_ADDRESS_FIELD_USER,
	UPDATE_PAYMENTS_FIELD_USER,
	FETCH_ADDRESS,
	FETCH_TIME
} from "./types";

/*App function*/
export function hideError(){
	return {
		type: HIDE_MESSAGE
	}
}
export function showMessage(text, title){
	return dispatch => {
		dispatch({
			type: SHOW_MESSAGE, 
			payload: {text, title}
		})
	}
}

/*Fetch Products*/
export function fetchProducts() {
	return async dispatch => {
		try{
			document.body.classList.add('overflow-hidden');
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_BG_LOADER});
			const allDocs = await getDocs(collection(db, "products"));
			let result = [];
			let productsList = {};
			let productsListRef = {};
			for (const item of allDocs.docs) {
				productsListRef = collection(db, "products", item.id, 'contentsProducts') 
				productsList = (await getDocs(query(productsListRef, limit(7))))
				result.push({
					title: item.data().title,
					id: item.id,
					contents: productsList.docs.map(doc => ({id: doc.id, ...doc.data()}))
				})
			}
			//const test = query(collectionGroup(db, "contentsProducts"), 
			//where('id', 'in', ['p1FdzMkr6eQ1xdIjnkpy', 'L7ijI4vfwPazbrQa2PS5']))
			//console.log((await getDocs(test)));
			dispatch({type: FETCH_PRODUCTS, payload: result})
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			document.body.classList.remove('overflow-hidden');
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Fetch Address*/
export function fetchAddress() {
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const allDocs = await getDocs(collection(db, "address"));
			let result = [];
			allDocs.forEach((doc) => {
				result.push(doc.data())
			});
			
			dispatch({type: FETCH_ADDRESS, payload: result})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Fetch Time*/
export function fetchTime() {
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			const doc = await getDocs(collection(db, "time",));

			dispatch({type: FETCH_TIME, payload: doc.docs[0].data()})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_BG_LOADER});
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
				dispatch({type: HIDE_MESSAGE});
				dispatch({type: SHOW_LOADER});
				generateRecapthca();
				let appVerifier = window.recaptchaVerifier;
				const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
				window.confirmationResult = confirmationResult;
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showMessage(e.message, 'ERROR') );
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
			const address = []
			const payments = []
			try{
				dispatch({type: HIDE_MESSAGE});
				dispatch({type: SHOW_LOADER});
				let confirmationResult = window.confirmationResult
				const result = await confirmationResult.confirm(otp)
				const uid = result.user.uid
				const { isNewUser } = getAdditionalUserInfo(result)
				if(isNewUser) {
					await setDoc(doc(db, 'users', uid), {contacts, address, payments})
					dispatch({type: SET_PERSONAL_USER, payload: {contacts, address, payments}});
				} else {
					dispatch(getUserData(result.user));
				}
				dispatch({type: INIT_USER, payload: result.user});
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showMessage(e.message, 'ERROR') );
				dispatch({type: HIDE_LOADER});
			}
	} 
	}
}
export function logout(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			await signOut(auth);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*User*/
export function updateUserEmail(user, email = ''){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			await updateEmail(user, email)
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserData(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, data)
			dispatch({type: SET_PERSONAL_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Payments*/
export function updateUserPayments(user, array , data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const cards = [...array.filter(x => x.number !== data.number), data]
			await updateDoc(usersRef, {
				'payments.cards': cards
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: {cards}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserPayments(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const cards = array.filter(x => x.number !== data.number)
			await updateDoc(usersRef, {
				'payments.cards': arrayRemove(data)
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: {cards}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserPaymentsField(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, {
				'payments.active_card': data.active_card,
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}


/*Address*/
export function updateUserAddressShop(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const shop = [...array.filter(x => x.id !== data.id), data]
			await updateDoc(usersRef, {
				'address.shop': shop
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {shop}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserAddressShop(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const shop = array.filter(x => x.id !== data.id)
			await updateDoc(usersRef, {
				'address.shop': arrayRemove(data)
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {shop}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserAddressDelivery(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const delivery = [...array.filter(x => x.id !== data.id), data]
			await updateDoc(usersRef, {
				'address.delivery': delivery
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {delivery}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserAddressDelivery(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const delivery = array.filter(x => x.id !== data.id)
			await updateDoc(usersRef, {
				'address.delivery': arrayRemove(data)
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {delivery}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserAddressField(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, {
				'address.type': data.type,
				'address.active_address': data.active_address,
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

export function getUserData(user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const data = (await getDoc(usersRef)).data()
			dispatch({type: GET_PERSONAL_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showMessage(e.message, 'ERROR') );
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
				localStorage.removeItem('currentOrder');
				dispatch({type: HIDE_LOADER});
			}
		})
	}
}

/*Production action*/
export function addProducts(){
	return async dispatch => {
		try{
			const docRef = doc(db, "products", 'b9Ti2jcwMjlSHaTNET43');
			const colRef = collection(docRef, "contentsProducts")
			const newDoc = await addDoc(colRef, {	
				countMarks: '',
				imgUrl: 'gs://shop-a76f5.appspot.com/grocery/888567_480x480wwm_5081246e-180a-6314-e5a6-093098a18c9c.png',
				mark: '',
				name: 'Вироби макаронні Terra di Grano «Пенне Рігате»',
				price: 39.99,
				type: 'г',
				weight: 500,
				id: ''
			})
			await updateDoc(doc(db, newDoc.path), {
				id: newDoc.id
			})
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
		}
	}
}

/*orders*/
export function fetchOrders(){
	return async dispatch => {
		try{
			document.body.classList.add('overflow-hidden');
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_BG_LOADER});
			const allOrderDocs = await getDocs(collection(db, "orders"));
			let allIdProducts = []
			let result = []
			let order = {}
			for (const orderDoc of allOrderDocs.docs) {
				order = await getDoc(doc(db, "orders", orderDoc.id));
				allIdProducts.push(...order.data().products.map(x => x.id))
				result.push(order.data())
			}
			const productsRef = query(collectionGroup(db, "contentsProducts"), 
			where('id', 'in', allIdProducts))

			const productsById = (await getDocs(productsRef)).docs.map(x => x.data());
			for (const orderItem of result) {
				orderItem.products = orderItem.products.map(orderItemProduct => {
					let product = productsById.find(x => x.id === orderItemProduct.id);
					return {...orderItemProduct, ...product}
				})
			}
			dispatch({type: FETCH_ORDER, payload: result});
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}
export function addToOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			dispatch({type: ADD_TO_ORDER, payload: content});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeFromOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			dispatch({type: REMOVE_FROM_ORDER, payload: content});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeOrder(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: REMOVE_ORDER});
			
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function setOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: SET_ORDER, payload: content});
			
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function makeOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: MAKE_ORDER, payload: content});
			const docRef = collection(db, "orders");
			const newDoc = await addDoc(docRef, content)
			await updateDoc(doc(db, newDoc.path), {
				orderId: newDoc.id
			})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}