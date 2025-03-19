// components/Header.tsx
"use client";
import styles from "./Header.module.scss";

type HeaderProps = {
    isBlurred: boolean;
};

const Header = ({ isBlurred }: HeaderProps) => {
    return (
        <header className={`${styles.header} ${isBlurred ? styles.blurred : ""}`}>
            <h1 className={styles.logo}>World Dashbord</h1>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <a href="#" className={styles.navItem}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.navItem}>
                            Market
                        </a>
                    </li>
                    <li>
                        <a href="#" className={styles.navItem}>
                            About
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
