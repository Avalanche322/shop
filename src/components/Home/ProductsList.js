import Slider from "react-slick";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import ProductItem from "../ProductItem";
import { Link } from "react-router-dom";


function ProductsList({product}) {
	const settings = {
		dots: false,
		infinite: false,
		speed: 700,
		slidesToShow: 4,
		slidesToScroll: 4,
		variableWidth: true,
		nextArrow: <SlickArrowRight />,
      prevArrow: <SlickArrowLeft />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
      ]
	};
	function SlickArrowLeft({ currentSlide, slideCount, ...props }){
		
		return (
			<MdKeyboardArrowLeft
				{...props}
				className={
					"slick-prev slick-arrow ms-2 shadow-lg rounded-circle" +
					(currentSlide === 0 ? " slick-disabled d-none" : "")
				}
				aria-hidden="true"
				aria-disabled={currentSlide === 0 ? true : false}
				type="button"
			/>
		)
	}
	function SlickArrowRight({ currentSlide, slideCount, ...props }){
		return (
			<MdKeyboardArrowRight
				{...props}
				className={
					"slick-next slick-arrow me-2 shadow-lg rounded-circle" +
					(currentSlide === slideCount - settings.slidesToShow ? " slick-disabled d-none" : "")
				}
				aria-hidden="true"
				aria-disabled={currentSlide === slideCount - 4 ? true : false}
				type="button"
			/>
		)
	}
	return (
		<div className="products">
			<div className="mb-4 d-flex align-items-center gap-3">
				<Link className="products__show-all d-flex align-items-center gap-3" to='#'>
					<h2>{product.title}</h2>
					<span className="products__show-all_subtext">Показати всі</span>
				</Link>
			</div>
			<Slider {...settings}>
				{product.contents.map(x => {
					return <ProductItem content={x} key={x.name} />
				})}
				<div className="products__item 
				item-products p-3 rounded-3 shadow-sm d-flex flex-column 
				justify-content-center align-items-center">
					<Link to='#' className="btn_orange rounded-pill py-2 px-3">Показати всі</Link>
				</div>
        </Slider>
		</div>
	);
}

export default ProductsList;