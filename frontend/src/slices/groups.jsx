import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	groups: [],
	currentGroup: null,
};

const groupsSlice = createSlice({
	name: 'groupsData',
	initialState,
	reducers: {
		setStateGroup: (state, { payload }) => {
			state.groups = payload;
		},
		addGroup: (state, { payload }) => {
			
			state.groups.unshift(payload);
		},
		setCurrentGroup: (state, { payload }) => {
			const { currentGroup } = payload;
			state.currentGroup = currentGroup;
		},
		removeGroup: (state, { payload }) => {
			console.log(payload)
			const { groupId } = payload;
			state.groups = state.groups.filter((group) => group.id !== groupId);
		},
	}
})

export const { setStateGroup, addGroup, setCurrentGroup, removeGroup } = groupsSlice.actions;

export default groupsSlice.reducer;

