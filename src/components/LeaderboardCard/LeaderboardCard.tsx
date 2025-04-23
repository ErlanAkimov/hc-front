import React, { CSSProperties } from "react";
import styles from "./LeaderboardCard.module.scss";
import Chart from "./Chart";

export interface ILeaderboardItem {
    user_id: string;
    photo_url: string;
    points: number;
    username: string;
    pnl: number; // за 30 дней
    winrate: number; // в единичном формате (10% === .1)
    trades: number;
    chart: [
        {
            x: number;
            y: number;
        },
    ];
}

const LeaderboardCard: React.FC<{ style?: CSSProperties; data: ILeaderboardItem | null }> = ({ style, data }) => {
    return (
        <div className={styles.card} style={style}>
            <div className={styles.topside}>
                <div className={styles.user}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div className={styles.imgBlock}>
                            {data && <img className={styles.avatar_img} src={data.photo_url} alt="" />}
                        </div>
                        <div>
                            <h2 className={`text-15`}>{data && (data.username || "Username hidden")}</h2>
                            <p className={styles.text}>{data && data.points}</p>
                        </div>
                    </div>

                    <div className={styles.pnl}>
                        <p className={styles.card_title} style={{ textAlign: "right" }}>
                            PnL 30d
                        </p>

                        <p
                            className={styles.pnl_value}
                            style={{ color: Number(data?.pnl) >= 0 ? "var(--color-green)" : "var(--color-red)" }}
                        >
                            {!data ? "0" : data.pnl.toFixed(2)} $
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.bottomside}>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.card_title}>Win Rate</div>
                        <div className={styles.stat_value}>{data && data.winrate * 100}%</div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.card_title}>Trades</div>
                        <div className={styles.stat_value}>{data && data.trades}</div>
                    </div>
                    {data && <Chart chart={data!.chart} width={134} height={53} />}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardCard;
