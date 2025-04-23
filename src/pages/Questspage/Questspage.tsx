import React, { useState } from "react";
import styles from "./Questspage.module.scss";
import { CaseTaskIcon, PoolTaskIcon, ReferTaskIcon, SubTaskIcon, XTaskIcon } from "../../components/icons";
import { motion } from "motion/react";

const types = ["Projects", "Partners", "KOLS"];
const icons = [<SubTaskIcon />, <ReferTaskIcon />, <CaseTaskIcon />, <XTaskIcon />, <PoolTaskIcon />];

const Questspage: React.FC = () => {
    const [picked, setPicked] = useState<number>(0);

    return (
        <div className={styles.questspage}>
            <div>
                <h1 className="gr-title">Quests</h1>
                <p className="gr-subtitle">Complete Task and Earn Points </p>
            </div>

            <div className={styles.tabs}>
                {types.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setPicked(index)}
                        className={picked === index ? styles.activeTab : styles.tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.list}>
                {tasks.map((task, index) => (
                    <TaskItem task={task} key={index} />
                ))}{" "}
            </div>
        </div>
    );
};

export default Questspage;

function TaskItem({ task }: { task: any }) {
    const [isDone, setIsDone] = useState<boolean>(task.status === "done");

    const handleStart = () => {
        setIsDone(true);
    };

    return (
        <div className={styles.task}>
            <div className={styles.lside}>
                <div className={styles.iconblock}>{icons[task.icon_index]}</div>

                <div className={styles.textblock}>
                    <h2 className={styles.taskTitle}>{task.title}</h2>
                    <p className={styles.reward}>$HC {task.reward}</p>
                </div>
            </div>

            <motion.button
                onClick={handleStart}
                whileTap={{ scale: isDone ? 1 : 0.95 }}
                className={isDone ? styles.btnDone : styles.btn}
            >
                {task.booster && !isDone && <div className={styles.booster}>x{task.booster}</div>}

                {isDone ? "Not now!" : "Soon"}
            </motion.button>
        </div>
    );
}

var tasks = [
    {
        title: "Subscribe to Channel",
        reward: 50,
        type: "subscribe",
        icon_index: 0,
        status: "available",
        booster: null,
    },
    {
        title: "Refferal Task",
        reward: 100,
        type: "ref",
        icon_index: 1,
        status: "available",
        booster: null,
    },

    {
        title: "Case Icon Task",
        reward: 150,
        type: "ref",
        icon_index: 2,
        status: "available",
        booster: null,
    },
    {
        title: "X Task",
        reward: 200,
        type: "subscribe",
        icon_index: 3,
        status: "available",
        booster: null,
    },
    {
        title: "Pool Icon Task",
        reward: 250,
        type: "subscribe",
        icon_index: 4,
        status: "available",
        booster: null,
    },
    {
        title: "Refferal Task",
        reward: 100,
        type: "ref",
        icon_index: 1,
        status: "available",
        booster: null,
    },

    {
        title: "Case Icon Task",
        reward: 150,
        type: "ref",
        icon_index: 2,
        status: "done",
        booster: null,
    },
    {
        title: "X Task",
        reward: 200,
        type: "subscribe",
        icon_index: 3,
        status: "available",
        booster: null,
    },
    {
        title: "Pool Icon Task",
        reward: 250,
        type: "subscribe",
        icon_index: 4,
        status: "available",
        booster: null,
    },
    {
        title: "Refferal Task",
        reward: 100,
        type: "ref",
        icon_index: 1,
        status: "available",
        booster: null,
    },

    {
        title: "Case Icon Task",
        reward: 150,
        type: "ref",
        icon_index: 2,
        status: "available",
        booster: 6,
    },
    {
        title: "X Task",
        reward: 200,
        type: "subscribe",
        icon_index: 3,
        status: "available",
        booster: null,
    },
    {
        title: "Pool Icon Task",
        reward: 250,
        type: "subscribe",
        icon_index: 4,
        status: "available",
        booster: null,
    },
];
