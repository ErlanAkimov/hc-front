import React from "react";
import styles from "./Background.module.scss";
import { BgSvgIcon } from "./bg-svg";

const Background: React.FC = () => {
    return (
        <div className={styles.bg}>
            <BgSvgIcon />
            <div className={styles.border} />
        </div>
    );
};

export default Background;
