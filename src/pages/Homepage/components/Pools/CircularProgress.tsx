import React from "react";
import styles from './Pools.module.scss'

const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
        <div className={styles.percentage}>
            <svg width="33" height="33" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(49, 209, 88, 0.08)" strokeWidth="16" />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="rgba(49, 209, 88, 1)"
                    strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                />
            </svg>
			<p style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: "translate(-50%, -50%)",
				color: 'rgba(49, 209, 88, 1)',
				fontSize: 10,

			}}>{percentage}</p>
        </div>
    );
};

export default CircularProgress;
