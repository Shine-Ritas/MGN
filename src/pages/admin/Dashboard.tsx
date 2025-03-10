import { CardsStats } from "@/components/charts/Stats";
import { lazy, Suspense, useState, useCallback, memo } from "react";
import DashboardNav from "@/pages/admin/Home/dashboard-nav";

const UserGrowth = lazy(() => import("./Home/user-growth"));
const ContentGrowth = lazy(() => import("./Home/content-growth"));
const RevenueGrowth = lazy(() => import("./Home/revenue-growth"));
const DailyDashboard = lazy(() => import("./Home/daily-dashboard"));


const TABS = ["Overview", "Daily", "User Growth", "Content Growth", "Revenue Growth",] as const;
export type TabTypes = typeof TABS;
export type TabType = typeof TABS[number];

const TabContent = memo(({ tab }: { tab: TabType }) => {
  switch (tab) {
    case "Overview":
      return <CardsStats />;
    case "User Growth":
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <UserGrowth />
        </Suspense>
      );
    case "Content Growth":
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <ContentGrowth />
        </Suspense>
      );
    case "Revenue Growth":
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <RevenueGrowth />
        </Suspense>
      )
    case "Daily":
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <DailyDashboard />
        </Suspense>
      );
    default:
      return <CardsStats />;
  }
});

// Simple loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

// Memoize DashboardNav to prevent unnecessary re-renders
const MemoizedDashboardNav = memo(DashboardNav);

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<TabType>("Overview");

  // Memoize the tab change handler
  const handleTabChange = useCallback((tab: TabType) => {
    setCurrentTab(tab);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MemoizedDashboardNav
        tabs={TABS}
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
      />
      <TabContent tab={currentTab} />
    </div>
  );
};

// Add display name for better debugging
TabContent.displayName = "TabContent";
MemoizedDashboardNav.displayName = "MemoizedDashboardNav";

export default memo(Dashboard);