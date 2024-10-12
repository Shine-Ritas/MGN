"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import ChapterVisual from "./ChapterVisual"
import ChapterContent from "./ChapterContent"
import useMutate from "@/hooks/useMutate"
import { createCard1Validation, createCard1ValidationType } from "./createChapterValidation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useServerValidation from "@/hooks/useServerValidation"
import FormInput from "@/components/ui/custom/FormInput"
import FormTextBox from "@/components/ui/custom/FormTextBox"
import { useParams } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import Goback from "@/components/goback-btn"


// return type of createCard1Validation

export type NewChapterInfo = {
  id: number | null;
  title: string;
  slug: string;
  description: string;
  chapter_number: null;
  thirdPartyUrl: string;
  isSubscriptionOnly: boolean;
}

export default function NewChapter() {

  const { slug:mogou_slug } = useParams<{ slug: string }>();

  const [isCard1Submitted, setIsCard1Submitted] = useState(false)
  const [chapterInfo, setChapterInfo] = useState<NewChapterInfo>({
    id: null,
    title: "",
    slug: "",
    description: "",
    chapter_number: null,
    thirdPartyUrl: "",
    isSubscriptionOnly: false,
  })

  const handleSwitchChange = (checked: boolean) => {
    setChapterInfo((prev) => ({ ...prev, isSubscriptionOnly: checked }))
  }

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<createCard1ValidationType>({
    resolver: yupResolver(createCard1Validation)
  });

  const { handleServerErrors } = useServerValidation();

  const createOnSuccess = (response: any) => {
    toast({
      title: "Chapter Created",
      description: "Chapter has been created successfully",
      variant: "success"
    })
    setIsCard1Submitted(true);
    setChapterInfo((prev) => ({ ...prev, id: response.sub_mogou.id, slug: response.sub_mogou.slug }))
  }

  const [createChapter, { isLoading }] = useMutate({ callback: createOnSuccess, navigateBack: false });

  const handleSubmitCard1 = async (data: createCard1ValidationType) => {
    const formData = {
      ...data,
      mogou_slug: mogou_slug,
      subscription_only: chapterInfo.isSubscriptionOnly
    }
    const response = await createChapter("admin/sub-mogous/new-draft", formData) as any;
    if (response && response.error) {
      handleServerErrors(response.error, setError);
    }
  }

  return (
    <div className="w-full mx-auto py-4 space-y-4">

    <div className="flex items-center justify-between gap-4 mb-10">

        <div className="flex gap-4 items-center">
            <Goback to={-1} />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Chapters
            </h1>
        </div>
    </div>

      {/* Card 1: Chapter Information Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Chapter Information</CardTitle>
          <CardDescription>Enter the main details about the manga chapter.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitCard1)} className="space-y-4">
            <div className="space-y-2">

              <FormInput
                divClassName=' '
                label='Title'
                defaultValue={""}
                fieldError={errors?.title}
                placeholder='Enter chapter title'
                disabled={isLoading || isCard1Submitted}
                register={register("title")} />

            </div>
            <div className="space-y-2">
              <FormTextBox
                label="Description"
                placeholder="Enter chapter description"
                defaultValue={""}
                register={register('description')}
                setValue={setValue}
                disabled={isLoading || isCard1Submitted}

                fieldError={errors?.description} />
            </div>
            <div className="space-y-2">
              <FormInput
                type="number"
                label='Chapter Number'
                fieldError={errors?.chapter_number}
                placeholder='Enter chapter number'
                disabled={isLoading || isCard1Submitted}
                register={register("chapter_number")} />
            </div>
            <div className="space-y-2">

              <FormInput
                label='Third-Party URL'
                defaultValue={""}
                fieldError={errors?.third_party_url}
                placeholder='https://example.com'
                disabled={isLoading || isCard1Submitted}
                register={register("third_party_url")} />

            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isSubscriptionOnly"
                checked={chapterInfo.isSubscriptionOnly}
                disabled={isLoading || isCard1Submitted}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isSubscriptionOnly">Subscription Only</Label>
            </div>
            <CardFooter className="px-0">
              <Button 
              disabled={isLoading || isCard1Submitted}
              type="submit">Submit Chapter Information</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Cards 2 & 3: Visuals and Content Upload */}
      <div className="grid md:grid-cols-2 gap-4 relative">
        {/* Card 2: Chapter Visuals */}
        <ChapterVisual
        chapterInfo={chapterInfo}
        isCard1Submitted={isCard1Submitted} />

        {/* Card 3: Chapter Content */}
        <ChapterContent
        chapterInfo={chapterInfo}
        isCard1Submitted={isCard1Submitted} />
      </div>
    </div>
  )
}
