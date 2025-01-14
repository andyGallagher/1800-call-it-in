import styles from "./header.module.css";

export const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>1-800-call-it-in</h1>
            <div className={styles.headerBorder}></div>
        </div>
    );
};
