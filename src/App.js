import { Route, Routes, useLocation} from "react-router-dom";
import AllStafsBottom from "./components/AllStafsBottom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsubscribe } from "./redux/actions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
	const dispatch = useDispatch();
	let location = useLocation();
	let state = location.state;
	let backgroundLocation = state?.backgroundLocation
	useEffect(() =>{
		dispatch(unsubscribe());
	// eslint-disable-next-line
	},[])
  	return (
		<div className="wrapper min-vh-100 w-100 overflow-hidden d-flex flex-column">
			<Header/>
			<main className="main">
				<Routes location={backgroundLocation || location}>
					<Route path="/" element={<Home />} />
					<Route path="/settings" element={<Settings />}>
						<Route index path="profile" element={<Profile />} />
					</Route>
				</Routes>
				{backgroundLocation && (
				<Routes>
					<Route path='/auth' element={<Auth />} />
				</Routes>
				)}
			</main>
			<AllStafsBottom/>
			<Footer/>
		</div>	
	);
}

export default App;
