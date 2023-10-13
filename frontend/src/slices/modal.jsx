import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	typeOfModal: null
}

const modalSlice = createSlice({
	name: 'modalData',
	initialState, 
	reducers: {
		openModal: (state, { payload }) => {
			state.isOpen = true;
			state.typeOfModal = payload.typeOfModal;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.typeOfModal = null;
		}
	}
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;