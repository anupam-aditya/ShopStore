import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
	cart: [],
	orders: [],
	filter: "All",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const changeFilter = (item) => {
		dispatch({
			type: "FILTER_ITEMS",
			payload: item,
		});
	};
	const addItemToCartList = (item) => {
		dispatch({
			type: "ADD_ITEM_IN_CART",
			payload: item,
		});
	};

	const removeItemFromCartList = (item) => {
		dispatch({
			type: "REMOVE_ITEM_IN_CART",
			payload: item,
		});
	};

	const clearCart = () => {
		dispatch({
			type: "CLEAR_CART",
		});
	};

	const addItemToOrderList = (item) => {
		dispatch({
			type: "ADD_ITEM_IN_ORDER",
			payload: item,
		});
	};

	const removeItemFromOrderList = (item) => {
		dispatch({
			type: "REMOVE_ITEM_IN_ORDER",
			payload: item,
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				cart: state.cart,
				orders: state.orders,
				filter: state.filter,
				addItemToCartList,
				removeItemFromCartList,
				clearCart,
				addItemToOrderList,
				removeItemFromOrderList,
				changeFilter,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
