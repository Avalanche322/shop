import { useEffect } from "react";
import { Container, Accordion, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchOrders, setOrder } from "../../redux/actions";
import OrdersPageItem from "../../components/Settings/OrdersPageItem";
import { useNavigate } from "react-router-dom";

const Orders = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const orders = useSelector(state => state.orders.orders);
	const loading = useSelector(state => state.app.loading);
	
	useEffect(() => {
		dispatch(fetchOrders());
	}, [])
	
	function handlerRepeatOrder(order) {
		dispatch(setOrder({price: order.price, weight: order.weight, products: order.products, message: order.message}))
		navigate('/cart')
	}

	return (
		<section className="w-100">
			<Container fluid='md'>
				{!loading && <div className="bg-white rounder-3 p-3">
					<h4>Мої замовлення</h4>
					<Accordion>
						{orders.map((order, i) => {
							return (
								<Accordion.Item key={order.orderId} eventKey={i}>
									<Accordion.Header>
										<div className="d-flex flex-sm-row flex-column gap-2">
											<span>Замовлення</span> 
											<span>{order.orderId}</span> 
											<span>{moment(order.data?.dateOrder).format('L')}</span>
										</div>
									</Accordion.Header>
									<Accordion.Body>
										{order.products.map(product => {
											return (
												<OrdersPageItem key={product.id} product={product} />
											)
										})}
										<p className="mb-1">Тип оплати: {order.typePayment?.type === 'card-on-web' 
											? 'Карткою на сайті' 
											: orders.typePayment?.type === 'card' 
											? 'Карткою при отримані' 
											: 'Готівкою'}
										</p>
										<p className="mb-1">Адресса: м.{order.address.town} вул.{order.address.street} 
											{order.address.house && <> буд.{order.address.house}</> }
											{order.address.flat && <> кв.{order.address.flat}</> }
										</p>
										<p className="mb-1">Дата і час: {order.date.dayDelivery} {order.date.timeDelivery}</p>
										<p>Сума: {order.price} грн</p>
										<Button 
											type="button"
											disabled={loading}
											className="btn_orange rounded-3 py-2 px-3 mt-3"
											onClick={() => handlerRepeatOrder(order)}
										>
											Повторити
										</Button>
									</Accordion.Body>
								</Accordion.Item>
							)
						})}
					</Accordion>
				</div>}
			</Container>
		</section>
	);
}
 
export default Orders;