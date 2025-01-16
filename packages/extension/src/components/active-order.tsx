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
                <div className={styles.activeOrderRecap}>
                    {order.menuItems.map((menuItem) => (
                        <div key={menuItem.id}>
                            <span>
                                {menuItem.quantity} x {menuItem.name}
                            </span>
                            {menuItem.costPerItem && (
                                <>
                                    &nbsp;
                                    <span className={styles.bodyItemPrice}>
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
            </div>
        </div>
    );
};
