import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./blur.module.css";

export const Blur = ({
    isActive,
    className,
    children,
}: {
    isActive: boolean;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={clsx(styles.blur, isActive && styles.active, className)}
        >
            {children}
        </div>
    );
};
