import { Container, Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsCartX, BsCart4 } from "react-icons/bs"
import { Link } from "react-router-dom";
import CartPageItem from "../components/Cart/CartPageItem";
import { removeOrder, setOrder } from "../redux/actions";

const Cart = () => {
	const order = useSelector(state => state.orders.currentOrder)
	const dispatch = useDispatch();

	function handlerRemoveOrder(){
		dispatch(removeOrder())
	}
	function handlerMessage(e){
		dispatch(setOrder({message: e.target.value}))
	}

	return (
		<section className={`cart ${!order.products.length && 'mb-5'}`}>
			<Container fluid='md' className="d-flex flex-lg-row flex-column gap-3">
				<div className={`cart__content ${!order.products.length && 'mb-5 cart__content_empty'}`}>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h4>Кошик</h4> 
						{!!order.products.length && <Button 
							onClick={() => handlerRemoveOrder()}
							className="cart__btn_light rounded-pill px-3 d-flex align-items-center gap-1">
							<BsCartX/>
							Очистити кошик
						</Button>}
					</div>
					{!(order.price - 49 >= 300) &&  <Alert variant="secondary">
						<Alert.Heading>
							Мінімальна сума для замовлення 300.00 грн. 
							{!!(order.price - 49) && `Додайте товарів на суму ${(300 - (order.price - 49)).toFixed(2)} грн.`}
						</Alert.Heading>
					</Alert>}
					{!!order.products.length && 
					<>
						<div className="d-flex flex-column gap-2 align-items-lg-stretch align-items-center">
							{order.products.map(item => {
								return (
									<CartPageItem key={item.id} item={item} />
								)
							})}
						</div>
						<div className="mt-4">
							<h4>Пакування</h4>
							<div className="cart__packaging bg-white p-3 rounded-3 mt-3">
								Ми – екодрузі, тому використовуємо мінімум пластику.
								Фірмові пакетики коштують як у магазині. Їх вартість додамо у чек
							</div>
						</div>
					</>}
					{!order.products.length && 
						<div className="bg-white rounden-3 shadow w-100 h-100 d-flex justify-content-center align-items-center text-center">
							<div className="p-2 cart__not-products not-products-cart">
								<div className="not-products-cart__logo rounded-circle">
									<BsCart4 />
								</div>
								<p className="my-4">У вашому кошику немає товарів</p>
								<Link to='/' className="btn_orange py-2 px-3 rounded-pill d-inline-block">
									Обрати товари
								</Link>
							</div>
						</div>
					}
				</div>
				{!!order.products.length && <aside className="cart__sibebar bg-white h-100 p-3 rounded-3">
					<p>Доставка: <span className="fw-bold">49,00 грн</span></p>
					<p className="fw-bold">Всього: <span>{order.price.toFixed(2)} грн</span></p>
					<p>Вага з супутнім пакованням: <span className="fw-bold">{order.weight} кг</span></p>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label>Коментар до замовлення</Form.Label>
						<Form.Control 
							value={order.message} 
							onChange={handlerMessage} 
							as="textarea" 
							rows={3}
						>
						</Form.Control>
					</Form.Group>
					<div className="text-center">
						<Link 
							to='/checkout' 
							className={`btn_orange py-2 px-5 rounded-pill mt-2 d-inline-block ${!(order.price - 49 >= 300) ? 'btn-disabled_orange' : ''}`}
							>
							Далі
						</Link>
					</div>
				</aside>}
			</Container>
		</section>
	);
}
 
export default Cart;