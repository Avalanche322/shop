import { FiPlus, FiMinus } from 'react-icons/fi'

const AddToCart = ({count, addToCart, removeFromCart}) => {
	return (
		<div className="add-to-cart p-1 rounded-pill d-flex align-items-center">
			<button className="add-to-cart__btn" onClick={addToCart}><FiPlus/></button>
			<span className="mx-2 fs-6">{count}</span>
			<button className="add-to-cart__btn" onClick={removeFromCart}><FiMinus/></button>
		</div>
	);
}
 
export default AddToCart;