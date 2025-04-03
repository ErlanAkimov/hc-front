import React, { CSSProperties } from "react";
import styles from "./LeaderboardCard.module.scss";
import { PersonIcon } from "../icons";
import Chart from "./Chart";

const LeaderboardCard: React.FC<{ style?: CSSProperties }> = ({ style }) => {
    return (
        <div className={styles.card} style={style}>
            <div className={styles.topside}>
                <div className={styles.user}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <img
                            className={styles.avatar_img}
                            src={window.Telegram.WebApp.initDataUnsafe.user.photo_url}
                            alt=""
                        />
                        <div>
                            <h2 className={`text-15`}>Crypto Bull</h2>
                            <p className={styles.text}>
                                <PersonIcon />
                                122
                            </p>
                        </div>
                    </div>

                    <div className={styles.pnl}>
                        <p className={styles.card_title} style={{ textAlign: "right" }}>
                            PnL 30d
                        </p>
                        <p className={styles.pnl_value}>+ $ 122, 300</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottomside}>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.card_title}>Win Rate</div>
                        <div className={styles.stat_value}>78%</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.card_title}>Trades</div>
                        <div className={styles.stat_value}>137</div>
                    </div>
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default LeaderboardCard;
