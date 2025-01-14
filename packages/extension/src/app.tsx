import "@/app.css";
import { Body } from "@/components/body";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Health } from "@/components/health";
import { Layout } from "@/components/layout";
import { QueryClientProvider } from "@/contexts/query-client";
import { RawOrderProvider } from "@/contexts/raw-order";
import "@/reset.css";
import { ErrorBoundary } from "@/shared/error-boundary";

export const App = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider>
                <Health>
                    <RawOrderProvider>
                        <Layout>
                            <Header />
                            <Body />
                            <Footer />
                        </Layout>
                    </RawOrderProvider>
                </Health>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
