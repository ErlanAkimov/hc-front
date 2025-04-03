import React from "react";
import styles from "./Pools.module.scss";

import btcImage from "/btc-image.png";
import userImage from "/user-image.jpg";
import { CommentsIcon, LifeTimeIcon, PersonIcon, ShortIcon } from "../../../../components/icons";
import CircularProgress from "./CircularProgress";

const PoolCard: React.FC = () => {
    return (
        <div className={styles.poolcard}>
            <CircularProgress percentage={50} />
            <div className={styles.topside}>
                <div className={styles.lside}>
                    <img src={btcImage} alt="" />
                    <ShortIcon />
                </div>

                <div className={styles.rside}>
                    <p className={styles.cardname}>Pool name</p>
                    <p className={styles.username}>
                        <img src={userImage} alt="" />
                        @bhh_funder{" "}
                    </p>
					<div className={styles.info}>
						<p>Lev: <span>x50</span></p>
						<p>Price: <span>Market</span></p>
						<p>Pool: <span>1000/90</span></p>
					</div>

					<div className={styles.details}>
						<p className={styles.type}>Short</p>
						<p>SL: <span>-15%</span></p>
						<p>TP: <span>300%</span></p>
					</div>
                </div>
            </div>

			<div className={styles.bottomside}>
				<div className={styles.poolInfo}>
					<p><LifeTimeIcon /> 8h</p>
					<p><PersonIcon /> 122</p>
					<p><CommentsIcon /> 83</p>
				</div>
				<button className={styles.join}>+ Join Pool</button>
			</div>
        </div>
    );
};

export default PoolCard;
