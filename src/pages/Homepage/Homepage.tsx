import React from "react";
import styles from "./Homepage.module.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import Pools from "./components/Pools/Pools";

const Homepage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <button className={styles.connect_button}>Connect wallet</button>

            <div className={styles.leaderboard}>
                <h2 className="gr-title">Leaderboard</h2>
                <p className="gr-subtitle">Check leaderboard</p>

                <LeaderboardCard style={{ marginTop: 20 }} />
            </div>

            <Pools />
        </div>
    );
};

export default Homepage;
