import React, { SetStateAction } from "react";
import styles from "./Pools.module.scss";

const tabs = [
    {
        index: 0,
        text: "👀 Top",
    },
    {
        index: 1,
        text: "🌱 New",
    },
    {
        index: 2,
        text: "🚀 Run",
    },
    {
        index: 3,
        text: "👀 Closed",
    },
];

const Tabs: React.FC<{
    pickedTab: number;
    setPickedTab: React.Dispatch<SetStateAction<number>>;
}> = ({ pickedTab, setPickedTab }) => {
    const handlePickTab = (index: number) => {
        setPickedTab(index);
    };
    return (
        <div className={styles.tabs}>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => handlePickTab(index)}
                    className={pickedTab === index ? styles.tabActive : styles.tab}
                >
                    {tab.text}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
