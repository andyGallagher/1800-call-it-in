import { useRawOrderContext } from "@/contexts/raw-order/hooks";
import { clsx } from "clsx";
import { assert } from "shared/src/function";
import styles from "./body.module.css";

export const Body = () => {
    const { isParsedMenuItemsLoading, isParsedMenuItemsPending, menuItems } =
        useRawOrderContext();

    return (
        <div className={styles.body}>
            <div className={styles.bodyDescription}>
                <div className={styles.bodyTitle}>Your order:</div>
                <button className={styles.bodyRefresh}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={styles.bodyRefreshGlyph}
                    >
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                </button>
            </div>

            {(() => {
                if (isParsedMenuItemsPending) {
                    return (
                        <div
                            className={clsx(styles.bodyContent, styles.loading)}
                        >
                            <div className={styles.bodyLoader}>Parsing...</div>
                        </div>
                    );
                }

                if (isParsedMenuItemsLoading) {
                    return (
                        <div
                            className={clsx(styles.bodyContent, styles.loading)}
                        >
                            <div className={styles.bodyLoader}>
                                Loading order...
                            </div>
                        </div>
                    );
                }

                assert(menuItems !== undefined, "menuItems must be defined");
                if (!menuItems.length) {
                    return (
                        <div
                            className={clsx(styles.bodyContent, styles.loading)}
                        >
                            <div className={styles.bodyLoader}>
                                No items in order
                            </div>
                        </div>
                    );
                }

                return (
                    <div className={styles.bodyContent}>
                        {JSON.stringify(menuItems, null, 4)}
                    </div>
                );
            })()}
        </div>
    );
};
