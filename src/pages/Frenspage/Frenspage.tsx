import React, { useState } from "react";
import styles from "./Frenspage.module.scss";
import { FrendsStepsIcon1, FrendsStepsIcon2, FrendsStepsIcon3 } from "../../components/icons";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";

const faqSteps = [
    {
        text: "Invite frend (Get 100 points)",
        icon: <FrendsStepsIcon1 />,
    },
    {
        text: "Get points for each referral. The referral will receive bonuses on their balance.",
        icon: <FrendsStepsIcon2 />,
    },
    {
        text: "Get additional bonuses for the activity of each of your friends",
        icon: <FrendsStepsIcon3 />,
    },
];

const Frenspage: React.FC = () => {
    const [picked, setPicked] = useState<number>(0);

    const handleInviteFren = () => {
        // prettier-ignore
        window.Telegram.WebApp.openTelegramLink(`https://t.me/share?url=https://t.me/HashCashFlowBot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}`)
    };

    return (
        <div className={styles.frenspage}>
            <h1 className="gr-title">Frends</h1>
            <p className="gr-subtitle">Invite frens to earn points</p>

            <div className={styles.tabs}>
                <button onClick={() => setPicked(0)} className={picked === 0 ? styles.activeTab : styles.tab}>
                    Invite
                </button>
                <button onClick={() => setPicked(1)} className={picked === 1 ? styles.activeTab : styles.tab}>
                    My Friends
                </button>
                <button onClick={() => setPicked(2)} className={picked === 2 ? styles.activeTab : styles.tab}>
                    Subscribers
                </button>
            </div>
            {picked === 0 && (
                <>
                    <div className={styles.points}>
                        <h2 className={styles.points_value}>200</h2>
                        <p>
                            <span>HC</span>-points
                        </p>
                    </div>

                    <h1 className="gr-title">How it works?</h1>
                    <p className="gr-subtitle">Invite frens to earn points</p>

                    <div className={styles.steps}>
                        {faqSteps.map((step, i) => {
                            return (
                                <div key={i} className={styles.step}>
                                    <div className={styles.circle}>
                                        {step.icon}
                                        {i < 2 && <div className={styles.line}></div>}
                                    </div>

                                    <p className={styles.text}>{step.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {picked !== 0 && (
                <div className={styles.frensList}>
                    {["", "", "", "", "", ""].map(() => (
                        <LeaderboardCard />
                    ))}
                </div>
            )}

            <button className={styles.inviteBtn} onClick={handleInviteFren}>
                Invite friends
            </button>
        </div>
    );
};

export default Frenspage;
