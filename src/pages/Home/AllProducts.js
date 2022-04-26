import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import { fetchProductsFiltered, fetchProductsPagination, fetchProductsFilteredPrice, clearFilterProducts } from "../../redux/actions";

const AllProducts = () => {
	let location = useLocation()
	let id = location.state.id
	const loading = useSelector(state => state.app.loading);
	const allProducts = useSelector(state => state.products.products)
	const filtered = useSelector(state => state.products.filtered)
	const [products, setProducts] = useState({contents:[], title: '', category: []});
	const [countProducts, setCountProducts] = useState(1)
	const [isFiltered, setIsFiltered] = useState(false)
	const [price, setPrice] = useState(2000)
	const [typeCategories, setTypeCategories] = useState([])
	const dispatch = useDispatch();
	
	function handlerPagination() {
		if(filtered.lengthFiltered !== filtered.content.length) { // && +price === 100
			setCountProducts(countProducts + 6)
			dispatch(fetchProductsFiltered(typeCategories, price, countProducts + 6, id))
			setIsFiltered(true)
		} else {
			dispatch(fetchProductsPagination(countProducts + 6, id))
			setCountProducts(countProducts + 6)
			const newProducts = allProducts.filter(x => x.id === id)[0];
			setProducts(newProducts)
		}
	}
	useEffect(() => {
		setProducts(allProducts.filter(x => x.id === id)[0] ?? {contents:[], title: ''})
		clearFilter()
	}, [allProducts, id])
	function handlerPrice(categories = typeCategories) {
		if(!categories.length && +price === 2000) {
			handlerPagination()
			setIsFiltered(false)
		} else {
			dispatch(fetchProductsFilteredPrice(categories, price, 7, id))
			setIsFiltered(true)
		}
	}
	function handlerFilter(e) {
		setCountProducts(1)
		const value = e.target.value
		let categories = [];
		if(typeCategories.find(x => x === value)) {
			setTypeCategories(typeCategories.filter(x => x !== value))
			categories = typeCategories.filter(x => x !== value)
		} else {
			setTypeCategories([...typeCategories, value])
			categories = [...typeCategories, value]
		}
		dispatch(fetchProductsFiltered(categories, price, 7, id))
		setIsFiltered(true)
		if(!categories.length && +price === 2000) {
			setIsFiltered(false)
		}
		if(!categories.length) {
			handlerPrice(categories)
		}
	}
	function clearFilter() {
		setTypeCategories([])
		setPrice(2000)
		setCountProducts(1)
		setIsFiltered(false)
		dispatch(clearFilterProducts())
	}
	return (
		<section className="cetegory">
			<Container fluid='md'>
				<h2>{products?.title}</h2>
				<div className="mt-4 row">
					<aside className="bg-white rounded-3 col-3 p-4">
						<span className="fw-bold">{products?.title}</span>
						<div className="mt-2 mb-3">
							{products.category?.map((category, i) => {
								return (
									<Form.Check
										name="address"
										key={category.name}
										type='checkbox'
										className='mb-2'
										id={`checkbox-category-${i}`}>
											<Form.Check.Input 
												onChange={handlerFilter}
												value={category.name}
												checked={typeCategories.includes(category.name)}
												disabled={loading} 
												type='checkbox'/>
											<Form.Check.Label className="d-flex justify-content-between">
												<span>{category.name}</span>
												<span>{category.count}</span>
											</Form.Check.Label>
									</Form.Check>
								)
							})}
						</div>
						<div>
							<span className="fw-bold">Ціна</span>
							<Form.Range max={2000} value={price} onChange={(e) => setPrice(e.target.value)} />
							<div>
								<span>{price}</span>
								<button onClick={() => handlerPrice()} className="ms-5">Ок</button>
							</div>
						</div>
						{isFiltered && 
						<div className="d-flex flex-column">
							<span>Товарів знайдено: {filtered.lengthFiltered}</span>
							<button onClick={clearFilter}>Скинути фільтр</button>
						</div>}
					</aside>
					{!filtered.lengthFiltered && isFiltered && 
					<div className="col-9 d-flex flex-column">
						Нічого не знайдено
					</div>}
					<div className="col-9 d-flex flex-column">
						{!loading && <div className="row w-100">
							{!isFiltered && products.contents.map(x => {
								return (
									<div key={x.name} className='col-4 mb-4'>
										<ProductItem products={products} content={x} />
									</div>
								)
							})}
							{isFiltered && filtered.content.map(x => {
								return (
									<div key={x.name} className='col-4 mb-4'>
										<ProductItem products={products} content={x} />
									</div>
								)
							})}
						</div>}
						{/*Button for pagination*/}
						{products.lengthProducts !== products.contents.length
							&& !isFiltered
						 && <Button 
							type='button'
							onClick={() => handlerPagination()}
							className="btn_orange align-self-center rounded-pill py-2 px-4 mt-4"
						>Показати ще</Button>}
						{/*Button for filter*/}
						{filtered.lengthFiltered !== filtered.content.length
						 && <Button 
							type='button'
							onClick={() => handlerPagination()}
							className="btn_orange align-self-center rounded-pill py-2 px-4 mt-4"
						>Показати ще</Button>}
					</div>
				</div>
			</Container>
		</section>
	);
}
 
export default AllProducts;