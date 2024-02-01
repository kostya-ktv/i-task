
import { Board } from "@prisma/client";
import Link from "next/link";

interface Props {
  board: Board;
}
export const BoardItem: React.FC<Props> = ({ board }) => {
  return <Link href="">{board}</Link>;
};
