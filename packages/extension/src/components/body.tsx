import { useRawOrderContext } from "@/contexts/raw-order/hooks";
import { clsx } from "clsx";
import styles from "./body.module.css";

export const Body = () => {
    const { rawContent } = useRawOrderContext();

    return (
        <div className={styles.body}>
            <div className={styles.bodyTitle}>Your order:</div>

            {rawContent === undefined ? (
                <div className={clsx(styles.bodyContent, styles.loading)}>
                    <div className={styles.bodyLoader}>Loading...</div>
                </div>
            ) : (
                <div className={styles.bodyContent}>{rawContent}</div>
            )}
        </div>
    );
};
