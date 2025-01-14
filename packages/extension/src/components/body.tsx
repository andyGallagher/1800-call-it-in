import styles from "./body.module.css";

export const Body = () => {
    return (
        <div className={styles.body}>
            <div className={styles.bodyTitle}>Your order:</div>

            <div className={styles.bodyContent}>
                <div>
                    <div>2 x Cheeseburger</div>
                    <div>1 x Fries</div>
                    <div>3 x Soda</div>
                    <div>1 x Salad</div>
                </div>
            </div>
        </div>
    );
};
