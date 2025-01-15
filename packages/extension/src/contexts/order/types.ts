import { ParsedMenuItem } from "schema";
import { z } from "zod";

export interface OrderContextProps {
    isParsedMenuItemsPending: boolean;
    isParsedMenuItemsLoading: boolean;
    parsedMenuItems: Array<z.infer<typeof ParsedMenuItem>> | undefined;
    refreshParsedMenuItems: (variables: { refresh: boolean }) => void;

    placeOrder: ({
        userName,
        userPhoneNumber,
        restaurantPhoneNumber,
    }: {
        userName: string;
        userPhoneNumber: string;
        restaurantPhoneNumber: string;
    }) => void;
}
