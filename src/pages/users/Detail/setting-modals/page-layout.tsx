
import { Card } from "@/components/ui/card"
import { MemorizedLayoutButton } from "./layout-button"
import { BackgroundColorData, HeaderVisibleData, ProgressBarData, ReadingDirectionData, ReadingStyleData, SettingActionKey, toggleActionCollectionKeys } from "@/redux/slices/userReadSetting/constants"
import { useScreenDetector } from "@/hooks/useScreenDetector"

export default function SettingsPanel() {

  const {isDesktop} = useScreenDetector();

  // if not is desktop remove double page from reading styles
  const filteredReadingStyles = isDesktop 
    ? ReadingStyleData 
    : Object.fromEntries(
        Object.entries(ReadingStyleData).filter(([key]) => key !== "DoublePage")
      );

  return (
    <Card className="w-full max-w-xl border-none bg-inherit h-[60vh] overflow-y-scroll text-white py-6 space-y-8">
      
      <div>
        <div className="grid grid-cols-3 gap-2">
            <MemorizedLayoutButton actionKey={toggleActionCollectionKeys.readingStyle as SettingActionKey} collection={filteredReadingStyles}/>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl">Reading Direction</h2>
        <div className="grid grid-cols-2 gap-2">
        <MemorizedLayoutButton actionKey={toggleActionCollectionKeys.readingDirection as SettingActionKey} collection={ReadingDirectionData} largeBtn={false}/>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl">Header Visibility</h2>
        <div className="grid grid-cols-2 gap-2">
        <MemorizedLayoutButton actionKey={toggleActionCollectionKeys.headerVisible as SettingActionKey} collection={HeaderVisibleData} largeBtn={false}/>
         
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl">Progress Bar Style</h2>
        <div className="grid grid-cols-3 gap-2">
          <MemorizedLayoutButton actionKey={toggleActionCollectionKeys.progressBar as SettingActionKey} collection={ProgressBarData}/>
        </div>
      </div>


      <div className="space-y-4">
        <h2 className="text-xl">Background</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            <MemorizedLayoutButton 
            actionKey={toggleActionCollectionKeys.backgroundColor as SettingActionKey} 
            styleClass="text-xs"
            showIcon={false} collection={BackgroundColorData}/>
          </div>
        </div>
      </div>
    </Card>
  )
}


