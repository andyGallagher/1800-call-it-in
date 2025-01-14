import { MenuItemModel } from "schema";
import { z } from "zod";

export interface RawOrderContextProps {
    isParsedMenuItemsPending: boolean;
    isParsedMenuItemsLoading: boolean;
    menuItems: Array<z.infer<typeof MenuItemModel>> | undefined;
}
