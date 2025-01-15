import { OrderContextProps } from "@/contexts/order/types";
import { createContext } from "react";
import { notInitialized } from "shared/src/function";

export const OrderContext = createContext<OrderContextProps>({
    isParsedMenuItemsPending: notInitialized,
    isParsedMenuItemsLoading: notInitialized,
    parsedMenuItems: notInitialized,
    refreshParsedMenuItems: notInitialized,
});
