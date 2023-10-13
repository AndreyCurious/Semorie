import { configureStore } from "@reduxjs/toolkit";
import typesReducer from './types';
import jewelleryReducer from "./jewellery";
import groupReducer from "./groups"
import modalReducer from "./modal"

export default configureStore({
	reducer: {
		typesData: typesReducer,
		jewelleryData: jewelleryReducer,
		groupsData: groupReducer,
		modalData: modalReducer,
	},
})