import { configureStore } from "@reduxjs/toolkit";
import appReducer, { IAppSlice } from "./slices/appSlice";
import userReducer, { IUserSlice } from "./slices/userSlice";

const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
    },
});

export type RootState = {
    app: IAppSlice;
    user: IUserSlice;
};

export type AppDispatch = typeof store.dispatch;
export default store;
