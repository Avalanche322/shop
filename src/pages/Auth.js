import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestOTP, verifyOTP } from "../redux/actions";
import CustomInput from "../components/CustomInput";

function Auth() {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const handleClose = () => navigate('/');
	const [phoneNumber, setPhoneNumber] = useState('+38');
	const [otp, setOtp] = useState('');
	const [otpForm, setOtpForm] = useState(false)

	function handelSubmit(e) {
		e.preventDefault();
		if(!otpForm) {
			dispatch(requestOTP(phoneNumber));
			setOtpForm(true)
		} else {
			dispatch(verifyOTP(otp));
			handleClose();
		}
		dispatch(requestOTP(phoneNumber));
	}	

	return (
		<Modal show onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Вхід / Реєстрація</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handelSubmit}>
				<Modal.Body>
					{!otpForm ? 
					<div className="mb-3">
						<CustomInput 
							value={phoneNumber} 
							text={`Номер телефону`} 
							handlerChange={(e) => setPhoneNumber(e.target.value)}
							name={'tel'} />
					</div>
				:	<div className="mb-3">
							<CustomInput 
								value={otp} 
								text={`OTP`} 
								handlerChange={(e) => setOtp(e.target.value)}
								name={'otp'} />
						</div>
					}
					
				</Modal.Body>
				<Modal.Footer>
					{!otpForm ?
						<Button type="submit" className=" btn_orange rounded-pill py-2 px-3" disabled={phoneNumber.length !== 13}>
							Продовжити
						</Button>
						: <Button type="submit" className=" btn_orange rounded-pill py-2 px-3" disabled={otp.length !== 6}>
							Увійти
						</Button>}
					<div id="recaptcha-container"></div>
			</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default Auth;