import { Dropdown } from "react-bootstrap";
import { FaRegUser } from 'react-icons/fa'
import { BiUserPin } from 'react-icons/bi'
import { RiBillLine } from 'react-icons/ri'
import { IoMdExit } from 'react-icons/io'
import React from "react";
import { Link } from "react-router-dom";

function UserDropDown({handlerLogout}) {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<div 
			className="fs-5 user-menu rounded-circle" 
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			<FaRegUser>
				{children}
			</FaRegUser>
		</div>
	));
	return (
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle}>Custom toggle</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item as="button" eventKey="1">
					<Link className="link" to='/settings/profile'><BiUserPin/> Персональна сторінка</Link>
				</Dropdown.Item>
				<Dropdown.Item as="button" eventKey="2">
					<Link className="link" to='/settings/purchases'><RiBillLine/> Мої замовлення</Link>
				</Dropdown.Item>
				<Dropdown.Item 
					as="button" 
					className="link" 
					eventKey="1" 
					onClick={handlerLogout}
					><IoMdExit/> Вихід
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default UserDropDown;