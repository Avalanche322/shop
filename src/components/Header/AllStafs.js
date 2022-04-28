import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
			<FontAwesomeIcon icon="fa-solid fa-basket-shopping" className="fs-5" />
			{children}
		</div>
	));
	return (
		<Dropdown drop={diraction} className='all-stafs'>
			<Dropdown.Toggle as={CustomToggle}>
				<span className="mx-2">Всі товари</span>
				<FontAwesomeIcon icon="fa-solid fa-angle-down" />
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{products.map(product => {
					return (
						<Dropdown.ItemText className="all-stafs__item" key={product.id}>
							<Link 
							to={`/category/${product.link}`}
							state={{ id: product.id }}
							className="all-stafs__link w-100 d-flex align-items-center gap-2">
								<FontAwesomeIcon icon={product.icon} className='all-stafs__icon' />
								<span>{product.title}</span>
							</Link>
						</Dropdown.ItemText>
					)
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default AllStafs;