import { ParsedMenuItem } from "schema";
import { z } from "zod";

export interface OrderContextProps {
    isParsedMenuItemsPending: boolean;
    isParsedMenuItemsLoading: boolean;
    menuItems: Array<z.infer<typeof ParsedMenuItem>> | undefined;
    refreshParsedMenuItems: (variables: { refresh: boolean }) => void;
}
