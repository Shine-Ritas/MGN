import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { CalendarIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { SubscribedUser } from './types'
import { Button } from '@/components/ui/button'
import useMutate from '@/hooks/useMutate'
import useServerValidation from '@/hooks/useServerValidation'
import { toast } from '@/components/ui/use-toast'
import { UserDetailInfoValidationSchema, UserDetailInfo } from './SubscriptionUserValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputError from '@/components/ui/input-error'
import { useCallback } from 'react'


const UserInfoDetail = ({user}:{user : SubscribedUser}) => {
      const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<UserDetailInfo>({
        resolver: yupResolver(UserDetailInfoValidationSchema)
    });

    const onSuccessCallback = useCallback(()=>{
        toast({
            title: "User Updated",
            description: `User has been Updated successfully`,
        })
    },[])

    const [mutate, { isLoading: isSubmiting }] = useMutate({ callback: onSuccessCallback });
    const { handleServerErrors } = useServerValidation();

    const onSubmit = async(data: UserDetailInfo) => {
        data['id'] = user.id;
        const response = await mutate("admin/users/update",data) as any;
        if (response && response.error) {
            handleServerErrors(response.error, setError);
        }
    }

  return (
    <Card className="col-span-2 md:col-span-1">
    <CardHeader className='relative'>
      <CardTitle>User Details</CardTitle>
      <CardDescription>Manage your profile information and account settings</CardDescription>

      <Button
      disabled={isSubmiting}
      onClick={handleSubmit(onSubmit)}
      className='absolute right-5 top-3' size="lg">Save Changes</Button>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <div className="flex">
          <UserIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <Input id="name" defaultValue={user.name} 
          {...register('name')}
          />
        </div>
          <InputError field={errors.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex">
          <MailIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <Input id="email" type="email" defaultValue={user.email} autoComplete="off"
          {...register('email')}
          />
        </div>
          <InputError field={errors.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex">
          <LockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <Input id="password" type="password"
          {...register('password')}
          />
        </div>
          <InputError field={errors.password} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-code">User Code</Label>
        <Input id="user-code" defaultValue={user.user_code}
        {...register('user_code')}
        />
        <InputError field={errors.user_code} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subscription">Current Subscription</Label>
        <Input id="subscription" value={user.subscription_name} readOnly disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subscription-end">Subscription End Date</Label>
        <div className="flex">
          <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <Input id="subscription-end" value={user.subscription_end_date} readOnly disabled />
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default UserInfoDetail