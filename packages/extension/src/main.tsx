import { App } from "@/app.tsx";
import "@/reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Health } from "@/components/health";
import { OrderProvider } from "@/contexts/order";
import { QueryClientProvider } from "@/contexts/query-client";
import "@/reset.css";
import { ErrorBoundary } from "@/shared/error-boundary";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary>
            <QueryClientProvider>
                <Health>
                    <OrderProvider>
                        <App />
                    </OrderProvider>
                </Health>
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>,
);
