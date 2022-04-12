import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './redux/rootReducer';
import reportWebVitals from './reportWebVitals';
import './scss/styles.scss'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
))

root.render(
<React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
</React.StrictMode>);

reportWebVitals();
