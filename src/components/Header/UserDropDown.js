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
		<Dropdown align={{ md: 'start' }}>
			<Dropdown.Toggle as={CustomToggle}>Custom toggle</Dropdown.Toggle>
			<Dropdown.Menu className='user-menu__menu'>
				<Dropdown.ItemText eventKey="1" className="p-0">
					<Link className="user-menu__link w-100 w-100 d-inline-block" to='/settings/profile'><BiUserPin/> Персональна сторінка</Link>
				</Dropdown.ItemText>
				<Dropdown.ItemText eventKey="2" className="p-0">
					<Link className="user-menu__link w-100 d-inline-block" to='/settings/purchases'><RiBillLine/> Мої замовлення</Link>
				</Dropdown.ItemText>
				<Dropdown.ItemText 
					className="user-menu__link" 
					eventKey="3" 
					onClick={handlerLogout}
					><IoMdExit/> Вихід
				</Dropdown.ItemText>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default UserDropDown;