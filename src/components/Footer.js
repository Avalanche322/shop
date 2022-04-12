import { Container } from 'react-bootstrap';
import { FaFacebookSquare, FaViber } from 'react-icons/fa'
import { BsTelephone, BsTelegram, BsInstagram } from 'react-icons/bs'

function Footer() {
	return (
		<footer className='footer py-3 position-relative'>
			<div className="waves">
				<div className="waves__wave position-absolute start-0 w-100" id='wave1'></div>
				<div className="waves__wave position-absolute start-0 w-100" id='wave2'></div>
				<div className="waves__wave position-absolute start-0 w-100" id='wave3'></div>
				<div className="waves__wave position-absolute start-0 w-100" id='wave4'></div>
			</div>
			<Container fluid='md' className='d-flex flex-column align-items-center position-relative'>
				<ul className="d-flex gap-4 fs-3 footer__list m-0 p-0">
					<li>
						<a href="#" className='footer__link'><FaFacebookSquare/></a>
					</li>
					<li>
						<a href="#" className='footer__link'><BsTelegram/></a>
					</li>
					<li>
						<a href="#" className='footer__link'><BsInstagram/></a>
					</li>
					<li>
						<a href="#" className='footer__link'><FaViber/></a>
					</li>
				</ul>
				<a href="tel:0800301706" className="d-flex align-items-center footer__link my-3">
					<BsTelephone className="me-2 fs-3"/>
					<span className="fw-bold">0 800 301 706</span>
				</a>
				<ul className='d-flex flex-wrap flex-sm-nowrap justify-content-center gap-4 fs-6 footer__list m-0 p-0 mb-3'>
					<li>
						<a href="#" className='footer__link'>Політика конфіденційності</a>
					</li>
					<li>
						<a href="#" className='footer__link'>Формування замовлення</a>
					</li>
					<li>
						<a href="#" className='footer__link'>Отримання замовлення</a>
					</li>
					<li>
						<a href="#" className='footer__link'>Зміни у замовленні</a>
					</li>
				</ul>
				<p className='m-0 footer__copyring'>
					FoodShop@All right reserved 2022
				</p>
			</Container>
		</footer>
	);
}

export default Footer;