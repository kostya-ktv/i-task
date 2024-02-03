import styles from "./list-container.module.scss";

export const ListWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.listWrapper}>{children}</div>;
};
