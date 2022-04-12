import { BsFillBasketFill } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

function AllStafs() {
	return (
		<div className="fs-6 btn_orange py-2 px-3 d-flex align-items-center rounded-pill">
			<BsFillBasketFill className="fs-5"/>
			<span className="mx-2">Всі товари</span>
			<IoIosArrowDown/>
		</div>
	);
}

export default AllStafs;