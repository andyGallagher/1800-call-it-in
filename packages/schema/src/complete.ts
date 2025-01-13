/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import { z } from "zod";
import { MenuItemModel, OrderModel } from "./generated-zod-schemas";

export interface CompleteOrder extends z.infer<typeof CompleteOrder> {}
export const CompleteOrder = OrderModel.extend({
    menuItems: MenuItemModel.array(),
});
