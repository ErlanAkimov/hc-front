import React, { useEffect, useState } from "react";
import styles from "./Nav.module.scss";
import navItems from "./NavIcons";
import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";

const Nav: React.FC = () => {
    const location = useLocation();
    const [display, setDisplay] = useState<string>("initial");

    useEffect(() => {
        if (location.pathname.startsWith("/create-pool")) {
            setDisplay("none");
        } else {
            setDisplay("flex");
        }
    }, [location.pathname]);

    return (
        <div className={styles.nav} style={{ display }}>
            <div className={styles.navInner}>
                {navItems.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Nav;
