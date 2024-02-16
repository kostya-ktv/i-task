"use server";

import { APP_ROUTES } from "@/lib/constants";
import { UnauthorizedError } from "@/lib/exceptions";
import { db } from "@/lib/prisma";
import { getAbsolutePath } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { StripeClient } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export const stripeRedirect = async () => {
  const { orgId, userId } = auth();
  const user = await currentUser();
  if (!orgId || !userId || !user) {
    throw new UnauthorizedError();
  }
  const settingsUrl = getAbsolutePath(APP_ROUTES.toOrgWithId(orgId));

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await StripeClient.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await StripeClient.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0]?.emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "iTask Pro",
                description: "Unlimited boards for4 organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
  revalidatePath(APP_ROUTES.toOrgWithId(orgId));

  return url;
};
