import { ReactNode } from "react";
import styles from "./layout.module.css";

export const Layout = ({ children }: { children: ReactNode }) => {
    return <div className={styles.layout}>{children}</div>;
};
