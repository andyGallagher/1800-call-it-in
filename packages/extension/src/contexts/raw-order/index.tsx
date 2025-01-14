import { RawOrderContext } from "@/contexts/raw-order/context";
import { raw } from "@/contexts/raw-order/raw";
import { fetch } from "@/util/fetch";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { MenuItemModel } from "schema";
import { assert } from "shared/src/function";
import { z } from "zod";

export const RawOrderProvider = ({ children }: { children: ReactNode }) => {
    const [rawContent, setRawContent] = useState<string | undefined>(undefined);

    const { isPending, isLoading, data } = useQuery({
        queryKey: ["parse-order"],
        queryFn: async () => {
            // Note that this is OK because we enabled the query only when rawContent is defined
            assert(rawContent !== undefined, "rawContent must be defined");

            const response = await fetch(
                "/order/parse",
                "post",
                {
                    input: z.object({
                        rawContent: z.string(),
                    }),
                    output: MenuItemModel.array(),
                },
                {
                    rawContent,
                },
            );
            return response;
        },
        enabled: rawContent !== undefined, // This will pause the query until rawContent is defined
    });

    useEffect(() => {
        // If we're in local dev, we don't have access to chrome.runtime, so just use stub data
        if (import.meta.env.DEV) {
            setRawContent(raw);
            return;
        }

        if (!chrome.tabs) {
            return;
        }

        void (async () => {
            const [currentTab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            if (!currentTab.id) {
                throw new Error("No active tab found");
            }

            const rawContent = await chrome.tabs.sendMessage(currentTab.id, {
                action: "requestPageContent",
            });
            setRawContent(rawContent);
        })();
    }, []);

    return (
        <RawOrderContext.Provider
            value={{
                isParsedMenuItemsPending: isPending,
                isParsedMenuItemsLoading: isLoading,
                menuItems: data,
            }}
        >
            {children}
        </RawOrderContext.Provider>
    );
};
