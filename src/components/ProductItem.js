import { getDownloadURL, ref } from 'firebase/storage';
import { useState, useEffect } from 'react';
import {AiFillStar} from 'react-icons/ai';
import {BsCart4} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storage } from '../firebase';
import placeholder  from '../img/placeholder.png';
import { addToOrder, removeFromOrder } from '../redux/actions';
import AddToCart from './AddToCart';

function ProductItem({content}) {
	const [imgUrl, setImgUrl] = useState('')
	const dispatch = useDispatch();
	const order = useSelector(state => state.orders.currentOrder)
	const [productInOrder, setProductInOrder] = useState(0)
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, content.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
	}, [])
	useEffect(() => {
		setProductInOrder(order.products.find(x => x.id === content.id)?.count ?? 0)
	}, [])
	function handlerAddToOrder(){
		setProductInOrder(productInOrder + 1);
		dispatch(addToOrder({...content, count: productInOrder + 1}))
	}
	function handlerRemoveFromOrder(){
		setProductInOrder(productInOrder - 1);
		if(productInOrder - 1 === 0) {
			dispatch(removeFromOrder(content))
		} else {
			dispatch(addToOrder({...content, count: productInOrder - 1}))
		}
	}
	return (
		<div 
			className="products__item 
			item-products p-3 rounded-3 shadow-sm d-flex flex-column 
			justify-content-between item-products__scale">
			<Link to="#" className='item-products__link'>
				<div className="item-products__img mx-auto">
					<img src={imgUrl ? imgUrl : placeholder} alt={content.name} />
				</div>
				<div>
					<h3 className='fs-6 mt-2'>{content.name}</h3>
					<div className='d-flex align-items-center'>
						<div>
							<AiFillStar className='item-products__star'/>
							<AiFillStar className='item-products__star'/>
							<AiFillStar className='item-products__star'/>
							<AiFillStar className='item-products__star'/>
							<AiFillStar className='item-products__star'/>
						</div>
						<span className='me-3 ms-1 fw-bold'>{content.mark}</span>
						<span className='item-products__mark'>{content.countMarks} оцінки</span>
					</div>
					<hr className='item-products__line line' />
					<span className='item-products__weigth'>{content.weight} {content.type}</span>
				</div>
			</Link>
			<div className='d-flex justify-content-between align-items-center mt-5'>
				<div className='fs-3 fw-bold item-products__price'>{content.price} <span className='fs-5 fw-normal'>грн</span></div>
				{!productInOrder ? <button 
					onClick={() => handlerAddToOrder()} 
						className='item-products__cart shadow rounded-circle p-2'
					>
						<BsCart4 className='fs-4'/>
					</button>
				: <AddToCart 
					count={productInOrder} 
					addToCart={handlerAddToOrder} 
					removeFromCart={handlerRemoveFromOrder} /> 
				}
			</div>
		</div>
	);
}

export default ProductItem;