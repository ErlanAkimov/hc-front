import React, { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

interface Props {
    item: {
        name: string;
        link: string[];
        icon: React.ReactNode;
    };
}

const NavItem: React.FC<Props> = ({ item }) => {
    const location = useLocation();
    const [isActivePath, setIsActivePath] = useState<boolean>(false);

    useEffect(() => {
        if (item.link.includes(location.pathname)) {
            setIsActivePath(true);
        } else {
            setIsActivePath(false);
        }
    }, [location.pathname]);
    return (
        <Link to={item.link[0]}>
            <motion.div className={isActivePath ? styles.activeNavItem : styles.navItem}>
                <div className={styles.navItemSvgBlock}>{item.icon}</div>
                <p className={styles.navItemName}>{item.name}</p>
            </motion.div>
        </Link>
    );
};

export default NavItem;
