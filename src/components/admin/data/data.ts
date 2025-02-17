import { MdHomeFilled } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { ElementType } from "react";
import { TbAppsFilled } from "react-icons/tb";
import { MessageCircleWarning, UserCog } from "lucide-react";
import { adminRouteCollection } from "@/routes/data/admin_route";

type MenuItem = {
    Icon: ElementType;
    to: string;
    tooltip: string;
    title: string;
  };

type NavigateMenu = {
    [key: string]: MenuItem;
  };

export const navigateMenu: NavigateMenu = {
    dashboard: { Icon: MdHomeFilled, to: adminRouteCollection.dashboard, tooltip: "Home", title: "Home" },
    comics: { Icon: SiBookstack, to: adminRouteCollection.mogous, tooltip: "comics", title: "Comics" },
    categories: { Icon: BiCategory, to: adminRouteCollection.categories, tooltip: "Manage Categories", title: "Categories" },
    subscriptions: { Icon: MdSubscriptions, to: adminRouteCollection.subscriptions, tooltip: "Manage Subscriptions", title: "Subscriptions" },
    users: { Icon: FaUsersGear, to: adminRouteCollection.users, tooltip: "Manage Users", title: "Users" },
    apps: { Icon: TbAppsFilled, to: adminRouteCollection.apps, tooltip: "Your Apps", title: "Apps" },
    setting: { Icon: IoSettings, to: adminRouteCollection.generalSetting, tooltip: "Customize Your Application", title: "Setting" },
    report: { Icon: MessageCircleWarning, to: adminRouteCollection.reports, tooltip: "Reports", title: "Reports" },
    admins: { Icon: UserCog , to: adminRouteCollection.admins, tooltip: "Manage Admins", title: "Admins" },
  };