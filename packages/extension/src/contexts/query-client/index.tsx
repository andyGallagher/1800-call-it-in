import {
    QueryClient,
    QueryClientProvider as TansQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
    defaultOptions: {},
});

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TansQueryClientProvider client={queryClient}>
            {children}
        </TansQueryClientProvider>
    );
};
