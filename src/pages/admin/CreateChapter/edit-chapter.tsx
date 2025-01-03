import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ChapterContent from "./chapter-content"
import useMutate from "@/hooks/useMutate"
import { createCard1Validation, createCard1ValidationType } from "./chapter-validation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useServerValidation from "@/hooks/useServerValidation"
import FormInput from "@/components/ui/custom/FormInput"
import FormTextBox from "@/components/ui/custom/FormTextBox"
import { useParams } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import Goback from "@/components/goback-btn"
import useQuery from "@/hooks/useQuery"
import { NewChapterInfo } from "./new-chapter"
import DeleteConfirmationDialog from "./delete-chapter-dialog"


export default function EditChapter() {

  const { slug: mogou_slug } = useParams<{ slug: string }>();
  const chapterId = useParams<{ id: string }>();

  const { data, isLoading: isL } = useQuery(`admin/sub-mogous/show/${mogou_slug}/${chapterId.id}`)

  const [chapterInfo, setChapterInfo] = useState<NewChapterInfo>({
    id: chapterId.id! as string,
    title: "",
    slug: "",
    description: "",
    chapterNumber: null,
    thirdPartyRedirect: data?.sub_mogou?.third_party_redirect,
    thirdPartyUrl: "",
    isSubscriptionOnly: data?.sub_mogou?.subscription_only,
    mogou_slug: mogou_slug!
  })

  const handleSwitchChange = (key: string, checked: boolean) => {
    setChapterInfo((prev) => ({ ...prev, [key]: checked }))
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

  const [mutate, { isLoading }] = useMutate({ callback:undefined, navigateBack: false });

  const handleSubmitCard1 = async (data: createCard1ValidationType) => {
    const formData = {
      ...data,
      id: chapterInfo.id,
      mogou_slug: mogou_slug,
      subscription_only: chapterInfo.isSubscriptionOnly,
      third_party_redirect: chapterInfo.thirdPartyRedirect,
    }
    const response = await mutate("admin/sub-mogous/update-draft", formData) as any;
    if (response && response.error) {
      handleServerErrors(response.error, setError);
    }
    else{
      setChapterInfo((prev) => ({ ...prev, id: response?.sub_mogou?.id, slug: response?.sub_mogou?.slug }))
      toast({
        title: "Success",
        description: "Chapter updated successfully",
        variant: "success"
      })
    }
  }

  const handleDeleteChapter = useCallback(async () => {
    const response = await mutate("admin/sub-mogous/delete", {
      mogou_slug: mogou_slug,
      sub_mogou_id: chapterInfo.id
    }) as any;
    if (response && response.error) {
      handleServerErrors(response.error, setError);
      return false;
    } else {
      toast({
        title: "Success",
        description: "Chapter deleted successfully",
        variant: "success"
      })

      setTimeout(() => {
        window.location.href = `/admin/mogou/${mogou_slug}/chapters`;
      }, 2000);

      return true;
    }
  }, [chapterInfo.id, handleServerErrors, mogou_slug, mutate, setError])

  useEffect(() => {
    if (!isL && data?.sub_mogou) {
      setChapterInfo((prev) => ({ ...prev, thirdPartyRedirect: data?.sub_mogou?.third_party_redirect, isSubscriptionOnly: data?.sub_mogou?.subscription_only }))
    }

  }, [data, isL, mogou_slug, setValue])

  if (isL || !data?.sub_mogou) {
    return <div>

      <div className="flex gap-4 items-center justify-between mb-3">
        <Goback to={-1} />
       
      </div>

      {
        isL ? "Loading..." : "Not Found"
      }
    </div>
  }

  return (
    <div className="w-full mx-auto py-4 space-y-4">

      <div className="flex items-center justify-between gap-4 mb-10">

        <div className="flex gap-4 items-center justify-between">
          <Goback to={-1} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Modify Chapter
          </h1>
        </div>
        <DeleteConfirmationDialog
        onLoading={isLoading}
        chapterTitle={data?.sub_mogou?.title}
        handleDelete={handleDeleteChapter} />
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
                fieldError={errors?.title}
                placeholder='Enter chapter title'
                defaultValue={data?.sub_mogou?.title}
                disabled={isLoading}
                register={register("title")} />

            </div>
            <div className="space-y-2">
              <FormTextBox
                label="Description"
                placeholder="Enter chapter description"
                defaultValue={data?.sub_mogou?.description}
                register={register('description')}
                setValue={setValue}
                disabled={isLoading}

                fieldError={errors?.description} />
            </div>
            <div className="space-y-2">
              <FormInput
                type="number"
                label='Chapter Number'
                fieldError={errors?.chapter_number}
                placeholder='Enter chapter number'
                defaultValue={data?.sub_mogou?.chapter_number}
                disabled={isLoading}
                register={register("chapter_number")} />
            </div>
            <div className="space-y-2">

              <FormInput
                label='Third-Party URL'
                fieldError={errors?.third_party_url}
                placeholder='https://example.com'
                disabled={isLoading}
                defaultValue={data?.sub_mogou?.third_party_url}

                register={register("third_party_url")} />

            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isSubscriptionOnly"
                  checked={chapterInfo.isSubscriptionOnly}
                  disabled={isLoading}
                  onCheckedChange={(checked) => handleSwitchChange("isSubscriptionOnly", checked)}
                />
                <Label htmlFor="isSubscriptionOnly">Subscription Only</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ThirdPartyRedirect"
                  checked={chapterInfo.thirdPartyRedirect}
                  disabled={isLoading}
                  onCheckedChange={(checked) => handleSwitchChange("thirdPartyRedirect", checked)}
                />
                <Label htmlFor="ThirdPartyRedirect">Third Party Redirect</Label>
              </div>
            </div>


            <CardFooter className="px-0">
              <Button
                disabled={isLoading}
                type="submit">
                Save Chapter
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

        <div className="grid  gap-4 relative">
       
        <ChapterContent
          chapterInfo={data?.sub_mogou}
          isCard1Submitted={true} />
      </div>
    </div>
  )
}
