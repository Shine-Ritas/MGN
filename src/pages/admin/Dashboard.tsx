
import { CardsStats } from "@/components/charts/Stats";

import { lazy, useState } from "react";
import Frame from "./Home/frame";

const UserGrowth = lazy(() => import("./Home/user-growth"));


const tabs = ["Overview", "User Growth", "Content Popularity", "Revenue Growth", "Usage", "Monitoring"];

type TabType = typeof tabs[number];

const renderTabContent = (tab: TabType) => {
  switch (tab) {
    case "Overview":
      return <CardsStats />;
    case "User Growth":
      return <UserGrowth />;
    case "Content Popularity":
      return <div>Content Popularity</div>;
    case "Revenue Growth":
      return <div>Revenue Growth</div>;
    default:
      return <CardsStats />;
  }
};

const Dashboard = () => {

  const [currentTab, setCurrentTab] = useState<TabType>("Overview");

  return (
    <div className="flex flex-col gap-4">
      <Frame tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderTabContent(currentTab)}
    </div>
  )
}

export default Dashboard