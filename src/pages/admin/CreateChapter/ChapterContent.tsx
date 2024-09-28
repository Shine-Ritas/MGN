import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import {  Upload } from "lucide-react"
import { useState } from "react"
import { NewChapterInfo } from "./NewChapter"

type ChapterContentProps = {
    isCard1Submitted: boolean,
    chapterInfo : NewChapterInfo
}

const ChapterContent = ({isCard1Submitted,chapterInfo} : ChapterContentProps) => {

  const [chapterContent, setChapterContent] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0])
    }
  }

  const simulateFileUpload = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 500)
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
      <CardTitle>Chapter Content</CardTitle>
      <CardDescription>Upload the chapter content as a ZIP or PDF file.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="chapterContent">Upload Chapter Content (ZIP or PDF)</Label>
        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-4 text-center">
          <Input
            id="chapterContent"
            type="file"
            accept=".zip,.pdf"
            onChange={(e) => {
              handleFileUpload(e, setChapterContent)
              simulateFileUpload()
            }}
            disabled={!isCard1Submitted}
            className="hidden"
          />
          <Label htmlFor="chapterContent" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <span className="mt-2 block">Drag and drop or click to upload</span>
          </Label>
        </div>
        {chapterContent && <p className="text-sm">{chapterContent.name}</p>}
      </div>
      {uploadProgress > 0 && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-center">{uploadProgress}% uploaded</p>
        </div>
      )}
    </CardContent>
  </Card>
  )
}

export default ChapterContent