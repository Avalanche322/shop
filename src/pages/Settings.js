import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Settings = () => {
	return (
		<div className="settigns d-flex flex-column flex-md-row">
			<Sidebar/>
			<Container fluid='md'>
				<Outlet/>
			</Container>
		</div>
	);
}
 
export default Settings;