import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	count: null,
	currentDevice: null,
};

const groupsJewellerySlice = createSlice({
	name: 'jewelleryData',
	initialState,
	reducers: {
		setStateItems: (state, { payload }) => {
			state.count = payload.count;
			state.items = payload.rows;
		},
		setCurrentItem: (state, { payload }) => {
			state.currentDevice = payload;
		},
		addItem: (state, { payload }) => {
			state.items.push(payload);
		},
		removeItem: (state, { payload }) => {
			const { itemId } = payload;
			state.items = state.items.filter((item) => item.id !== itemId);
		},
	}
})

export const { setStateItems, setCurrentItem, addItem, removeItem } = groupsJewellerySlice.actions;

export default groupsJewellerySlice.reducer;