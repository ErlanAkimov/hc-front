import { createSlice } from "@reduxjs/toolkit";
import { ILeaderboardItem } from "../../components/LeaderboardCard/LeaderboardCard";

export interface IAppSlice {
    loader: boolean;
    searchPoolModal: boolean;
    leaderboardList: ILeaderboardItem[];
}

const initialState: IAppSlice = {
    loader: true,
    searchPoolModal: false,
    leaderboardList: [],
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setSearchPoolModal: (state, action) => {
            state.searchPoolModal = action.payload;
        },
        setLeaderboard: (state, action) => {
            state.leaderboardList = action.payload;
        },
    },
});

export const { setLoader, setLeaderboard, setSearchPoolModal } = appSlice.actions;
export default appSlice.reducer;
