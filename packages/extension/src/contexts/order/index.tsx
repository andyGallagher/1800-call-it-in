import { OrderContext } from "@/contexts/order/context";
import { stub } from "@/contexts/order/data";
import { fetch } from "@/util/fetch";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ParsedMenuItem, ParseOrderInput } from "schema";
import { assert } from "shared/src/function";

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [rawContent, setRawContent] = useState<string | undefined>(undefined);
    const didInitialExecutionRef = useRef(false);

    const { isPending, data, mutate } = useMutation({
        mutationFn: async ({ refresh }: { refresh: boolean }) => {
            assert(rawContent !== undefined, "Raw content must be defined");

            const response = await fetch(
                "/order/parse",
                "post",
                {
                    input: ParseOrderInput,
                    output: ParsedMenuItem.array(),
                },
                {
                    rawContent,
                    refresh,
                },
            );

            return response;
        },
    });

    useEffect(() => {
        // If we're in local dev, we don't have access to chrome.runtime, so just use stub data
        if (import.meta.env.DEV) {
            setRawContent(stub);

            return;
        }

        if (!chrome.tabs) {
            console.error("OrderProvider: chrome.tabs is not available");
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

    useEffect(() => {
        if (rawContent === undefined) {
            return;
        }

        if (didInitialExecutionRef.current) {
            return;
        }

        didInitialExecutionRef.current = true;

        mutate({ refresh: false });
    }, [rawContent, mutate]);

    return (
        <OrderContext.Provider
            value={{
                isParsedMenuItemsPending: isPending,
                isParsedMenuItemsLoading: !isPending && !data,
                menuItems: data,
                refreshParsedMenuItems: (variables: { refresh: boolean }) =>
                    mutate(variables),
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
