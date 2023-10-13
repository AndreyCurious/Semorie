import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	types: [],
	currentType: null,
};

const typesSlice = createSlice({
	name: 'typesData',
	initialState,
	reducers: {
		setStateType: (state, { payload }) => {
			state.types = payload;
		},
		addType: (state, { payload }) => {
			state.types.unshift(payload);
		},
		setCurrentType: (state, { payload }) => {
			const { currentType } = payload;
			state.currentType = currentType;
		},
		removeType: (state, { payload }) => {
			const { typeId } = payload;
			state.types = state.types.filter((type) => type.id !== typeId);
		},
	}
})

export const { setStateType, addType, setCurrentType, removeType } = typesSlice.actions;

export default typesSlice.reducer;