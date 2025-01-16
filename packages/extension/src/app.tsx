import "@/app.css";
import { ActiveOrder } from "@/components/active-order";
import { Blur } from "@/components/blur";
import { Body } from "@/components/body";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import { useOrderContext } from "@/contexts/order/hooks";

export const App = () => {
    const { order } = useOrderContext();

    return (
        <Layout>
            <Blur isActive={Boolean(order)}>
                <Header />
                <Body />
                <Footer />
            </Blur>
            <ActiveOrder />
        </Layout>
    );
};
