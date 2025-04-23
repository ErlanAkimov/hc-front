import React, { useState } from "react";
import styles from "./CustomKeyboard.module.scss";
import { AnimatePresence, motion } from "motion/react";

const keyboardButtons = ["C", "", "Delete", "7", "8", "9", "4", "5", "6", "1", "2", "3", "", "0", "."];
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleAction: (value: string) => void;
}

const CustomKeyboard: React.FC<Props> = ({ isOpen, setIsOpen, handleAction }) => {
    const [value, setValue] = useState<string>("0");

    const handleInput = (key: string) => {
        if (key === "C") {
            setValue((prev) => (prev !== "0" ? prev.slice(0, -1) || "0" : prev));
        } else if (key === "Delete") {
            setValue("0");
        } else if (key === ".") {
            setValue((prev) => (prev.includes(".") ? prev : prev + "."));
        } else if (/^\d$/.test(key)) {
            setValue((prev) => (prev === "0" ? key : prev + key));
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleJoin = () => {
        handleAction(value);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.wrapper}>
                    <motion.div
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        className={styles.overlay}
                        onClick={handleClose}
                    />
                    <motion.div
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0, top: -15 }}
                        initial={{ opacity: 0, top: 15 }}
                        className={styles.keyboardModal}
                    >
                        <div className={styles.title}>Current balance</div>
                        <p className={styles.errorMessage}>asdfasdf</p>

                        <p className={styles.value}>{value} TON</p>
                        <div className={styles.labels}>
                            <p>3 TON</p>
                            <p>5 TON</p>
                            <p>50 TON</p>
                            <p>100 TON</p>
                        </div>

                        <div className={styles.btns}>
                            {keyboardButtons.map((btn, index) => (
                                <motion.button
                                    className={
                                        ["C", "Delete"].includes(btn)
                                            ? `${styles.yellow_btn} ${btn === "C" ? styles.c : styles.delete}`
                                            : styles.defaultBtn
                                    }
                                    onClick={() => handleInput(btn)}
                                    key={index}
                                    whileTap={{ scale: 0.7 }}
                                >
                                    {btn}
                                </motion.button>
                            ))}
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} className={styles.joinBtn} onClick={handleJoin}>
                            Join Pool
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CustomKeyboard;
