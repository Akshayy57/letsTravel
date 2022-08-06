import React, { useState } from 'react';
import ContextApi from './context-api';

const ContextProvider = (props) => {

	const [state, setState] = useState([]);

	const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'ADD_HOTEL':
				setState({ ...state, hotel: payload.addHotel });
				break;
			case 'LOGIN': {
				setState({ ...state, login: payload.login, label: 'login', path: '/', loginCreds: payload.loginCreds });
				break;
			}
			case 'REGISTER': {
				setState({ ...state, register: payload.register, label: 'register', path: '/' });
				break;
			}
			case 'LOGIN_TOKEN': {
				setState({ ...state, creds: payload.creds });
				break;
			}
			case 'BOOKING': {
				setState({ ...state, booking: payload.hotel, subTotal: payload.subTotal });
				break;
			}
			case 'BOOKING_HISTORY': {
				setState({ ...state, path: '/history'});
				break;
			}
			default:
				return;
		}
	};

	return (
		<ContextApi.Provider
			value={{ state, dispatchUserEvent }}
		>
			{props.children}
		</ContextApi.Provider>
	);
}

export default ContextProvider;
