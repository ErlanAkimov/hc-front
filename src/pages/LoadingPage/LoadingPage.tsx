import React, { useEffect, useState } from "react";
import styles from "./LoadingPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoader } from "../../redux/slices/appSlice";
import { AnimatePresence, motion } from "motion/react";
import { HashCashLogoIcon } from "../../components/icons";

const LoadingPage: React.FC = () => {
    const [width, setWidth] = useState<string>("0%");
    const app = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(setLoader(false)), 1500);
        setTimeout(() => setWidth("100%"), 1);
    }, []);

    return (
        <AnimatePresence>
            {app.loader && (
                <motion.div exit={{ opacity: 0 }} className={styles.wrapper}>
                    <HashCashLogoIcon />

                    <div className={styles.progress}>
                        <div className={styles.progress__line} style={{ width }}></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingPage;
