import "@/app.css";
import { Body } from "@/components/body";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import "@/reset.css";

import { ErrorBoundary } from "@/shared/error-boundary";

export const App = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <Header />
                <Body />
                <Footer />
            </Layout>
        </ErrorBoundary>
    );
};
