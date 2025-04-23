import React from "react";
import styles from "./Pool.module.scss";
import { HashCashLogoIcon } from "../../components/icons";

const TxInProgress: React.FC<{ setIsClose: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsClose }) => {
    const handleCloseMe = () => {
        setIsClose(false);
    };
    return (
        <div className={styles.txInProgress}>
            <div className={styles.logoBlock}>
                <HashCashLogoIcon />
            </div>
            <h3 className={styles.txText}>Your transaction in progress.</h3>
            <button onClick={handleCloseMe}>Close</button>
        </div>
    );
};

export default TxInProgress;
