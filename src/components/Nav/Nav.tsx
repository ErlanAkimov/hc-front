import React from "react";
import styles from "./Nav.module.scss";
import navItems from "./NavIcons";
import NavItem from "./NavItem";

const Nav: React.FC = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.navInner}>
                {navItems.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Nav;
