import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Sidebar = ({handlerMessage}) => {
	const order = useSelector(state => state.orders.currentOrder)
	const loading = useSelector(state => state.app.loading);
	
	return (
		<aside className="bg-white h-100 p-4 rounded-3 checkout__sidebar">
			<p>Доставка: <span className="fw-bold">49,00 грн</span></p>
			<p className="fw-bold">Всього: <span>{order.price} грн</span></p>
			<p>Вага з супутнім пакованням:<span className="fw-bold">{order.weight} кг</span></p>
			<Form.Group className="mb-3" controlId="order-info">
				<Form.Label>Коментар до замовлення</Form.Label>
				<Form.Control 
					as="textarea" rows={3}
					value={order.message} 
					onChange={handlerMessage} />
			</Form.Group>
			<Button disabled={loading} type="submit" className="btn_orange rounded-pill py-2 px-3">
				Підтвердети
			</Button>
		</aside>
	);
}
 
export default Sidebar;