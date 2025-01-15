import { OrderContext } from "@/contexts/order/context";
import { OrderContextProps } from "@/contexts/order/types";
import { useContext } from "react";

export const useOrderContext = (): OrderContextProps => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext must be used within a OrderProvider");
    }

    return context;
};
