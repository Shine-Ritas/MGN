import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect, CSSProperties } from "react";
import { TabType, TabTypes } from "../Dashboard";

interface FrameProps {
  tabs: TabTypes
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

const DashboardNav = ({ tabs, currentTab, setCurrentTab }: FrameProps) =>{
  const [activeIndex, setActiveIndex] = useState<number>(() => tabs.indexOf(currentTab));

  const [activeStyle, setActiveStyle] = useState<CSSProperties>({ left: "0px", width: "0px" });

  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      setActiveStyle({
        left: `${activeElement.offsetLeft}px`,
        width: `${activeElement.offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const activeElement = tabRefs.current[activeIndex];
      if (activeElement) {
        setActiveStyle({
          left: `${activeElement.offsetLeft}px`,
          width: `${activeElement.offsetWidth}px`,
        });
      }
    });
  }, [activeIndex]);

  // Switch tab by index.
  const switchTab = (index: number) => {
    if (index === activeIndex) return; // Prevent unnecessary updates.
    setActiveIndex(index);
    setCurrentTab(tabs[index]);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full h-[80px] relative flex items-center">
        <CardContent className="pt-4 w-full px-10">
          <div className="relative">
            {/* Active Indicator */}
            <div
              className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
              style={activeStyle}
            />
            {/* Tabs */}
            <div className="relative flex space-x-[6px] justify-between items-center">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  ref={(el) => (tabRefs.current[index] = el)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                    index === activeIndex
                      ? "text-[#0e0e10] dark:text-white"
                      : "text-[#0e0f1199] dark:text-[#ffffff99]"
                  }`}
                  onClick={() => switchTab(index)}
                >
                  <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
                    {tab}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default DashboardNav;