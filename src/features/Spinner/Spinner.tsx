import React from "react";
import styles from "./Spineer.module.scss";

const Spinner = () => {
    return (
        <div  className={styles.spinner}>
            <div className={styles.spinner__bar}></div>
        </div>
    );
};

export default Spinner;