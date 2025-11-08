import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import useMutate from '@/hooks/useMutate';
import { toast } from '@/components/ui/use-toast';
import useQuery from '@/hooks/useQuery';
import { useIndexedDbImageCache } from '@/hooks/useIndexedDbImageCache';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PrefixUploadState = {
  water_mark: any;
  intro_a: any;
  outro_a: any;
  intro_b: any;
  outro_b: any;
  watermark_position: string;
};

type UploadErrors = {
  [key in keyof PrefixUploadState]: string | null;
};

const watermarkPositions = [
  'top-left',
  'top-right',  
  'center',
  'bottom-left',
  'bottom-right',
]

const initialUploadState: PrefixUploadState = {
  water_mark: null,
  intro_a: null,
  outro_a: null,
  intro_b: null,
  outro_b: null,
  watermark_position: 'bottom-right',
};

const initialErrorState: UploadErrors = {
  water_mark: null,
  intro_a: null,
  outro_a: null,
  intro_b: null,
  outro_b: null,
  watermark_position: null,
};

const WATERMARK_MAX_WIDTH = 500; // Adjust as needed
const WATERMARK_MAX_HEIGHT = 500; // Adjust as needed


const imageRender = (type:any) => {

  if (type instanceof File) {
    return URL.createObjectURL(type!);
  }
  else{
    return type;
  }
}



export default function UploadComponent() {
  const [uploadState, setUploadState] = useState<PrefixUploadState>(initialUploadState);
  const [errors, setErrors] = useState<UploadErrors>(initialErrorState);

  const {data,isLoading:isL} = useQuery("/application-configs");  
  const { getCachedImage,storeImage } = useIndexedDbImageCache();

  const [mutate, { isLoading }] = useMutate({callback:undefined,navigateBack:false,});

  useEffect(()=>{
    if(!isL){
      if(data){
        const keys = Object.keys(initialUploadState);

        keys.map((key)=>{
          data[key] != "" && key != "watermark_position" &&
          getCachedImage(key,data[key],true).then((res)=>{
            console.log(res)
            if(res){
              setUploadState((prevState) => ({
                ...prevState,
                [key]: res,
              }));
            }
          })

          if(key == "watermark_position"){
            setUploadState((prevState) => ({
              ...prevState,
              watermark_position: data[key],
            }));
          }

        })
        
      }
    }
  },[data, getCachedImage, isL])

  

  const validateImageDimensions = (file: File, maxWidth: number, maxHeight: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth && img.height <= maxHeight) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: keyof PrefixUploadState) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "water_mark") {
        const isValid = await validateImageDimensions(file, WATERMARK_MAX_WIDTH, WATERMARK_MAX_HEIGHT);
        if (!isValid) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [type]: `Watermark image must not exceed ${WATERMARK_MAX_WIDTH}x${WATERMARK_MAX_HEIGHT} pixels.`,
          }));
          return;
        }
      }

      setUploadState((prevState) => ({
        ...prevState,
        [type]: file,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [type]: null, // Clear the error for this type
      }));
    }
  };

  const handleSubmit = async (type: keyof PrefixUploadState) => {
    // For watermark_position, we don't need a file, just the position value
    if (type !== 'watermark_position' && !uploadState[type]) {
      console.error(`No file selected for ${type}`);
      return;
    }

    const formData = new FormData();
    
    if (type === 'watermark_position') {
      formData.append(type, uploadState[type]);
    } else {
      formData.append(type, uploadState[type]!);
    }

    try {
      const response = await mutate("admin/application-configs", formData);
    
      console.log(response);
      if(!response.error){
        toast({
          title: "Success",
          description: `${type === 'watermark_position' ? 'Watermark position' : 'Upload'} updated successfully`,
          variant: "success",
        });
    
        if (type !== 'watermark_position') {
          storeImage(type,response[type]);
        }
      }

    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
    }
  };

  const handleWatermarkPositionChange = async (position: string) => {
    setUploadState((prevState) => ({
      ...prevState,
      watermark_position: position,
    }));
    
    // Auto-submit after position change
    const formData = new FormData();
    formData.append('watermark_position', position);

    try {
      const response = await mutate("admin/application-configs", formData);
      
      if(!response.error){
        toast({
          title: "Success",
          description: "Watermark position updated successfully",
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Failed to update watermark position:', error);
    }
  };



  const renderFileInput = (id: string, label: string, type: keyof PrefixUploadState) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor={id}>{label}</Label>
        <Button
          variant="default"
          id={type}
          disabled={isLoading}
          onClick={() => handleSubmit(type)}
          className="py-2 px-3"
        >
          <Upload size={15} />
        </Button>
      </div>
      <Input
        id={id}
        type="file"
        accept="image/*"
        className='file:text-white'
        onChange={(e) => handleFileUpload(e, type)}
      />
      {uploadState[type] && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Preview:</p>
          <img
            src={imageRender(uploadState[type])}
            alt={`${label} preview`}
            className="h-40 object-cover"
          />
        </div>
      )}
      {errors[type] && (
        <p className="text-sm text-red-500 mt-2">{errors[type]}</p> // Display error message
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prefix Upload</CardTitle>
          <CardDescription>Upload your watermark, intro, and outro images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Watermark Upload</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Select 
                value={uploadState.watermark_position} 
                onValueChange={handleWatermarkPositionChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Watermark Position" />
                </SelectTrigger>
                <SelectContent>
                  {watermarkPositions.map((position) => (
                    <SelectItem
                      key={position}
                      value={position}
                    >
                      {position.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            {renderFileInput("water_mark", "Watermark Image", "water_mark")}

            <h2 className="text-lg font-semibold mt-6">Intro and outro image</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {renderFileInput("intro_a", "Intro Image", "intro_a")}
              {renderFileInput("outro_a", "Outro Image", "outro_a")}
            </div>

            {/* <h2 className="text-lg font-semibold mt-6">For Usage B</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {renderFileInput("intro_b", "Intro Image", "intro_b")}
              {renderFileInput("outro_b", "Outro Image", "outro_b")}
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
