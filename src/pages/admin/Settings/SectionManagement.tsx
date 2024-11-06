import { lazy, Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GalleryVerticalEnd } from "lucide-react";

const HeroCarouselConf = lazy(() => import('@/pages/admin/Settings/SectionManagement/HeroCarouselConf.tsx'));
const HeroRecommandConf = lazy(() => import('@/pages/admin/Settings/SectionManagement/HeroRecommandConf.tsx'));

const tabs = [
  {
    title: 'Home Page Hero Slider',
    key: 'home_page_hero_slider',
    icon : <GalleryVerticalEnd />,
  },
  {
    title: 'Home Page Recommended Slider',
    key: 'home_page_recommanded_slider',
    icon : <GalleryVerticalEnd />,

  }
];

const renderTab = (tabKey: string) => {
  switch (tabKey) {
    case 'home_page_hero_slider':
      return <HeroCarouselConf />;
    case 'home_page_recommanded_slider':
      return <HeroRecommandConf />;
    default:
      return <HeroCarouselConf />;
  }
};

const SectionManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("home_page_hero_slider");

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className="grid w-full grid-flow-col justify-start gap-4 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={`${activeTab === tab.key ? 'bg-secondary text-secondary-foreground' : 'bg-card'} !w-fit !justify-start !text-xs sm:text-base border-[1px] py-3 gap-2`}
            >
              {tab.icon}
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Suspense to handle loading of lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key} className="mt-6">
              {activeTab === tab.key && renderTab(tab.key)}
            </TabsContent>
          ))}
        </Suspense>
      </Tabs>
    </div>
  );
};

export default SectionManagement;
