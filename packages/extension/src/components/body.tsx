import { useRawOrderContext } from "@/contexts/raw-order/hooks";
import { clsx } from "clsx";
import { formatCentsToDollars } from "shared/src/format";
import { assert } from "shared/src/function";
import styles from "./body.module.css";

export const Body = () => {
    const {
        isParsedMenuItemsLoading,
        isParsedMenuItemsPending,
        menuItems,
        refreshParsedMenuItems,
    } = useRawOrderContext();

    return (
        <div className={styles.body}>
            <div className={styles.bodyDescription}>
                <div className={styles.bodyTitle}>Your order:</div>
                <button
                    className={styles.bodyRefresh}
                    onClick={() => {
                        refreshParsedMenuItems({ refresh: true });
                    }}
                >
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
                        {menuItems.map((menuItem, index) => (
                            <div key={index} className={styles.bodyItem}>
                                <span>
                                    {menuItem.quantity} x {menuItem.name}
                                </span>
                                {menuItem.price !== null && (
                                    <>
                                        &nbsp;
                                        <span className={styles.bodyItemPrice}>
                                            (
                                            {`${formatCentsToDollars(menuItem.price)}`}
                                            )
                                        </span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })()}

            <div className={clsx(styles.bodyDescription, styles.bottom)}>
                <div className={clsx(styles.bodyTotalPrice)}>
                    <span className={styles.bodyTotalPriceLabel}>Total: </span>
                    <span className={styles.bodyTotalPriceDollarFigure}>
                        {(() => {
                            if (!menuItems) {
                                return "--";
                            }

                            if (menuItems.length === 0) {
                                return "0.00";
                            }

                            if (menuItems.some((item) => item.price === null)) {
                                return "--";
                            }

                            const total = menuItems?.reduce((acc, next) => {
                                assert(
                                    next.price !== null,
                                    "price must be defined",
                                );
                                return acc + next.price;
                            }, 0);

                            return formatCentsToDollars(total);
                        })()}
                    </span>
                </div>
            </div>
        </div>
    );
};
