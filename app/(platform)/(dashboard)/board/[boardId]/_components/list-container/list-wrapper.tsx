import { forwardRef } from "react";
import styles from "./list-container.module.scss";

export const ListWrapper = forwardRef<React.ElementRef<"div">, any>(
  (props, ref) => {
    return (
      <div className={styles.listWrapper} ref={ref} {...props}>
        {props.children}
      </div>
    );
  }
);

ListWrapper.displayName = "ListWrapper";
