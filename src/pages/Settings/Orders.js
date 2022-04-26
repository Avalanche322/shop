import { useEffect, useState } from "react";
import { Container, Accordion, Button } from "react-bootstrap";
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
	const userId = useSelector(state => state.user.user.uid);
	const [countOrders, setCountOrders] = useState(7);
	
	useEffect(() => {
		dispatch(fetchOrders(countOrders, userId));
	}, [])
	function handlerPagination() {
		setCountOrders(countOrders + 7);
		dispatch(fetchOrders(countOrders + 7, userId));
	}
	
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
						{orders.content.map((order, i) => {
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
					{orders.lengthOrders !== orders.content.length && <button onClick={handlerPagination}>Показати ще</button>}
				</div>}
			</Container>
		</section>
	);
}
 
export default Orders;