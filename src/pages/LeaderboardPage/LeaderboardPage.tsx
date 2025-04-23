import React, { useEffect, useState } from "react";
import styles from "./LeaderboardPage.module.scss";
import LeaderboardCard, { ILeaderboardItem } from "../../components/LeaderboardCard/LeaderboardCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { setLeaderboard } from "../../redux/slices/appSlice";

const LeaderboardPage: React.FC = () => {
    const [leaderboardType, setLeaderboardType] = useState<number>(0);
    const app = useAppSelector((state) => state.app);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!user.authToken) return;
            const { data } = await axios.get("https://api.hash-cash.io/v1/leaderboard/", {
                headers: { Authorization: `Token ${user.authToken}` },
            });
            dispatch(setLeaderboard(data.leaderboard));
        };

        if (app.leaderboardList.length === 0) {
            fetchLeaderboard();
        }
    }, [app, user]);

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
                        <button className={styles.tab}>
                            Weekly <span>soon</span>
                        </button>
                        <button className={styles.tab}>
                            All Time <span>soon</span>
                        </button>
                    </div>

                    <div className={styles.list}>
                        {app.leaderboardList.map((l, i) => (
                            <LeaderboardCard key={i} data={l} />
                        ))}
                    </div>
                </>
            )}
            {leaderboardType === 1 && <div className={styles.soon}>Soon</div>}

            {leaderboardType === 2 && (
                <div className={styles.points}>
                    <div className={styles.points_list}>
                        {[...app.leaderboardList]
                            .sort((a, b) => b.points - a.points)
                            .slice(0, 3)
                            .map((l, i) => (
                                <Top3LeaderboardItem key={i} l={l} />
                            ))}

                        {[...app.leaderboardList]
                            .sort((a, b) => b.points - a.points)
                            .slice(3)
                            .map((l, i) => (
                                <LeaderboardItem key={i} l={l} />
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
            <h2 className={styles.username}>{l.username || "hidden"}</h2>
            <p className={styles.pointsValue}>{l.points} points</p>
        </div>
    );
}

function Top3LeaderboardItem({ l }: { l: ILeaderboardItem }) {
    return (
        <div className={styles.top3item}>
            <img src={l.photo_url} alt="" />
            <h2 className={styles.username}>{l.username || "hidden"}</h2>
            <p className={styles.pointsValue}>{l.points} points</p>
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
