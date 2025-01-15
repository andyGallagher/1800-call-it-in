import { OrderContext } from "@/contexts/order/context";
import { stub } from "@/contexts/order/data";
import { OrderContextProps } from "@/contexts/order/types";
import { fetch } from "@/util/fetch";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ParsedMenuItem, ParseOrderInput } from "schema";
import { assert } from "shared/src/function";

/**
 * Handle initial fetching of raw content
 */
const useRawContent = () => {
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

    return {
        isParsedMenuItemsPending: isPending,
        isParsedMenuItemsLoading: !isPending && !data,
        parsedMenuItems: data,
        refreshParsedMenuItems: (variables: { refresh: boolean }) =>
            mutate(variables),
    };
};

const usePlaceOrder = ({
    parsedMenuItems,
}: {
    parsedMenuItems: OrderContextProps["parsedMenuItems"];
}) => {
    const placeOrder = ({
        userName,
        userPhoneNumber,
        restaurantPhoneNumber,
    }: {
        userName: string;
        userPhoneNumber: string;
        restaurantPhoneNumber: string;
    }) => {
        console.info("placeOrder", {
            userName,
            userPhoneNumber,
            restaurantPhoneNumber,
            parsedMenuItems,
        });
    };

    return {
        placeOrder,
    };
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const {
        isParsedMenuItemsPending,
        isParsedMenuItemsLoading,
        parsedMenuItems,
        refreshParsedMenuItems,
    } = useRawContent();
    const { placeOrder } = usePlaceOrder({ parsedMenuItems });

    return (
        <OrderContext.Provider
            value={{
                isParsedMenuItemsPending,
                isParsedMenuItemsLoading,
                parsedMenuItems,
                refreshParsedMenuItems,
                placeOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
