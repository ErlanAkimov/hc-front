import { createSlice } from "@reduxjs/toolkit";

export interface IUserSlice {
    id: string;
    username: string;
    img: string;
    authToken: string;
}

const initialState: IUserSlice = {
    id: "",
    username: "",
    img: "",
    authToken: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.user.id;
            state.username = action.payload.user.username;
            state.img = action.payload.user.img;
            state.authToken = action.payload.token;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
