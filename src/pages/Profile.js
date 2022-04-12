import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from '../components/CustomInput'
import CustomRadioBtn from "../components/CustomRadioBtn";
import { getUserData, updateUserData, updateUserEmail } from "../redux/actions";

const Profile = () => {
	const user = useSelector(state => state.user.user);
	const address = useSelector(state => state.user.personl.address);
	const contacts = useSelector(state => state.user.personl.contacts);
	const dispatch = useDispatch();

	/*get personal data*/
	useEffect(() => {
		dispatch(getUserData(user));
	}, [])

	/*update state after changes address and contacts*/
	useEffect(() => {
		setContactsData(contacts)
		setAddressData(address)
	}, [address, contacts])

	/*Contacts*/
	const [email, setEmail] = useState(user.email)

	/*Adress*/
	const [addressData, setAddressData] = useState(contacts)

	/*Contacts Data*/
	const [contactsData, setContactsData] = useState(contacts)

	function updateEmail(e){
		e.preventDefault();
		dispatch(updateUserEmail(user, email))
		setEmail(email)
	}
	function updateDataContacts(e){
		e.preventDefault();
		dispatch(updateUserData(user, {contacts: contactsData}))
	}
	function updateDataAddress(e){
		e.preventDefault();
		if(addressData.addressType === 'flat') {
			dispatch(updateUserData(user, {address: addressData}))
		} else {
			delete addressData.flat
			dispatch(updateUserData(user, {address: addressData}))
		}
	}

	return (		
		<div>
			<section className="settigns__section p-4">
				<h2>Персональні дані</h2>
				<hr className="line my-3" />
				<p>Будь ласка, заповніть всі поля, аби ми знали, як до вас звертатись, та готували пропозиції, які вас зацікавлять</p>
				<Form onSubmit={updateDataContacts}>
					<div className="d-flex gap-3 custom-radio">
						<CustomRadioBtn 
							text='ЧОЛ.' 
							id='male' 
							name='sex'
							isChaked={contactsData.sex === 'male'}
							handlerChange={(e) => {
								setContactsData({...contactsData, sex: 'male'})
							}}
						/>
						<CustomRadioBtn 
							text='ЖІН.' 
							id='female' 
							name='sex'
							isChaked={contactsData.sex === 'female'}
							handlerChange={(e) => {
								setContactsData({...contactsData, sex: 'female'})
							}}
						/>
					</div>
					<div className="mt-4 row gap-4">
						<div className="col-lg-4 col-12">
							<CustomInput 
								text={`Ім'я`}
								value={contactsData.firstName ?? ''}
								handlerChange={(e) => {
									setContactsData({...contactsData, firstName: e.target.value})
								}}
								name={'name'} 
								isRequired={false} 
							/>
							<div className="mt-4">
								<CustomInput 
									text={`Прізвище`} 
									name={'name'} 
									isRequired={false}
									value={contactsData.secondName ?? ''}
									handlerChange={(e) => {
									setContactsData({...contactsData, secondName: e.target.value})
								}}
								/>
							</div>
						</div>
						<div className="col-lg-4 col-12">
							<CustomInput 
								text={`По батькові`} 
								name={'name'} 
								isRequired={false}
								value={contactsData.surname ?? ''}
								handlerChange={(e) => {
									setContactsData({...contactsData, surname: e.target.value})
								}}
							/>
							<div className="mt-4">
								<CustomInput 
									type='date' 
									text={`Дата народження`} 
									name={'date'} 
									isRequired={false}
									value={contactsData.dateBirth ?? ''}
									handlerChange={(e) => {
										setContactsData({...contactsData, dateBirth: e.target.value})
									}} 
								/>
							</div>
						</div>
					</div>
					<Button 
						type='submit' 
						className="mt-5 btn_orange rounded-pill py-2 px-3"
						disabled={JSON.stringify(contacts) === JSON.stringify(contactsData)}
					>Зберегти</Button>
				</Form>
			</section>
			<section className="settigns__section p-4 mt-4">
				<h2>Контактні дані</h2>
				<hr className="line mt-3" />
				<Form onSubmit={updateEmail}>
					<div className="mt-4">
						<CustomInput 
							value={user.phoneNumber} 
							text={`Мобільний номер`}
							name={'phone'} 
							isDisabled={true} 
						/>
						<div className="mt-4">
							<CustomInput 
								text={`Електронна адреса`} 
								name={'email'}
								value={email ?? ''}
								handlerChange={(e) => setEmail(e.target.value)}
								type='email' />
						</div>
					</div>
					<Button 
						type='submit'
						disabled={email === user.email}
						className="mt-5 btn_orange rounded-pill py-2 px-3"
					>Зберегти</Button>
				</Form>
			</section>
			<section className="settigns__section p-4 mt-4">
				<h2>Адреса</h2>
				<hr className="line mt-3" />
				<Form onSubmit={updateDataAddress}>
					<div 
						className="mt-4 d-flex flex-lg-row flex-column gap-3">
						<div>
							<input 
								className="form-check-input me-2" 
								type="radio" 
								name="address"
								value={'flat'}
								id="flat"
								checked={addressData.addressType === 'flat'}
								onChange={(e) => {
									setAddressData({...addressData, addressType: e.target.value})
								}}
							/>
							<label className="form-check-label" htmlFor="flat">
								БАГАТОКВАРТИРНИЙ БУДИНОК
							</label>
						</div>
						<div>
							<input 
								className="form-check-input me-2" 
								type="radio" 
								name="address" 
								id="house"
								value={'house'}
								checked={addressData.addressType === 'house'}
								onChange={(e) => {
									setAddressData({...addressData, addressType: e.target.value})
								}}
							/>
							<label className="form-check-label" htmlFor="house">
								ПРИВАТНИЙ БУДИНОК
							</label>
						</div>
					</div>
					<div className="mt-4">
						<div className="w-100 row">
							<div className="col-lg-4 col-12">
								<CustomInput 
									text={`Область`} 
									name={'region'}
									value={addressData.region ?? ''}
									handlerChange={(e) => {
										setAddressData({...addressData, region: e.target.value})
									}}
								/>
							</div>
							<div className="col-lg-4 col-12">
								<CustomInput 
									text={`Населений пункт`} 
									name={'town'}
									value={addressData.town ?? ''}
									handlerChange={(e) => {
										setAddressData({...addressData, town: e.target.value})
									}}
								/>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-4 col-12">
								<CustomInput 
									text={`Вулиця`} 
									name={'street'}
									value={addressData.street ?? ''}
									handlerChange={(e) => {
										setAddressData({...addressData, street: e.target.value})
									}}
								/>
							</div>
							<div className="col-lg-4 col-12 d-flex flex-lg-row flex-column gap-4">
								<div>
									<CustomInput 
										text={`Будинок`}
										name={'house-input'}
										value={addressData.house ?? ''}
										handlerChange={(e) => {
											setAddressData({...addressData, house: e.target.value})
										}}
									/>
								</div>
								{addressData.addressType === 'flat' 
									? <div >
										<CustomInput 
											text={`Квартира`} 
											name={'flat-input'}
											value={addressData.flat ?? ''}
											handlerChange={(e) => {
												setAddressData({...addressData, flat: e.target.value})
											}}
										/>
									</div>
									: ''}					
								<div>
									<CustomInput 
										text={`Індекс`} 
										name={'index'}
										value={addressData.index ?? ''}
										handlerChange={(e) => {
											setAddressData({...addressData, index: e.target.value})
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<Button 
						type='submit' 
						className="mt-5 btn_orange rounded-pill py-2 px-3"
						disabled={JSON.stringify(address) === JSON.stringify(addressData)}
					>Зберегти</Button>
				</Form>
			</section>
		</div>
	);
}
 
export default Profile;