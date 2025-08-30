import { Link } from "react-router-dom"
import Logo from "@/assets/imgs/logo.png"
import FormInput from "@/components/ui/custom/FormInput"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { registerValidationSchema } from "./RegisterValidation"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import useMutate, { useMutateCallbackType } from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"
import useSecureStorage from "@/hooks/useSecureStorage"
import { Button } from "@/components/ui/button"
import { userRouteCollection } from "@/routes/data/user_route"
import config from "@/config"

interface registerSubmitForm {
  user_code: string,
  email: string,
  password: string,
  confirm_password: string,
  name: string
}

export default function UserRegister() {
  const { set } = useSecureStorage();
  const {
    register,
    handleSubmit,
    setError
    } = useForm<registerSubmitForm>({
    resolver: yupResolver(registerValidationSchema)
  });
  const { handleServerErrors } = useServerValidation();

  const registerOnSuccess: useMutateCallbackType = (response: any) => {
    set("auth-token", response.token);
    set("auth-type", "user");
    localStorage.setItem("expiresAt", (new Date().getTime() + config.userExpireIn).toString());

    set('user', JSON.stringify(response.user));

    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully",
      variant: "success",
    });
    setTimeout(()=>{
      window.location.href = userRouteCollection.home;
    },1000)
  }

  const [postRegister, { isLoading }] = useMutate({ callback: registerOnSuccess, navigateBack: false });
  const onSubmit = async (data: registerSubmitForm) => {
    const response = await postRegister("users/register", data) as any;
    if (response && response.error) {
      handleServerErrors(response.error, setError);
    }
  }

  return (
    <div className="flex items-center justify-center py-12 h-full">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <img src={Logo} alt="logo" className="w-40 mx-auto" />

          <p className="text-balance text-muted-foreground">
            Create your account to get started
          </p>
        </div>
        <div className="grid gap-4">

          <div className="">
            <FormInput
              divClassName=' items-center  '
              label='Full Name' 
              defaultValue={""} 
              placeholder='Enter Full Name' 
              register={register("name")} />
          </div>

          <div className="">
            <FormInput
              divClassName=' items-center  '
              label='User Code' 
              defaultValue={""} 
              placeholder='Enter User Code' 
              register={register("user_code")} />
          </div>

          <div className="">
            <FormInput
              type="email"
              divClassName=' items-center  '
              label='Email' 
              defaultValue={""} 
              placeholder='Enter Email' 
              register={register("email")} />
          </div>

          <div className="grid gap-2">
            <FormInput
              type="password"
              divClassName=' items-center  '
              label='Password' 
              defaultValue={""} 
              placeholder='Enter Password' 
              register={register("password")} />
          </div>

          <div className="grid gap-2">
            <FormInput
              type="password"
              divClassName=' items-center  '
              label='Confirm Password' 
              defaultValue={""} 
              placeholder='Confirm Password' 
              register={register("confirm_password")} />
          </div>

          <Button type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full" disabled={isLoading}>
            Register
          </Button>

        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={userRouteCollection.login} className="underline">
            Login
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
