import { Navbar, Container, Nav, Offcanvas, InputGroup, FormControl } from "react-bootstrap";
import { FaRegUser, FaFacebookSquare, FaViber } from 'react-icons/fa'
import { BsCart4, BsTelephone, BsTelegram, BsInstagram } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiSearch } from 'react-icons/hi'
import { BiExit, BiUserPin } from 'react-icons/bi'
import { RiBillLine } from 'react-icons/ri'
import { Fragment } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllStafs from "./AllStafs";
import UserDropDown from "./UserDropDown";
import { logout } from "../redux/actions";


function Header() {
	const user = useSelector(state => state.user.user);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigator = useNavigate();
	function handlerLogout(){
		dispatch(logout())
		navigator('/')
	}
	return (
		<header className="header">
			<Navbar expand='md' fixed="top" className="py-3">
				<Container fluid='md' className="position-relative flex-column">
					<Navbar.Offcanvas
						className='sidebar'
						placement="start">
						<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							<NavLink 
								to={`${location.pathname}auth`}
								state={{ backgroundLocation: location }}
								className="d-flex align-items-center sidebar__top"
							>
								<FaRegUser className="fs-4"/>
								{user 
								?  <div className="ms-2 d-flex flex-column sidebar__text">
										<span className="lh-1">{user.displayName ?? 'Гість'}</span>
									</div>
								: <div className="ms-2 d-flex flex-column sidebar__text">
										<span className="lh-1">Вхід/</span>
										<span className="lh-2">Реєстрація</span>
									</div>}
							</NavLink>
						</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className="d-flex flex-column p-0">
							{/*if user sing in, we show the links*/}
							<Nav className="flex-grow-1 pe-3 px-3">
								{user && <Fragment>
									<Nav.Link className="sidebar__link" to='/settings/profile'>
										<BiUserPin className="me-2"/>
										Персональні сторінка
										</Nav.Link>
									<Nav.Link to='/settings/purchases' className="sidebar__link">
										<RiBillLine className="me-2"/>
										Мої замовлення
										</Nav.Link>
									<div 
										className="sidebar__link"
										onClick={handlerLogout}>
										<BiExit className="me-2"/>
										Вихід
									</div>	
								</Fragment>}
							</Nav>
							<div className="contacts-block">
								<div className="my-4 px-3">
									<p>Поширені питання</p>
									<a href="tel:0800301706" className="d-flex align-items-center contacts-block__link">
										<BsTelephone className="me-2 fs-3 contacts-block__link_light"/>
										<span className="fw-bold">0 800 301 706</span>
									</a>
								</div>
								<div className="d-flex justify-content-center gap-3 fs-1 contacts-block__socials py-3">
									<a href="/facebook" className="contacts-block__link"><FaFacebookSquare/></a>
									<a href="/telegram" className="contacts-block__link"><BsTelegram/></a>
									<a href="/instagram" className="contacts-block__link"><BsInstagram/></a>
									<a href="/viber" className="contacts-block__link"><FaViber/></a>
								</div>
							</div>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
					<div className="d-flex justify-content-between w-100 align-items-center">
						<Navbar.Toggle aria-controls="offcanvasNavbar" />
						<Navbar.Brand className="m-0">
							<NavLink className='navbar-brand' to='/'>FoodShop</NavLink>
						</Navbar.Brand>
						{/*All Products*/}
						<div className="d-none d-md-block">
							<AllStafs  />
						</div>
						{/*Search*/}
						<InputGroup className="header__search search-header rounded-3 p-2">
							<button className="search-header__btn_search fs-5">
								<HiSearch/>
							</button>
							<FormControl className="search-header__input d-none d-xxl-block" placeholder="Пошук по сайту"/>
						</InputGroup>
						{/*User*/}
						{!user ? <NavLink 
							className="fs-5 user-menu rounded-circle" 
							to={`${location.pathname}auth`}
							state={{ backgroundLocation: location }}>
							<FaRegUser/>
						</NavLink>
							: <UserDropDown handlerLogout={handlerLogout} />
						}
						{/*Adress*/}
						<div className="fs-4 px-3 header__btn_light align-items-center rounded-pill d-none d-sm-flex">
							<HiOutlineLocationMarker/>
							<div className="d-flex flex-column ms-2 header__description">
								<span className="lh-1 fw-bold">Доставка:</span>
								<span className="lh-2">Додати адресу</span>
							</div>
						</div>
						{/*Cart*/}
						<div className="btn_orange py-2 px-3 d-flex align-items-center rounded-pill">
							<BsCart4 className="fs-5"/>
						</div>
					</div>
					{/*Adress for mobile*/}
					<div className="fs-1 align-items-center d-sm-none d-flex mt-4 w-100">
						<HiOutlineLocationMarker/>
						<div className="d-flex flex-column ms-2 header__description">
							<span className="lh-1 fw-bold">Доставка:</span>
							<span className="lh-2">Додати адресу</span>
						</div>
					</div>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;