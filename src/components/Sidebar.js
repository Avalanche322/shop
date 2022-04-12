import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<aside className="profile-sidebar p-4 ms-md-4 mb-md-0 mb-4">
			<h2 className="d-none d-md-inline">FoodShop</h2>
			<div className="d-flex flex-md-column gap-2 mt-md-4">
				<Link className="link" to='/profile'>Профіль</Link>
				<Link className="link" to='/purchases'>Мої замовлення</Link>
			</div>
		</aside>
	);
}
 
export default Sidebar;