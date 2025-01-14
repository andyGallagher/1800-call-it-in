import { RawOrderContext } from "@/contexts/raw-order/context";
import { raw } from "@/contexts/raw-order/raw";
import { ReactNode, useEffect, useState } from "react";

export const RawOrderProvider = ({ children }: { children: ReactNode }) => {
    const [rawContent, setRawContent] = useState<string | undefined>(undefined);

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
                isLoadingRawContent: rawContent !== undefined,
                rawContent,
            }}
        >
            {children}
        </RawOrderContext.Provider>
    );
};
