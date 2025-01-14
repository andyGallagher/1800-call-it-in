import { RawOrderContext } from "@/contexts/raw-order/context";
import { stub } from "@/contexts/raw-order/data";
import { fetch } from "@/util/fetch";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ParsedMenuItem } from "schema";
import { assert } from "shared/src/function";
import { z } from "zod";

export const RawOrderProvider = ({ children }: { children: ReactNode }) => {
    const [rawContent, setRawContent] = useState<string | undefined>(undefined);
    const didInitialExecutionRef = useRef(false);

    const { isPending, data, mutateAsync } = useMutation({
        mutationFn: async () => {
            // Note that this is OK because we enabled the query only when rawContent is defined
            assert(rawContent !== undefined, "rawContent must be defined");

            const response = await fetch(
                "/order/parse",
                "post",
                {
                    input: z.object({
                        rawContent: z.string(),
                    }),
                    output: ParsedMenuItem.array(),
                },
                {
                    rawContent,
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
            console.error("RawOrderProvider: chrome.tabs is not available");
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

        void mutateAsync();
    }, [rawContent, mutateAsync]);

    return (
        <RawOrderContext.Provider
            value={{
                isParsedMenuItemsPending: isPending,
                isParsedMenuItemsLoading: !isPending && !data,
                menuItems: data,
            }}
        >
            {children}
        </RawOrderContext.Provider>
    );
};
