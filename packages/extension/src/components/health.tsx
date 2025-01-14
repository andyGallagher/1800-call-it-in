import { fetch } from "@/util/fetch";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { z } from "zod";

/**
 * Utility component that will check the health of the server every 30 seconds
 */
export const Health = ({ children }: { children: ReactNode }) => {
    useQuery({
        queryKey: ["health"],
        queryFn: async () => {
            const response = await fetch("/health", "get", {
                output: z.object({ status: z.string() }),
            });
            return response;
        },
        refetchInterval: 30000,
    });

    return <>{children}</>;
};
