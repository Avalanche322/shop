import { Form } from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";

const DateTime = ({
	setDay,
	setTime,
	typeAddress,
	timeDelivery,
	timeShop
}) => {
	const loading = useSelector(state => state.app.loading)
	return (
		<div>
		<h5>Дата і час</h5>
		<div className="bg-white rounder-3 p-3">
			<h6>Виберіть день та час</h6>
			<div className="d-flex flex-column flex-md-row gap-3 mt-3">
				<Form.Select
					className='checkout__field'
					disabled={loading}
					value={moment().hour() < 17 ? moment().format('L') : moment().add(1, 'days').format('L')} 
					onChange={(e) => setDay(e.target.value)}
				>
					{moment().hour() < 17 && 
						<option value={moment().format('L')}>Сьогодні</option>
					}
					<option value={moment().add(1, 'days').format('L')}>Завтра</option>
					<option value={moment().add(2, 'days').format('L')}>Після завтра</option>
				</Form.Select>
				<Form.Select
					className='checkout__field'
					value={'11'}
					disabled={loading}
					onChange={(e) => setTime(e.target.value)}
					>
					{typeAddress === 'delivery' && timeDelivery.map((time, i) => {
						return (
							<option key={time.value ?? i} value={time.text}>{time.text}</option>
						)
					})}
					{typeAddress === 'shop' && timeShop.map((time, i) => {
						return (
							<option key={time.value ?? i} value={time.text}>{time.text}</option>
						)
					})}
				</Form.Select>
			</div>
		</div>
	</div>
	);
}
 
export default DateTime;