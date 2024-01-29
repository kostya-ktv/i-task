import {
  ActivityIcon,
  CreditCardIcon,
  LayoutIcon,
  SettingsIcon,
} from "lucide-react";
import { APP_ROUTES } from "@/lib/constants";


export namespace DashboardSidebar {
  export const getRoutes = (id: string) => [
    {
      label: "Boards",
      icon: LayoutIcon,
      href: APP_ROUTES.toOrgWithId(id),
    },
    {
      label: "Activity",
      icon: ActivityIcon,
      href: APP_ROUTES.toOrgActivityWithId(id),
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: APP_ROUTES.toOrgSettingsWithId(id),
    },
    {
      label: "Billing",
      icon: CreditCardIcon,
      href: APP_ROUTES.toOrgBillingWithId(id),
    },
  ];
}
