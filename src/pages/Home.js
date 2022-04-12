import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import videoWebm from '../video/prevue.webm';
import ProductsList from '../components/ProductsList';
import HomeBanner from '../components/HomeBanner';
import { fetchProducts } from '../redux/actions';

function Home() {
	const dispatch = useDispatch();
	const products = useSelector(state => state.products.products)
	useEffect(() => {
		dispatch(fetchProducts())
	}, [])
	return ( 
		<div className="home">
			<div className="full-screan position-relative vh-100 mb-5">
				<video
					autoPlay
					muted
					loop
					preload="auto"
					src={videoWebm} 
					className="full-screan__video position-absolute top-0 start-0 w-100 h-100">
					</video>
			</div>
			<Container fluid='md'>
				{products && products.map(product => {
					return (
						<ProductsList product={product} key={product.title} />
					)
				})}
				<HomeBanner/>
			</Container>
		</div> 
	);
}

export default Home;