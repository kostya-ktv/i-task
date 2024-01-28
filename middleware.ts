import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { APP_ROUTES } from "./lib/constants";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const requestURL = req.url;
    const { userId, isPublicRoute, orgId } = auth;
    if (userId && isPublicRoute) {
      const path = orgId ? APP_ROUTES.toOrgWithId(orgId) : APP_ROUTES.selectOrg;
      const orgSelectionURL = new URL(path, requestURL);
      return NextResponse.redirect(orgSelectionURL);
    }

    if (!userId && !isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: requestURL,
      });
    }
    if (userId && !orgId && req.nextUrl.pathname !== APP_ROUTES.selectOrg) {
      const orgSelection = new URL(APP_ROUTES.selectOrg, requestURL);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
