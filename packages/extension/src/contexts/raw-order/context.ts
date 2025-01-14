import { RawOrderContextProps } from "@/contexts/raw-order/types";
import { createContext } from "react";
import { notInitialized } from "shared/src/function";

export const RawOrderContext = createContext<RawOrderContextProps>({
    isParsedMenuItemsPending: notInitialized,
    isParsedMenuItemsLoading: notInitialized,
    menuItems: notInitialized,
});
