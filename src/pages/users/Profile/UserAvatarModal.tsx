import { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle,  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import useQuery from '@/hooks/useQuery'
import useMutate from '@/hooks/useMutate'
import { useUserAppDispatch } from '@/redux/hooks'
import { setUser } from '@/redux/slices/user-global'

// Generate different robot avatars using robohash

const predefinedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5',
    '#33FFF5', '#F5FF33', '#FF3333', '#33FF33',
    '#FFFFFF', '#000000', 'transparent'
].sort();


export default function UserProfileModal({user}) {
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar_id || 1)
  const [selectedColor, setSelectedColor] = useState(user?.background_color || predefinedColors[0])
  const [customColor, setCustomColor] = useState('')

  const {data,isLoading:isServerLoading} = useQuery("/users/user-avatars");
  const dispatch = useUserAppDispatch();



  const [applyServerChanges, { isLoading:isApplying }] = useMutate({ callback: (res)=>{
      dispatch(setUser(res.user));
  }, navigateBack: false });
 

  const handleAvatarSelect = (avatar: number) => {
      setSelectedAvatar(avatar)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setCustomColor(color)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value)
    setSelectedColor(e.target.value)
  }


  const applyChanges = async () => {
     await applyServerChanges("users/update/profile",{
      avatar_id: selectedAvatar,
      background_color: selectedColor,
      id: user.id,
      user_code: user.user_code,
      password: null
    });
  }

  return (
    
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[300px_1fr] gap-6">
          {/* Preview Section */}
          <Card className="p-6 flex flex-col items-center justify-center gap-4 bg-transparent">
            <div 
              className="w-40 h-40 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: selectedColor }}
            >
              <Avatar className="w-32 h-32">
                <AvatarImage src={
                  data?.user_avatars?.find((avatar) => avatar?.id === selectedAvatar)?.avatar_url_path
                } alt="Selected avatar" 
                className="object-contain"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </div>
            <Button onClick={applyChanges} disabled={isApplying} className="w-full">
              {isApplying ? 'Applying Changes...' : 'Apply Changes'}
            </Button>
          </Card>

          {/* Selection Section */}
          <div className="space-y-6">
            {/* Avatar Selection */}
            <div>
              <Label className="text-sm font-medium">Choose Avatar</Label>
              <div className="grid grid-cols-3 gap-4 mt-2 h-80 overflow-y-scroll">
                {!isServerLoading && data?.user_avatars?.map((avatar) => (
                  <button
                    key={avatar.id}
                    className={`rounded-lg p-2 border-2 transition-all hover:bg-accent hover:border-primary  ${
                      selectedAvatar === avatar.id ? 'border-primary bg-accent' : 'border-transparent'
                    }`}
                    onClick={() => handleAvatarSelect(avatar?.id)}
                  > 
                    <Avatar className="w-20 h-20 object-contain mx-auto">
                      <AvatarImage src={avatar?.avatar_url_path} className="object-contain" alt="Avatar option" />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-sm font-medium">Choose Background Color</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    className={`w-full h-8 rounded-md transition-all ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customColor" className="text-sm font-medium">
                Custom Color
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="customColor"
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-12 h-12 p-1 border-none"
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  placeholder="#RRGGBB"
                  className="flex-grow"
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
  )
}