import Slider from "react-slick";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import ProductItem from "./ProductItem";


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
				<h2>{product.title}</h2>
				<a href="#" className="products__show-all">Показати всі</a>
			</div>
			<Slider {...settings}>
				{product.contents.map(x => {
					return <ProductItem content={x} key={x.name} />
				})}
        </Slider>
		</div>
	);
}

export default ProductsList;