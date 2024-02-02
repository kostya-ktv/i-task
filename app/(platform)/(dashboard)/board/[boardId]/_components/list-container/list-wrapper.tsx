import styles from "./list-container.module.scss";

interface Props {
  children?: React.ReactNode;
}
export const ListWrapper: React.FC<Props> = ({ children }) => {
  return <div className={styles.listWrapper}>{children}</div>;
};
