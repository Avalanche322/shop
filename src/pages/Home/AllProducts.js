import { useEffect, useState } from "react";
import { Container, Button, Form, Spinner, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GoSettings } from "react-icons/go";
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
	const [maxPrice, setMaxPrice] = useState(products.maxPrice)
	const [minPrice, setMinPrice] = useState(products.minPrice)
	const [price, setPrice] = useState(0)
	const [categories, setCategories] = useState(products.category)
	const [typeCategories, setTypeCategories] = useState([])
	 const [showFiltres, setShowFiltres] = useState(false);
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
		setMaxPrice(allProducts.filter(x => x.id === id)[0]?.maxPrice ?? 0)
		setMinPrice(allProducts.filter(x => x.id === id)[0]?.minPrice ?? 0)
		setPrice(allProducts.filter(x => x.id === id)[0]?.maxPrice ?? 0)
		setCategories(allProducts.filter(x => x.id === id)[0]?.category)
	}, [allProducts, id])
	function handlerPrice(categories = typeCategories) {	
		if(!categories.length && +price === maxPrice) {
			setCategories(allProducts.filter(x => x.id === id)[0]?.category)
			setCategories(allProducts.filter(x => x.id === id)[0]?.category)
			setMaxPrice(allProducts.filter(x => x.id === id)[0]?.maxPrice)
			setMinPrice(allProducts.filter(x => x.id === id)[0]?.minPrice)
			handlerPagination()
			setIsFiltered(false)
		} else {
			dispatch(fetchProductsFilteredPrice(categories, price, 7, id))
			setCategories(filtered.category)
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
		if(!categories.length && +price === products.maxPrice) {
			setIsFiltered(false)
		}
		if(!categories.length) { // when we don't have a caterogies we filtered by price
			handlerPrice(categories)
		}
	}
	function clearFilter() {
		setTypeCategories([])
		setPrice(products.maxPrice)
		setMaxPrice(products.maxPrice)
		setMinPrice(products.minPrice)
		setCategories(products.category)
		setCountProducts(1)
		setIsFiltered(false)
		dispatch(clearFilterProducts())
	}
	useEffect(() => {
		if(!!filtered.category.length) {
			setCategories(filtered.category)
		}
		if(!!filtered.maxPrice && !!filtered.minPrice) {
			setMaxPrice(filtered.maxPrice)
			setMinPrice(filtered.minPrice)
			//setPrice(filtered.maxPrice)
		}
	}, [filtered])
	return (
		<section className="cetegory">
			<Container fluid='md'>
				<h2>{products?.title}</h2>
				<div className="d-md-none d-block mt-4">
					<Button 
						type='button' 
						onClick={() => setShowFiltres(true)} 
						className="btn_orange rounded-pill d-flex gap-2 align-items-center">
						<GoSettings className="fs-5"/>
						<span>Фільтри</span>
					</Button>
				</div>
				<div className="mt-4 row w-100 mx-auto">
					<aside className="bg-white rounded-3 col-3 p-4 d-lg-block d-none h-100 cetegory__sidebar">
						<span className="fw-bold">{products?.title}</span>
						<div className="mt-2 mb-3">
							{categories?.map((category, i) => {
								return (
									<Form.Check
										name="address"
										key={category.name}
										type='checkbox'
										className='mb-2 cetegory_link'
										id={`checkbox-category-${i}`}>
											<Form.Check.Input 
												onChange={handlerFilter}
												value={category.name}
												checked={typeCategories.includes(category.name)}
												disabled={loading} 
												type='checkbox'/>
											<Form.Check.Label className="d-flex justify-content-between cetegory_label">
												<span>{category.name}</span>
												<span>{category.count}</span>
											</Form.Check.Label>
									</Form.Check>
								)
							})}
						</div>
						<div>
							<span className="fw-bold">Ціна</span>
							<Form.Range 
								className="cetegory__range"
								min={minPrice}
								max={maxPrice} 
								value={price} 
								onChange={(e) => setPrice(e.target.value)} 
							/>
							<div className="d-flex align-items-center mt-2">
								<Form.Control 
									type="number" 
									min={minPrice}
									max={maxPrice} 
									value={price} 
									onChange={(e) => setPrice(e.target.value)} 
								/>
								<Button 
									type='button'
									onClick={() => handlerPrice()}
									className="btn_orange rounded-pill ms-5">
										Ок
									</Button>
							</div>
						</div>
						{isFiltered && 
						<div className="d-flex flex-column align-items-center mt-4 border-top pt-3">
							<span className="fw-bold">Товарів знайдено: {filtered.lengthFiltered}</span>
							<Button 
								type='button'
								onClick={clearFilter}
								className="btn_orange rounded-pill mt-3">
									Скинути фільтр
								</Button>
						</div>}
					</aside>
					{/*Not found*/}
					{!filtered.lengthFiltered && isFiltered && !loading &&
					<div className="col-9 d-flex flex-column text-center mt-5">
						<span className="fw-bold fs-2">Нічого не знайдено</span>
					</div>}
					{/*Loader*/}
					{loading && <div className="small-loader col-9 d-flex justify-content-center mt-5">
						<Spinner animation="border" />
					</div>}

					 {/*Products*/}
					{!loading && <div className="col-lg-9 col-12 d-flex flex-column">
						<div className="row w-100 justify-content-sm-start justify-content-center">
						{!isFiltered && products.contents.map(x => {
							return (
								<div key={x.name} className='col-lg-4 col-sm-6 col-8 mb-4 cetegory__product'>
									<ProductItem products={products} content={x} />
								</div>
							)
						})}
						{isFiltered && filtered.content.map(x => {
							return (
								<div key={x.name} className='col-lg-4 col-sm-6 col-8 mb-4 cetegory__product'>
									<ProductItem products={products} content={x} />
								</div>
							)
						})}
					</div>
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
					</div>}
				</div>
				{/*filtres for mobile*/}
				<Offcanvas show={showFiltres} onHide={() => setShowFiltres(false)}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Фільтри</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<span className="fw-bold">{products?.title}</span>
						<div className="mt-2 mb-3">
							{products.category?.map((category, i) => {
								return (
									<Form.Check
										name="address"
										key={category.name}
										type='checkbox'
										className='mb-2 cetegory_link'
										id={`checkbox-category-${i}`}>
											<Form.Check.Input 
												onChange={handlerFilter}
												value={category.name}
												checked={typeCategories.includes(category.name)}
												disabled={loading} 
												type='checkbox'/>
											<Form.Check.Label className="d-flex justify-content-between cetegory_label">
												<span>{category.name}</span>
												<span>{category.count}</span>
											</Form.Check.Label>
									</Form.Check>
								)
							})}
						</div>
						<div>
							<span className="fw-bold">Ціна</span>
							<Form.Range 
								className="cetegory__range"
								min={10}
								max={2000} 
								value={price} 
								onChange={(e) => setPrice(e.target.value)} 
							/>
							<div className="d-flex align-items-center mt-2">
								<Form.Control type="number" min={10} value={price} onChange={(e) => setPrice(e.target.value)} />
								<Button 
									type='button'
									onClick={() => handlerPrice()}
									className="btn_orange rounded-pill ms-5">
										Ок
									</Button>
							</div>
						</div>
						{isFiltered && 
						<div className="d-flex flex-column align-items-center mt-4 border-top pt-3">
							<span className="fw-bold">Товарів знайдено: {filtered.lengthFiltered}</span>
							<Button 
								type='button'
								onClick={clearFilter}
								className="btn_orange rounded-pill mt-3">
									Скинути фільтр
								</Button>
						</div>}
					</Offcanvas.Body>
				</Offcanvas>
			</Container>
		</section>
	);
}
 
export default AllProducts;