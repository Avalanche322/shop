import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import placeholder  from '../../img/placeholder.png';

const OrdersPageItem = ({product}) => {
	const [imgUrl, setImgUrl] = useState([])
	
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, product.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
	}, [])

	return (
		<div 
			className="d-flex flex-sm-row flex-column orders-item align-items-sm-center 
				py-2 px-4 ps-0 mb-4 gap-3">
			<div className="orders-item__img">
				<img src={imgUrl ? imgUrl : placeholder} alt={product.name} />
			</div>
			<span className="orders-item__name me-4">{product.name}</span>
			<span className="me-4"> <span className="d-sm-none">Кількість:</span> {product.count}</span> 
			<span>{(product.price * product.count)} грн</span>
		</div>
	);
}
 
export default OrdersPageItem;