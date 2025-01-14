import styles from "./footer.module.css";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerButtons}>
                <button className={styles.footerActionButton}>
                    Detect Order
                </button>

                <button className={styles.footerRefresh}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={styles.footerRefreshIcon}
                    >
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                </button>
            </div>
            <p className={styles.footerCopyright}>© 2025 1-800-call-it-in</p>
        </div>
    );
};
