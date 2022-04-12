import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import bannerImg from "../img/delivery_basket.png"

function HomeBanner() {
	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey);

		return (
			<button
				type="button"
				className="home-banner__btn rounded-pill px-3 py-2 w-100"
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	}

	return (
		<div className="home-banner">
			<Accordion defaultActiveKey="0">
				<Card className="border-0 p-3">
					<Card.Header className="home-banner__header border-0 d-flex align-items-center flex-md-row flex-column">
						<div className="home-banner__img me-4">
							<img src={bannerImg} alt="banner img" />
						</div>
						<div>
							<h2>Інтернет магазин доставки товарів FoodShop</h2>
							<p>Планова та швидка доставка товарів мережі магазинів FoodShop по всій Україні, унікальний асортимент товарів власного імпорту, бонусна програма Власний рахунок, турбота про кожного Гостя - все це та багато іншого доступно у нашому інтернет магазині продуктів FoodShop.</p>
						</div>
					</Card.Header>
					<Accordion.Collapse eventKey="0" className="home-banner__body border-0">
						<Card.Body className="row gap-3">
							<div className="col-md col-12">
								<h3>Планова та швидка доставка FoodShop</h3>
								<p>При виборі планової доставки Сільпо наші Гості мають змогу ознайомитись з більш широким ассортиментом товарів, а також додати набагато більше товарів у своє замовлення. Основною перевагою швидкої доставки Сільпо є можливість отримати замовлення продуктів у найближчий час.</p>
							</div>
							<div className="col-md col-12">
								<h3>Власний імпорт FoodShop</h3>
								<p>Унікальний асортимент товарів власного імпорту мережі Сільпо ви також можете побачити в нашому інтернет магазині, обравши планову чи швидку доставку.</p>
							</div>
						</Card.Body>
					</Accordion.Collapse>
					<Card.Footer className="home-banner__footer border-0">
						<CustomToggle eventKey="0">Читати все</CustomToggle>
					</Card.Footer>
				</Card>
			</Accordion>
		</div>
	);
}

export default HomeBanner;