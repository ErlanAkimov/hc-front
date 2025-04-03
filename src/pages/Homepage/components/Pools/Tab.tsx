import React, { SetStateAction, useState } from "react";
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

const Tabs: React.FC = () => {
    const [picked, setPicked] = useState<string>(tabs[0].text);
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <Tab picked={picked} text={tab.text} setPicked={setPicked} />
            ))}
        </div>
    );
};

export default Tabs;

interface ITabProps {
    text: string;
    picked: string;
    setPicked: React.Dispatch<SetStateAction<string>>;
}

function Tab({ text, picked, setPicked }: ITabProps) {
    return (
        <div onClick={() => setPicked(text)} className={picked === text ? styles.tabActive : styles.tab}>
            {text}
        </div>
    );
}
