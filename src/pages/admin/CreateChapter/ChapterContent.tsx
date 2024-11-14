import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import ChapterContentViewGrid from "./ChapterContentViewGrid"
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button"
import JSZip from 'jszip';
import useMutate from "@/hooks/useMutate"

type ChapterContentProps = {
  isCard1Submitted: boolean,
  chapterInfo: any
}

export interface FileWithUniqueId extends File {
  id: number | never;
  isUploaded?: boolean;
}


const ChapterContent = ({ isCard1Submitted, chapterInfo }: ChapterContentProps) => {

  const [chapterContent, setChapterContent] = useState<FileWithUniqueId[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const [uploadToServer, { isLoading }] = useMutate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const files = acceptedFiles;

    console.log(files);


    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type === 'application/zip') {
        try {
          // Create a new JSZip instance
          const zip = new JSZip();

          await zip.loadAsync(file)

          setUploadProgress(100); // Complete when done
        } catch (err) {
          console.error('Error unzipping file:', err);
        }
      } else {
        file['id'] = uuidv4();
        file['isUploaded'] = false;
        setChapterContent((prev) => [...prev, file as FileWithUniqueId]);
      }
    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', 'jpg'],
      'application/zip': ['.zip'],
    },
    maxSize: 500 * 1024 * 1024, // 100MB
  });


  const upload = async () => {
    const formData = new FormData();
    formData.append("mogou_id", chapterInfo.mogou_id as string);
    formData.append("sub_mogou_slug", chapterInfo.slug as string);
    
    // Filter and map in one step, then append each file to FormData
    chapterContent
      .filter((file) => !file.isUploaded)
      .forEach((file, index) => {
        formData.append(`upload_files[${index}][file]`, file);
        formData.append(`upload_files[${index}][page_number]`, index.toString());
      });
    

    await uploadToServer("admin/sub-mogous/upload-files", formData);
  }


  return (
    <Card className="relative overflow-hidden">
      {!isCard1Submitted && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">

          <Lock className="w-12 h-12 text-muted-foreground" />
          <h3>Create Chapter Information First</h3>
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center">
          Chapter Content
          <div className="inline-flex items-center gap-1 text-xs mx-3">
            <Button className="w-4 h-4 p-0 rounded-sm " variant={'destructive'}></Button><span>Not Uploaded</span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs  py-0">
            <Button className="w-4 h-4 p-0 rounded-sm" variant={'success'}></Button><span>Uploaded</span>
          </div>
        </CardTitle>
        <CardDescription>Upload the chapter content as a ZIP or PDF file.</CardDescription>

        <Button 
        disabled={isLoading}
        onClick={upload} className="absolute top-4 right-4">
          Upload
        </Button>

      </CardHeader>
      <CardContent className="space-y-4">
        {uploadProgress > 0 && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-center">{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="space-y-2 pt-2">
          <div className="mb-4">
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the Zip file here...</p>
              ) : (
                <p>Drag 'n' drop a Zip file here, or click to select a file</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">(PNG, 100x100 to 1000x1000 pixels, max 3MB)</p>
            </div>
          </div>

        </div>
      </CardContent>

      <ChapterContentViewGrid uploadedData={chapterContent} />
    </Card>
  )
}

export default ChapterContent