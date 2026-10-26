import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>Tasks</div>
      </header>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}


