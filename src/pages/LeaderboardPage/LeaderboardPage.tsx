import React, { useState } from "react";
import styles from "./LeaderboardPage.module.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";

const LeaderboardPage: React.FC = () => {
    const [leaderboardType, setLeaderboardType] = useState<number>(0);
    return (
        <div className={styles.lbpage}>
            <div className={styles.tabs}>
                {
                    // prettier-ignore
                    ["Creators", "Traders", "Points"].map((t, i) => <LeaderboardType handler={setLeaderboardType} i={i} picked={leaderboardType} type={t} key={i} />)
                }
            </div>

            {leaderboardType === 0 && (
                <>
                    <div className={styles.titles}>
                        <div className="page-title-block">
                            <h1 className="gr-title">Leaderboard </h1>
                            <p style={{ fontSize: 22 }}>🏆</p>
                        </div>
                        <div className="gr-subtitle">Top Profitable Creators</div>
                    </div>

                    <div className={`${styles.tabs} ${styles.tabs2}`}>
                        <button className={styles.activeTab}>Daily</button>
                        <button className={styles.tab}>Weekly</button>
                        <button className={styles.tab}>All Time</button>
                    </div>

                    <div className={styles.list}>
                        <LeaderboardCard />
                        <LeaderboardCard />
                        <LeaderboardCard />
                        <LeaderboardCard />
                    </div>
                </>
            )}

            {leaderboardType === 2 && (
                <div className={styles.points}>
                    <div className={styles.points_list}>
                        {["", "", ""].map((_, i) => (
                            <Top3LeaderboardItem key={i} l={window.Telegram.WebApp.initDataUnsafe.user} />
                        ))}

                        {["", "", ""].map((_, i) => (
                            <LeaderboardItem key={i} l={window.Telegram.WebApp.initDataUnsafe.user} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderboardPage;

function LeaderboardItem({ l }: { l: any }) {
    return (
        <div className={styles.p_list_item}>
            <img src={l.photo_url} alt="" />
            <h2 className={styles.username}>{l.username}</h2>
            <p className={styles.pointsValue}>200 points</p>
        </div>
    );
}

function Top3LeaderboardItem({ l }: { l: any }) {
    return (
        <div className={styles.top3item}>
            <img src={l.photo_url} alt="" />
            <h2 className={styles.username}>{l.username}</h2>
            <p className={styles.pointsValue}>200 points</p>
        </div>
    );
}

function LeaderboardType({
    type,
    picked,
    i,
    handler,
}: {
    handler: React.Dispatch<React.SetStateAction<number>>;
    type: string;
    picked: number;
    i: number;
}) {
    return (
        <button onClick={() => handler(i)} className={picked === i ? styles.activeTab : styles.tab}>
            {type}
        </button>
    );
}
