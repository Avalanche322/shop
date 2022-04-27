import { HiSearch } from 'react-icons/hi'
import { FaTimes } from 'react-icons/fa'
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions';


const Search = () => {
	const dispatch = useDispatch();
	const searchResult = useSelector(state => state.products.search)
	const [valueSearch, setValueSearch] = useState('')

	function handlerSearch(e) {
		const value = e.target.value;
		setValueSearch(value)
		dispatch(searchProducts(value))
	}
	function handlerSearchRemove() {
		setValueSearch('')
	}
	return (
		<div className='position-relative'>
			<Form.Group 
				className="header__search search-header rounded-3 p-2 d-flex"
				controlId="search-header"
				onChange={handlerSearch}>
				<Form.Label className="search-header__btn_search fs-5">
					<HiSearch/>
				</Form.Label>
				<InputGroup>
					<FormControl
						className="search-header__input d-none d-xxl-block" 
						placeholder="Пошук по сайту"
						onChange={handlerSearch}
						value={valueSearch}
					/>
					{!!valueSearch.trim().length && 
					<Button className='search-header__remove' onClick={handlerSearchRemove}>
						<FaTimes/>
					</Button>}
				</InputGroup>
			</Form.Group>
			{!!valueSearch.trim().length && <ul className='bg-white rounded-3 position-absolute mt-4 w-100 p-3 shadow '>
				{searchResult.map(item => {
					return (
						<li>
							<Link to={`/product/${item.id}`} >
								<span>{item.name}</span>
							</Link>
						</li>
					)
				})}
			</ul> }
		</div>
	);
}
 
export default Search;