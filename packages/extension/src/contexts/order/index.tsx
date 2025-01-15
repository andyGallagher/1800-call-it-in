import { OrderContext } from "@/contexts/order/context";
import { stub } from "@/contexts/order/data";
import { OrderContextProps } from "@/contexts/order/types";
import { fetch } from "@/util/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
    CompleteOrder,
    CreateOrderInput,
    ParsedMenuItem,
    ParseOrderInput,
} from "schema";
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
    const queryClient = useQueryClient();

    const { isPending, data, mutate } = useMutation({
        mutationFn: async (variables: {
            userName: string;
            userPhoneNumber: string;
            restaurantPhoneNumber: string;
        }) => {
            assert(
                parsedMenuItems !== undefined,
                "Parsed menu items must be defined",
            );

            const response = await fetch(
                "/order",
                "post",
                {
                    input: CreateOrderInput,
                    output: CompleteOrder,
                },
                {
                    parsedMenuItems,
                    ...variables,
                },
            );

            return response;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["activeOrder"], data);
        },
    });

    const placeOrder = (variables: {
        userName: string;
        userPhoneNumber: string;
        restaurantPhoneNumber: string;
    }) => {
        mutate(variables);
    };

    return {
        placeOrder,
        placedOrder: data,
        isOrderLoading: isPending && !data,
    };
};

const useActiveOrder = ({
    placedOrder,
}: {
    placedOrder: CompleteOrder | undefined;
}) => {
    const { data } = useQuery({
        queryKey: ["activeOrder"],
        queryFn: async () => {
            assert(
                placedOrder !== undefined,
                "useActiveOrder: order must be defined",
            );

            const response = await fetch(`/order/${placedOrder.id}`, "get", {
                output: CompleteOrder,
            });

            return response;
        },
        enabled: placedOrder !== undefined,
        refetchInterval: 10_000,
    });

    return { order: data };
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const {
        isParsedMenuItemsPending,
        isParsedMenuItemsLoading,
        parsedMenuItems,
        refreshParsedMenuItems,
    } = useRawContent();
    const { placeOrder, placedOrder, isOrderLoading } = usePlaceOrder({
        parsedMenuItems,
    });
    const { order } = useActiveOrder({ placedOrder });

    return (
        <OrderContext.Provider
            value={{
                isParsedMenuItemsPending,
                isParsedMenuItemsLoading,
                parsedMenuItems,
                refreshParsedMenuItems,
                placeOrder,
                order,
                isOrderLoading,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
