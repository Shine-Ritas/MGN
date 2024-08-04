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
import { useState } from "react"
import FormInput from "@/components/ui/custom/FormInput"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { comicValidationSchema } from "./ComicActionValidation"
import FormTextBox from "@/components/ui/custom/FormTextBox"
import { ComicProgress, ComicType } from "@/constants/constants"
import { Label } from "@/components/ui/label"
import PublishTab from "./PublishTab"
import FormSelect from "@/components/ui/custom/FormSelect"

const Action = () => {

  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [bindData,setBindData] = useState<any>({
    status : 1,
    legal_age : false,
  });


  const {
    register,
    handleSubmit,
 
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(comicValidationSchema)
  });



  const onSubmit =(data: any) => {
    data.status = bindData.status
    data.legal_age = bindData.legal_age
    // id array only distinct
    data.categories = [...new Set(selectedCategories.map((item: any) => item.id))]
    console.log(data);
    console.log(errors)
  }


  return (

    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto  flex-1 auto-rows-max gap-4 ">
        <div className="flex items-center gap-4 mb-10">
          <Goback to={-1} />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Manga Title
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            Published
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {/* <Button variant="outline" size="sm">
                  Discard
                </Button> */}
            <Goback to={-1} label="Discard" />

            <Button type="submit" size="sm">Save</Button>
          </div>
        </div>
        <div className="grid gap-4  lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
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


              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                  <FormSelect selectKey="mogou_type" collection={ComicType} setValue={setValue} errors={errors} />

                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <FormSelect selectKey="finish_status" collection={ComicProgress} setValue={setValue} errors={errors} />
                  </div>
                </CardContent>
              </Card>
            </div>

           

          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

          <Card >
           
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
                  legal_age: value
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
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>


            <div className="grid gap-6 sm:grid-cols-1 ">
              <div className="grid gap-4">
                <CategorySelect holderCategories={selectedCategories} setHolderCategories={setSelectedCategories} />
              </div>
            </div>
              
            <PublishTab status={bindData.status} setStatus={setBindData}/>

          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden mt-4">
          <Goback to="/comics" label="Discard" />

          <Button type="submit" size="sm">Save</Button>
        </div>
      </form>
    </main>

  )
}

export default Action