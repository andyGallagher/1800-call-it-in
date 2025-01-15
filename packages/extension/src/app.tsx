import "@/app.css";
import { Body } from "@/components/body";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Health } from "@/components/health";
import { Layout } from "@/components/layout";
import { OrderProvider } from "@/contexts/order";
import { QueryClientProvider } from "@/contexts/query-client";
import "@/reset.css";
import { ErrorBoundary } from "@/shared/error-boundary";

export const App = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider>
                <Health>
                    <OrderProvider>
                        <Layout>
                            <Header />
                            <Body />
                            <Footer />
                        </Layout>
                    </OrderProvider>
                </Health>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
