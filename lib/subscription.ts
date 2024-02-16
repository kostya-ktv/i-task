import { auth } from "@clerk/nextjs";
import { db } from "./prisma";

const DAY_IN_MS = 84_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) return false;

  const subscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!subscription) return false;

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return Boolean(isValid);
};
