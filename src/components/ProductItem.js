import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { useEffect } from 'react';
import {AiFillStar} from 'react-icons/ai';
import {BsCart4} from 'react-icons/bs'
import { storage } from '../firebase';

function ProductItem({content}) {

	const [imgUrl, setImgUrl] = useState('')
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, content.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
	}, [])
	return (
		<div className="products__item item-products p-3 rounded-3 shadow-sm d-flex flex-column justify-content-between">
			<a href="#" className='item-products__link'>
				<div className="item-products__img mx-auto">
					<img src={imgUrl} alt={content.name} />
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
			</a>
			<div className='d-flex justify-content-between align-items-center mt-5'>
				<div className='fs-3 fw-bold item-products__price'>{content.price} <span className='fs-5 fw-normal'>грн</span></div>
				<div className='item-products__cart shadow rounded-circle p-2'>
					<BsCart4 className='fs-4'/>
				</div>	
			</div>
		</div>
	);
}

export default ProductItem;