import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Goback from '@/components/goback-btn'
import { adminRouteCollection } from '@/routes/data/admin_route'
import useQuery from '@/hooks/useQuery'
import { Badge } from '@/components/ui/badge'
import { SubscriptionType } from '../Subscription/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubscriptionUser, subscriptionValidationSchema } from './SubscriptionUserValidation'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/ui/custom/FormInput'
import FormInputPassword from '@/components/ui/custom/FormInputPassword'
import InputError from '@/components/ui/input-error'
import useMutate from '@/hooks/useMutate'
import useServerValidation from '@/hooks/useServerValidation'
import { toast } from '@/components/ui/use-toast'


const AddUser = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError
    } = useForm<SubscriptionUser>({
        resolver: yupResolver(subscriptionValidationSchema)
    });

    const onSuccessCallback = () => {
        toast({
            title: "User Created",
            description: `User has been created successfully`,
        })
    }

    const [mutate, { isLoading: isSubmiting }] = useMutate({ callback: onSuccessCallback });
    const { handleServerErrors } = useServerValidation();

    const onSubmit = async(data: SubscriptionUser) => {
        const response = await mutate("admin/users",data) as any;
        if (response && response.error) {
            handleServerErrors(response.error, setError);
        }
    }

    const {data, isLoading} = useQuery("/admin/subscriptions?limit=100");

    if(isLoading)
        return <div>Loading...</div>

    return (
        <main className=" flex-1 items-start gap-4 md:pt-4 md:gap-8">
            <div className="mx-auto  flex-1 auto-rows-max gap-4 ">
                <div className="flex items-center gap-4 mb-10">
                    <Goback to={adminRouteCollection.users} />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Add User
                    </h1>
                    {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                        Published
                    </Badge> */}
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Goback to={adminRouteCollection.users} label="Discard"/>

                        <Button
                        disabled={isSubmiting}
                        onClick={handleSubmit(onSubmit)}
                        size="sm">Register</Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                                    <div className="grid gap-3">
                                        <div>
                                        <FormInput
                                        divClassName='grid-cols-2 items-center  '
                                        fieldError={errors.name}
                                        label='Name' defaultValue={""} placeholder='Enter Name For User' register={register("name")} />
                                        </div>
                                      
                                    </div>

                                    <div className="grid gap-3">
                                        <div>
                                        <FormInput
                                        divClassName='grid-cols-2 items-center  '
                                        fieldError={errors.user_code}
                                        label='User Code' defaultValue={""} placeholder='Enter User Code For Login' register={register("user_code")} />
                                        </div>
                                      
                                    </div>

                                    <div className="grid gap-3">
                                        <FormInput
                                        divClassName='grid-cols-2 items-center'
                                        fieldError={errors.email}
                                        label='Email (optional)' defaultValue={""} placeholder='Enter Name For Email' register={register("email")} />
                                    </div>

                                    <div className="grid gap-3">
                                        <FormInputPassword
                                        fieldError={errors.password}
                                        divClassName='grid-cols-2 items-center'
                                        label='Password' defaultValue={""} placeholder='Enter Password' register={register("password")} />
                                      
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle className=''>
                                    Users

                                    <Badge variant="outline" className="ml-2 float-right">
                                        {
                                            data?.total_user_subscription
                                        }
                                    </Badge>
                                    
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        {/* <Label htmlFor="tier">Tier</Label> */}
                                        <Select
                                            onValueChange={(value) => setValue("current_subscription_id", Number(value))}
                                        >
                                            <SelectTrigger
                                                id="tier" aria-label="Select">
                                                <SelectValue 

                                                placeholder="Select One" />
                                            </SelectTrigger>
                                            <SelectContent
                                            >
                                                {
                                                    data?.subscriptions?.data.map((subscription: SubscriptionType) => (
                                                        <SelectItem key={subscription.id} value={!subscription.id?.toString() ? '0' : subscription.id.toString()
                                                        }>{subscription.title}</SelectItem>
                                                    ))
                                                }
                                             
                                            </SelectContent>
                                        </Select>
                                        <InputError field={errors.current_subscription_id} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>


                <div className="flex items-center justify-center gap-2 md:hidden  mt-5">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button 
                    disabled={isSubmiting}
                    onClick={handleSubmit((data) => console.log(data))}
                    size="sm">Register</Button>
                </div>
            </div>

        </main>
    )
}

export default AddUser