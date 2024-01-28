export const APP_ROUTES = {
  home: "/",
  orgId: "/organization/:id",
  toOrgWithId: (id: any) => `/organization/${id}`,
  selectOrg: "/select-org",
  signUp: "/sign-up",
  signIn: "/sign-in",
};
