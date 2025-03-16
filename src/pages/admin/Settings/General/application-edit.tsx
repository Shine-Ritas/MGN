
import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImageIcon, UploadIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import FormInput from "@/components/ui/custom/FormInput"
import useMutate from "@/hooks/useMutate"
import useSecureStorage from "@/hooks/useSecureStorage"


const ApplicationEdit = ({ applicationConfig }) => {

    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { remove } = useSecureStorage();


    const onSuccessCallback = (data) => {
        remove("application-config");
        console.log(data)
    }

    const [mutate, { isLoading }] = useMutate({ callback: onSuccessCallback });


    const { register, handleSubmit, setValue, formState: { errors } } = useForm<any>();

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setValue("logo", file)

            const reader = new FileReader()
            reader.onload = (event) => {
                setLogoPreview(event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = useCallback(async (data: any) => {
        const response = await mutate("/admin/application-configs",data);

    }, [mutate]);

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="w-full  col-span-2">
            <CardHeader>
                <CardTitle className="text-2xl">Application Setting</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <FormInput
                            divClassName=' items-center '
                            label='Application Title'
                            defaultValue={applicationConfig?.title}
                            placeholder='Title'
                            fieldError={errors?.title}
                            register={register("title")} />

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="logo">Logo</Label>
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                                onClick={triggerFileInput}
                            >
                                {logoPreview ? (
                                    <div className="relative w-full h-40 flex items-center justify-center">
                                        <img
                                            src={logoPreview || "/placeholder.svg"}
                                            alt="Logo preview"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">Click to upload logo</p>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </div>
                            {logoPreview && (
                                <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
                                    <UploadIcon className="h-4 w-4 mr-2" />
                                    Change Logo
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <FormInput
                            label='Daily Traffic Target' defaultValue={applicationConfig?.daily_traffic_target} placeholder='Enter You Daily Traffic Target' register={register("daily_traffic_target")} />

                    </div>

                    <div className="space-y-2">
                        <FormInput
                            label='Daily Subscriptions Target' defaultValue={applicationConfig?.daily_subscriptions_target} placeholder='Enter You Daily Target' register={register("daily_subscriptions_target")} />
                    </div>

                    <div className="space-y-2">
                        <FormInput
                            label='Monthly Subscriptions Target' defaultValue={applicationConfig?.monthly_subscriptions_target} placeholder='Enter You Daily Target' register={register("monthly_subscriptions_target")} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                    disabled={isLoading}
                     type="submit" className="w-full">
                        Save Settings
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}



export default ApplicationEdit