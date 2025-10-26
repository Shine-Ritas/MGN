import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import ChapterContentViewGrid from "./chapter-content-view-grid"
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button"
import useMutate from "@/hooks/useMutate"
import { Checkbox } from "@/components/ui/checkbox"
import { extractZip } from "@/utilities/util"
import { Label } from "@/components/ui/label"


type ChapterContentProps = {
  isCard1Submitted: boolean,
  chapterInfo: any
}

export interface FileWithUniqueId extends File {
  id: string;
  isUploaded?: boolean;
  isUploading?: boolean;
  isChanged?: boolean;
  mogou_id?: number;
  sub_mogou_id?: number;
  path?: string;
  position?: string;
}


const ChapterContent = ({ isCard1Submitted, chapterInfo }: ChapterContentProps) => {

  const [chapterContent, setChapterContent] = useState<FileWithUniqueId[]>([])
  const [applyWatermark, setApplyWatermark] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [uploadToServer, { isLoading }] = useMutate();

  useEffect(() => {
    const uploaded_images = chapterInfo?.images.map((image: any) => ({
      ...image, // Spread the existing properties of the image
      isUploaded: true, // Add the new property
      isUploading: false,
      isChanged:false
    }));

    setChapterContent(uploaded_images);
  }, [chapterInfo?.images])


  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    let allExtractedImages: File[] = [];

    setUploadProgress(0);
  
    for (const file of acceptedFiles) {
      if (file.type === "application/zip" || file.name.toLowerCase().endsWith('.cbz')) {
        try {
            const images = await extractZip(file);
            const sortedImages = images.sort((a, b) =>
              a.name.localeCompare(b.name, undefined, { numeric: true })
            );
            
            console.log(sortedImages)
            allExtractedImages.push(...sortedImages);
        } catch (error) {
          console.error("Error extracting ZIP:", error);
        }
      } else {
        allExtractedImages.push(file); // Directly add non-zip files
      }
    }
  
    if (allExtractedImages.length === 0) {
      console.warn("No valid images found.");
      return;
    }
  
    // ✅ Chunk processing for performance
    const CHUNK_SIZE = 20;
    let processedCount = 0;
    const totalImages = allExtractedImages.length;
    const imagesWithId: FileWithUniqueId[] = [];
  
    for (let i = 0; i < totalImages; i += CHUNK_SIZE) {
      const chunk = allExtractedImages.slice(i, i + CHUNK_SIZE);
  
      const chunkResults = chunk.map((image) => {
        return Object.assign(image, {
          id: uuidv4(),
          isUploaded: false,
          isUploading: false,
        });
      });

      console.log(chunkResults)
  
      imagesWithId.push(...chunkResults);
      processedCount += chunkResults.length;
  
      const progress = Math.round((processedCount / totalImages) * 100);
      setUploadProgress(progress);
    }
  
    setChapterContent((prev) => [...prev, ...imagesWithId]);
    setUploadProgress(100);
  }, []);



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', 'jpg'],
      'application/zip': ['.zip'],
      'application/x-cbz': ['.cbz'],
    },
    maxSize: 500 * 1024 * 2048, // 200MB
  });


  const upload = async () => {
    const formData = new FormData();
    formData.append("mogou_id", chapterInfo.mogou_id as string);
    formData.append("sub_mogou_slug", chapterInfo.slug as string);
    formData.append("watermark_apply", "1");

    // Filter files to be uploaded
    const toUploadContents = chapterContent.filter((file) => !file.isUploaded);

    // Chunk size

    setChapterContent((prev) =>
      prev.map((content) => {
        if (toUploadContents.find((file) => file.id === content.id)) {
          content.isUploading = true;
        }
        return content;
      })
    );

    const chunkSize = 3;

    // Helper function to upload a single chunk
    const uploadChunk = async (chunk: FileWithUniqueId[]) => {
      const formData = new FormData();
      formData.append("mogou_id", chapterInfo.mogou_id as string);
      formData.append("ulid", chapterInfo.ulid as string);
      formData.append("watermark_apply", applyWatermark ? "1" : "0");

      chunk.forEach((file, index) => {
        // find the index of the file in the chapterContent array
        const page_number = chapterContent.findIndex((f) => f.id === file.id);
        formData.append(`upload_files[${index}][file]`, file);
        formData.append(`upload_files[${index}][page_number]`, page_number.toString());
      });


      const uploading = await uploadToServer("admin/sub-mogous/upload-files", formData);

      if (uploading && !uploading.error) {
        chunk.forEach((file) => {
          const index = chapterContent.findIndex((f) => f.id === file.id);
          if (index !== -1) {
            chapterContent[index].isUploaded = true;
            chapterContent[index].mogou_id = chapterInfo.mogou_id;
            chapterContent[index].sub_mogou_id = chapterInfo.id;
            chapterContent[index].isUploading = false;
          }
        });
      }
    };

    // Split files into chunks and upload sequentially
    for (let i = 0; i < toUploadContents.length; i += chunkSize) {
      const chunk = toUploadContents.slice(i, i + chunkSize);
      await uploadChunk(chunk);
    }

   
  };
  return (
    <Card className="relative overflow-hidden">
      {!isCard1Submitted && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-10">

          <Lock className="w-12 h-12 text-muted-foreground" />
          <h3>Create Chapter Information First</h3>
        </div>
      )}
      <CardHeader>
        {/* Title and Status Indicators */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center flex-wrap gap-3">
              Chapter Content
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-1 text-xs">
                  <Button className="w-4 h-4 p-0 rounded-sm " variant={'destructive'}></Button>
                  <span>Not Uploaded</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs">
                  <Button className="w-4 h-4 p-0 rounded-sm" variant={'success'}></Button>
                  <span>Uploaded</span>
                </div>
              </div>
            </CardTitle>
            <CardDescription>Upload the chapter content as a ZIP, CBZ, or PDF file. ( Compressed files are recommended to faster uplaod )</CardDescription>
          </div>

          {/* Controls - Stack on mobile, side by side on desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Watermark Checkbox */}
            <div className="flex items-center gap-3">
              <Label>Apply Watermark</Label>
              <Checkbox 
                checked={applyWatermark}
                onCheckedChange={(checked) => setApplyWatermark(checked as boolean)}
              />
            </div>

            {/* Upload Button */}
            <Button
              disabled={isLoading}
              onClick={upload}
              className="w-full sm:w-auto">
              Upload
            </Button>
          </div>
        </div>
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
                <p>Drop the files here...</p>
              ) : (
                <p>Drag 'n' drop a Zip or CBZ file here, or click to select a file</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">(PNG, 100x100 to 1000x1000 pixels, max 200MB)</p>
            </div>
          </div>

        </div>
      </CardContent>

      <ChapterContentViewGrid uploadedData={chapterContent} setUploadedData={setChapterContent} />
    </Card>
  )
}

export default ChapterContent