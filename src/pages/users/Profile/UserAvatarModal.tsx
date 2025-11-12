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
import { toast } from '@/components/ui/use-toast'

// Generate different robot avatars using robohash

const predefinedColors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F5',
    '#33FFF5', '#F5FF33', '#FF3333', '#33FF33',
    '#FFFFFF', '#000000', 'transparent'
].sort();

interface UserProfileModalProps {
  user: any;
  onProfileUpdate?: () => void;
  onClose?: () => void;
}

// Helper functions for color conversion
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Support both #RRGGBB and #RRGGBBAA formats
  const result6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const result8 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  
  if (result6) {
    return {
      r: parseInt(result6[1], 16),
      g: parseInt(result6[2], 16),
      b: parseInt(result6[3], 16)
    }
  }
  if (result8) {
    return {
      r: parseInt(result8[1], 16),
      g: parseInt(result8[2], 16),
      b: parseInt(result8[3], 16)
    }
  }
  return null
}

const rgbToHex = (r: number, g: number, b: number, a?: number): string => {
  const hex = "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
  
  // If alpha is provided, add it as hex8 format
  if (a !== undefined) {
    const alphaHex = Math.round(a).toString(16).padStart(2, '0')
    return hex + alphaHex
  }
  return hex
}

const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha / 100})`
}

// Convert hex8 (#RRGGBBAA) to hex and opacity
const hex8ToHexAndOpacity = (hex8: string): { hex: string; opacity: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex8)
  if (!result) return null
  
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  const a = parseInt(result[4], 16)
  const opacity = Math.round((a / 255) * 100)
  
  return { hex: rgbToHex(r, g, b), opacity }
}

// Convert hex and opacity to hex8 format (#RRGGBBAA)
const hexAndOpacityToHex8 = (hex: string, opacity: number): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const alpha = Math.round((opacity / 100) * 255)
  return rgbToHex(rgb.r, rgb.g, rgb.b, alpha)
}

const rgbaToHex = (rgba: string): { hex: string; opacity: number } | null => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return null
  const r = parseInt(match[1])
  const g = parseInt(match[2])
  const b = parseInt(match[3])
  const opacity = match[4] ? Math.round(parseFloat(match[4]) * 100) : 100
  return { hex: rgbToHex(r, g, b), opacity }
}

const parseColorValue = (color: string): { hex: string; opacity: number } => {
  if (color === 'transparent') {
    return { hex: '#000000', opacity: 0 }
  }
  if (color.startsWith('rgba')) {
    const parsed = rgbaToHex(color)
    if (parsed) return parsed
  }
  if (color.startsWith('#')) {
    // Check if it's hex8 format (#RRGGBBAA)
    if (color.length === 9 || (color.length === 8 && !color.startsWith('#'))) {
      const parsed = hex8ToHexAndOpacity(color)
      if (parsed) return parsed
    }
    // Regular hex6 format (#RRGGBB)
    return { hex: color, opacity: 100 }
  }
  return { hex: '#000000', opacity: 100 }
}

export default function UserProfileModal({user, onProfileUpdate, onClose}: UserProfileModalProps) {
  const initialColor = user?.background_color || predefinedColors[0]
  const parsedInitial = parseColorValue(initialColor)
  
  // Convert to rgba for display if opacity is not 100
  const getDisplayColor = (hex: string, op: number): string => {
    if (op === 0) return 'transparent'
    if (op === 100) return hex
    return hexToRgba(hex, op)
  }
  
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar_id || 1)
  const [selectedColor, setSelectedColor] = useState(getDisplayColor(parsedInitial.hex, parsedInitial.opacity))
  const [customColor, setCustomColor] = useState(parsedInitial.hex)
  const [opacity, setOpacity] = useState(parsedInitial.opacity)

  const {data,isLoading:isServerLoading} = useQuery("/users/user-avatars");
  const dispatch = useUserAppDispatch();



  const [applyServerChanges, { isLoading:isApplying }] = useMutate({ callback: (res)=>{
      dispatch(setUser(res.user));
      onProfileUpdate?.();
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "success",
      });
      onClose?.();
  }, navigateBack: false });
 

  const handleAvatarSelect = (avatar: number) => {
      setSelectedAvatar(avatar)
  }

  const handleColorSelect = (color: string) => {
    if (color === 'transparent') {
      setSelectedColor('transparent')
      setCustomColor('#000000')
      setOpacity(0)
    } else {
      setSelectedColor(color)
      setCustomColor(color)
      setOpacity(100)
    }
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    
    // If it's a color input (type="color"), it will always be hex
    if (e.target.type === 'color') {
      setCustomColor(newColor)
      updateSelectedColor(newColor, opacity)
    } else {
      // Text input - could be hex6, hex8, or rgba
      if (newColor.startsWith('rgba')) {
        const parsed = rgbaToHex(newColor)
        if (parsed) {
          setCustomColor(parsed.hex)
          setOpacity(parsed.opacity)
          setSelectedColor(newColor)
        } else {
          setCustomColor(newColor)
          updateSelectedColor(newColor, opacity)
        }
      } else if (newColor.startsWith('#') || /^[0-9A-Fa-f]{6,8}$/i.test(newColor)) {
        // Hex color - could be hex6 or hex8
        const hexColor = newColor.startsWith('#') ? newColor : `#${newColor}`
        
        // Check if it's hex8 format (#RRGGBBAA)
        if (hexColor.length === 9) {
          const parsed = hex8ToHexAndOpacity(hexColor)
          if (parsed) {
            setCustomColor(parsed.hex)
            setOpacity(parsed.opacity)
            updateSelectedColor(parsed.hex, parsed.opacity)
          } else {
            setCustomColor(hexColor)
            updateSelectedColor(hexColor, opacity)
          }
        } else {
          // Regular hex6 format
          setCustomColor(hexColor)
          updateSelectedColor(hexColor, opacity)
        }
      } else {
        // Just update the text, might be invalid
        setCustomColor(newColor)
      }
    }
  }

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = parseInt(e.target.value) || 0
    setOpacity(newOpacity)
    updateSelectedColor(customColor, newOpacity)
  }

  const updateSelectedColor = (hex: string, op: number) => {
    if (op === 0) {
      setSelectedColor('transparent')
    } else if (op === 100) {
      setSelectedColor(hex)
    } else {
      setSelectedColor(hexToRgba(hex, op))
    }
  }


  const applyChanges = async () => {
    // Convert color to hex8 format for database storage
    let colorToSave: string
    if (selectedColor === 'transparent') {
      colorToSave = '#00000000' // Fully transparent black in hex8
    } else if (opacity === 100) {
      // Full opacity, save as regular hex6
      colorToSave = customColor
    } else if (opacity === 0) {
      // Fully transparent
      colorToSave = '#00000000'
    } else {
      // Partial opacity, save as hex8
      colorToSave = hexAndOpacityToHex8(customColor, opacity)
    }
    
    await applyServerChanges("users/update/profile",{
      avatar_id: selectedAvatar,
      background_color: colorToSave,
      id: user.id,
      user_code: user.user_code,
      password: null
    });
  }

  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto z-[999]">
      <DialogHeader className='hidden lg:block'>
        <DialogTitle>Edit Your Profile</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Preview Section */}
        <Card className="p-4 md:p-6 flex flex-col items-center justify-center gap-4 bg-transparent border-none md:!border ">
          <div 
            className="w-32 h-32 md:w-40 md:h-40 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: selectedColor }}
          >
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-2 max-h-64 md:h-80 overflow-y-auto">
              {!isServerLoading && data?.user_avatars?.map((avatar) => (
                <button
                  key={avatar.id}
                  className={`rounded-lg p-2 border-2 transition-all border-muted-foreground hover:bg-accent hover:border-primary ${
                    selectedAvatar === avatar.id ? 'border-primary bg-accent' : 'border-transparent'
                  }`}
                  onClick={() => handleAvatarSelect(avatar?.id)}
                > 
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto">
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
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-2">
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
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-3 sm:gap-4">
            <Label htmlFor="customColor" className="text-sm font-medium">
              Custom Color
            </Label>
            <div className="sm:col-span-3 flex gap-2">
              <Input
                id="customColor"
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-12 h-12 p-1 border-none flex-shrink-0"
              />
              <Input
                type="text"
                value={customColor}
                onChange={handleCustomColorChange}
                placeholder="#RRGGBB or #RRGGBBAA"
                className="flex-grow"
              />
            </div>
          </div>

          {/* Opacity Control */}
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-3 sm:gap-4">
            <Label htmlFor="opacity" className="text-sm font-medium">
              Opacity
            </Label>
            <div className="sm:col-span-3 flex gap-2 items-center">
              <Input
                id="opacity"
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={handleOpacityChange}
                className="flex-grow"
              />
              <Input
                type="number"
                min="0"
                max="100"
                value={opacity}
                onChange={handleOpacityChange}
                className="w-20"
                placeholder="0-100"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">%</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}