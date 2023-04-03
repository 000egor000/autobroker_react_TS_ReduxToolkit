import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styleComponents/GlobalSc'
import {setupStore} from "./store/store";
import { Provider } from 'react-redux'


const store = setupStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
reportWebVitals()
