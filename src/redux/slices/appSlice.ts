import { createSlice } from "@reduxjs/toolkit";

export interface IAppSlice {
	loader: boolean;
}

const appSlice = createSlice({
	name: 'app',
	initialState: {
		loader: true,
	},
	reducers: {
		setLoader: (state, actions) => {
			state.loader = actions.payload;
		}
	}
})

export const {
	setLoader,
} = appSlice.actions;
export default appSlice.reducer;