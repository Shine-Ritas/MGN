import {
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

import Goback from "@/components/goback-btn"
import CategorySelect from "./CategorySelect"
import { useRef, useState } from "react"
import FormInput from "@/components/ui/custom/FormInput"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { comicValidationSchema } from "./ComicActionValidation"
import FormTextBox from "@/components/ui/custom/FormTextBox"
import { ComicProgress, ComicType } from "@/constants/constants"
import { Label } from "@/components/ui/label"
import PublishTab from "./PublishTab"
import FormSelect from "@/components/ui/custom/FormSelect"
import useMutate from "@/hooks/useMutate"
import { Rating } from "@/components/ui/rating"
import ImageCropper from "@/components/ui/image-cropper"
import { Input } from "@/components/ui/input"
import InputError from "@/components/ui/input-error"
import { toast } from "@/components/ui/use-toast"

const Action = () => {

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCover, setCurrentCover] = useState<any>(null);
  const [bindData, setBindData] = useState<any>({
    status: 1,
    legal_age: false,
    rating: 1,
    cover: null
  });
  const coverImageInput = useRef<HTMLInputElement>(null);

  const onSuccessCallback = () => {
    toast({
      title: "New Mogou Created was Successful",
      description: "",
      variant: "success",
    });
  };

  const [mutate, { isLoading }] = useMutate({ callback: onSuccessCallback });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(comicValidationSchema)
  });

  const onSubmit = async (data: any) => {
    data.status = bindData.status;
    data.legal_age = bindData.legal_age ? 1 : 0;
    data.rating = bindData.rating;
    data.categories = [...new Set(selectedCategories.map((item: any) => item.id))];
    data.cover = bindData.cover;

    const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "categories") {
          data[key].forEach((category: any) => {
            formData.append("categories[]", category);
          });
        }
        else{
          formData.append(key, data[key]);
        }
      }
    );

    const response = await mutate("admin/mogous", formData);
    console.log(response);
  };

  const handleRating = (value: number) => {
    setBindData({
      ...bindData,
      rating: value
    });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex-1 auto-rows-max gap-4" encType="multipart/form-data">
        <div className="flex items-center gap-4 mb-10">
          <Goback to={-1} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Manga Title
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            Published
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Goback to={-1} label="Discard" />
            <Button
              disabled={isLoading}
              type="submit" size="sm">Save</Button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Customization</CardTitle>
                <CardDescription>
                  Editing the Comic details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 md:grid-cols-2">
                    <FormInput label="Title" placeholder="Title" register={register('title')} fieldError={errors?.title} />
                    <FormInput label="Author" placeholder="Author Name" register={register('author')} fieldError={errors?.author} />
                  </div>
                  <div className="grid gap-3">
                    <FormTextBox label="Description" placeholder="Description" register={register('description')} fieldError={errors?.description} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <FormSelect selectKey="mogou_type"
                    defaultValue="0"
                    collection={ComicType} setValue={setValue} errors={errors} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <FormSelect selectKey="finish_status"
                    defaultValue="0"
                    collection={ComicProgress} setValue={setValue} errors={errors} />
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-6 col-span-2">
                <div className="grid gap-4">
                  <CategorySelect holderCategories={selectedCategories} setHolderCategories={setSelectedCategories} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardContent className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5 grid">
                  <Label className="text-base">
                    Mature Content
                  </Label>
                  <Label className="text-sm text-muted-foreground">
                    This comic contains mature content
                  </Label>
                </div>
                <Switch
                  checked={bindData.legal_age}
                  onCheckedChange={(value) => setBindData({
                    ...bindData,
                    legal_age: value ? "1" : "0"
                  })} />
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Cover</CardTitle>
                <CardDescription>
                  Background Cover
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    {
                      currentCover ? <img src={currentCover}
                      onClick={() => {
                        coverImageInput.current?.click();
                      }}
                       alt="cover" className="flex aspect-auto w-full items-center justify-center rounded-md border
                      min-w-28 object-contain " /> :
                        <button
                          type="button"
                          onClick={() => {
                            coverImageInput.current?.click();
                          }}
                          className="flex aspect-auto w-full items-center justify-center rounded-md border border-dashed min-h-32 min-w-28">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                    }
                    <Input type="file"
                      ref={coverImageInput}
                      onChange={(e) => {
                        console.log(e.target.files);
                        setCurrentCover(URL.createObjectURL(e.target.files?.[0] !));
                        setBindData({
                          ...bindData,
                          cover: e.target.files?.[0]
                        });
                      }}
                      className="hidden" />
                    <ImageCropper
                      open={modalOpen}
                      setOpen={setModalOpen}
                      imgSrc={coverImageInput.current?.files?.[0] ? URL.createObjectURL(coverImageInput.current.files[0]) : null}
                    >
                      <div></div>
                    </ImageCropper>
                    <InputError field={errors?.cover} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Rating rating={1} onRatingChange={handleRating} variant="yellow" />
                </div>
              </CardContent>
            </Card>
            <PublishTab status={bindData.status} setStatus={setBindData} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden mt-4">
          <Goback to="/comics" label="Discard" />
          <Button type="submit" size="sm" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Action;
