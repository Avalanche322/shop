import { Route, Routes, useLocation, Navigate} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { unsubscribe, fetchProducts, getUserData, fetchAddress, fetchTime } from "./redux/actions";

import Loader from "./components/App/Loader";
import Message from "./components/App/Message";
import AllStafsBottom from "./components/AllStafsBottom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";

import Profile from "./pages/Settings/Profile";
import PaymentSettings from "./pages/Settings/PaymentSettings";
import Orders from "./pages/Settings/Orders";



function App() {
	const dispatch = useDispatch();
	let location = useLocation();
	const message = useSelector(state => state.app.message);
	const bg_loading = useSelector(state => state.app.bg_loading);
	const user = useSelector(state => state.user.user);
	let state = location.state;
	let backgroundLocation = state?.backgroundLocation
	useEffect(() => {
		dispatch(unsubscribe());
		dispatch(getUserData(user));
		dispatch(fetchAddress())
		dispatch(fetchTime())
		dispatch(fetchProducts())
	}, [])
	/*get personal data*/

  	return (
		<div className="wrapper min-vh-100 w-100 d-flex flex-column">
			{bg_loading && 
				<div className="loader position-fixed top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100">
					<Loader/>
				</div>
			}
			<Message message={message} title={'Error'} />
			<Header/>
			<main className="main">
				{backgroundLocation && (
				<Routes path={backgroundLocation.pathname}>
					<Route path='auth' element={<Auth />} />
					<Route path='address' element={<Address />} />
				</Routes>
				)}
				<Routes location={backgroundLocation || location}>
					<Route path="/" element={<Home />} />
					<Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />}>
						<Route index path="profile" element={<Profile />} />
						<Route path="payment" element={<PaymentSettings />} />
						<Route path="purchases" element={<Orders />} />
					</Route>
					<Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
					<Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/" />} />
				</Routes>
			</main>
			<AllStafsBottom/>
			<Footer/>
		</div>	
	);
}

export default App;
