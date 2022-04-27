import { BsFillBasketFill } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector } from 'react-redux';

function AllStafs({diraction = 'down'}) {
	const products = useSelector(state => state.products.products)
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<div 
		ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}} 
			className="fs-6 btn_orange py-2 px-3 d-flex align-items-center rounded-pill">
			<BsFillBasketFill className="fs-5"/>
			{children}
		</div>
	));

	return (
		<Dropdown drop={diraction}>
			<Dropdown.Toggle as={CustomToggle}>
				<span className="mx-2">Всі товари</span>
				<IoIosArrowDown/>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{products.map(product => {
					return (
						<Dropdown.ItemText key={product.id}>
							<Link 
							to={`/category/${product.link}`}
							state={{ id: product.id }}
							className="">{product.title}</Link>
						</Dropdown.ItemText>
					)
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default AllStafs;