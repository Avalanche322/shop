const CustomInput = ({
	value, 
	handlerChange, 
	text, 
	name, 
	type='input', 
	isDisabled=false, 
	isRequired=true
}) => {
	return (
		<div className="position-relative pt-3 custom-input">
			<input 
				type={type} 
				className="custom-input__field fs-6" 
				onChange={handlerChange}
				placeholder={text} 
				name={name}
				id={name}
				value={value}
				disabled={isDisabled}
				required={isRequired} />
			<label htmlFor={name} className="custom-input__label fs-6">{text}</label>
		</div>
	);
}
 
export default CustomInput;