import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./prisma";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}
export const createAuditLog = async (props: Props) => {
  const { orgId } = auth();
  const user = await currentUser();
  if (!user || !orgId) {
    throw new Error("User not found");
  }
  const { action, entityId, entityTitle, entityType } = props;
  const userName = `${user.lastName} ${user.firstName}`.trim();
  await db.auditLog.create({
    data: {
      entityId,
      action,
      entityTitle,
      entityType,
      userImage: user.imageUrl,
      userId: user.id,
      orgId,
      userName: userName || "User",
    },
  });
};
