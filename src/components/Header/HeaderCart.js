import { BsCart4 } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderCart = () => {
	const order = useSelector(state => state.orders.currentOrder)
	const [countOrder, setCountOrder] = useState(order.products.map(x => x.count).reduce((p, n) => p + n, 0))

	useEffect(() => {
		setCountOrder(order.products.map(x => x.count).reduce((p, n) => p + n, 0))
	}, [order])
	return (
		<Link to='/cart' className="btn_orange py-2 px-3 d-flex align-items-center rounded-pill cart-header">
			<BsCart4 className="fs-5"/>
			 {!!countOrder && <span className="cart-header__badge shadow position-absolute translate-middle badge rounded-pill">
				{countOrder}
			</span>}
		</Link>
	);
}
 
export default HeaderCart;