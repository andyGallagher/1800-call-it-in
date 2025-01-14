import { RawOrderContext } from "@/contexts/raw-order/context";
import { RawOrderContextProps } from "@/contexts/raw-order/types";
import { useContext } from "react";

export const useRawOrderContext = (): RawOrderContextProps => {
    const context = useContext(RawOrderContext);
    if (!context) {
        throw new Error("useRawOrder must be used within a RawOrderProvider");
    }

    return context;
};
