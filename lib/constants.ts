export const APP_ROUTES = {
  home: "/",
  orgId: "/organization/:id",
  selectOrg: "/select-org",
  signUp: "/sign-up",
  signIn: "/sign-in",
  toOrgWithId: (id: string) => `/organization/${id}`,
  toBoardWithId: (id: string) => `/board/${id}`,
  toOrgActivityWithId: (id: string) => `/organization/${id}/activity`,
  toOrgSettingsWithId: (id: string) => `/organization/${id}/settings`,
  toOrgBillingWithId: (id: string) => `/organization/${id}/billing`,
};
