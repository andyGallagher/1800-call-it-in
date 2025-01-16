import { useOrderContext } from "@/contexts/order/hooks";
import { formatCentsToDollars } from "shared/src/format";
import styles from "./active-order.module.css";

const diffTimeInMinutes = (providedTime: Date): number => {
    const currentTime = new Date();
    const diffInMs = providedTime.getTime() - currentTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);

    return diffInMinutes;
};

export const ActiveOrder = () => {
    const { order } = useOrderContext();

    if (!order) {
        return null;
    }

    return (
        <div className={styles.activeOrder}>
            <div className={styles.activeOrderHeader}>
                <h1>Your order:</h1>
            </div>

            <div className={styles.activeOrderBody}>
                {(() => {
                    if (order.telephoneCall?.transcription) {
                        return (
                            <>
                                <div className={styles.activeOrderRecap}>
                                    {order.menuItems.map((menuItem) => (
                                        <div key={menuItem.id}>
                                            <span>
                                                {menuItem.quantity} x{" "}
                                                {menuItem.name}
                                            </span>
                                            {menuItem.costPerItem && (
                                                <>
                                                    &nbsp;
                                                    <span
                                                        className={
                                                            styles.bodyItemPrice
                                                        }
                                                    >
                                                        (
                                                        {`${formatCentsToDollars(menuItem.quantity * menuItem.costPerItem)}`}
                                                        )
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.activeOrderDetail}>
                                    Total cost per restaurant:{" "}
                                    {order.totalCost
                                        ? formatCentsToDollars(order.totalCost)
                                        : "--"}
                                </div>

                                <div className={styles.activeOrderDetail}>
                                    {order.pickupTime
                                        ? `Your order will be ready in ${diffTimeInMinutes(order.pickupTime)} minutes.`
                                        : `Your order will be ready for pickup soon!`}
                                </div>
                            </>
                        );
                    }

                    return (
                        <div className={styles.activeOrderLoading}>
                            <div className={styles.activeOrderLoadingIcon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.12.45 2.33.69 3.58.69a1 1 0 011 1v3.5a1 1 0 01-1 1A17.92 17.92 0 012 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.21 1.11l-2.2 2.2z" />
                                </svg>
                            </div>
                            <div className={styles.activeOrderLoadingCopy}>
                                We're dialing in your order...
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};
