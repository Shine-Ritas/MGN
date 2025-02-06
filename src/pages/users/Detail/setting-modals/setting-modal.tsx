
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserAppDispatch } from '@/redux/hooks'
import { toggleValue } from "../../../../redux/slices/userReadSetting/user-read-setting-slice";
import PageLayout from "./page-layout";

export default function SettingModal({isOpen,shortCuts}) {
    
    const dispatch = useUserAppDispatch();

  return (
    <Dialog open={isOpen} onOpenChange={()=>dispatch(toggleValue("modalBox"))}>
      <DialogContent
      autoFocus={false}
      className="sm:max-w-[600px] bg-[#0F172A] border-slate-800 z-[999]">
        <DialogHeader  className="flex flex-row items-center justify-between">
          <DialogTitle
          
          className="text-2xl font-bold text-white">
            Advanced Settings
          </DialogTitle>

        </DialogHeader>
        <Tabs defaultValue="shortcuts" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[#1E293B]">
            <TabsTrigger
              value="layout"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              PAGE LAYOUT
            </TabsTrigger>
            <TabsTrigger
              value="shortcuts"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              SHORTCUTS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="layout" className="text-slate-300">
              <PageLayout />
          </TabsContent>
          <TabsContent value="shortcuts" className="mt-6" autoFocus={false}>
            <div className="space-y-6">
              <h3 className="text-xl text-slate-300">Keyboard Shortcuts</h3>
              <div className="space-y-4 text-slate-400">
                {
                    shortCuts.map((shortcut,index)=>(
                        <p key={index}>
                            <span className="font-mono bg-slate-800 px-2 py-1 rounded mr-2 w-12">{shortcut.label}</span>
                            {shortcut.description}
                        </p>
                    ))
                }
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

