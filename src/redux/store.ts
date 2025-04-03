import { configureStore } from "@reduxjs/toolkit";
import appReducer, { IAppSlice } from "./slices/appSlice";

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export type RootState = {
    app: IAppSlice;
};

export type AppDispatch = typeof store.dispatch;
export default store;
