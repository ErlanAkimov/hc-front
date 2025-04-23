import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.scss";
import LeaderboardCard, { ILeaderboardItem } from "../../components/LeaderboardCard/LeaderboardCard";
import Pools from "./components/Pools/Pools";
import Header from "../../components/Header/Header";
import Rates from "../../components/Rates/Rates";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLeaderboard } from "../../redux/slices/appSlice";

const Homepage: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const [leader, setLeader] = useState<ILeaderboardItem | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!user.authToken) return;

        axios
            .get("https://api.hash-cash.io/v1/leaderboard/", {
                headers: { Authorization: `Token ${user.authToken}` },
            })
            .then((res) => {
                dispatch(setLeaderboard(res.data.leaderboard));
                setLeader(res.data.leaderboard[0]);
            });
    }, [user]);

    return (
        <div className={styles.wrapper}>
            <Header isBlueBtn={true} />
            <Rates />

            <div className={styles.leaderboard}>
                <h2 className="gr-title">Leaderboard</h2>
                <p className="gr-subtitle">Check leaderboard</p>

                <LeaderboardCard data={leader} style={{ marginTop: 20 }} />
            </div>
            <Pools />
        </div>
    );
};

export default Homepage;
