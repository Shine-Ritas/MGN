
import { Link } from "react-router-dom"
import Logo from "@/assets/imgs/logo.png"
import FormInput from "@/components/ui/custom/FormInput"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { loginValidationSchema } from "./LoginValidation"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import useMutate, { useMutateCallbackType } from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"
import useSecureStorage from "@/hooks/useSecureStorage"
import { Button } from "@/components/ui/button"
import { userRouteCollection } from "@/routes/data/user_route"
import config from "@/config"
interface loginSubmitForm {
  user_code: string,
  password: string
}


export default function UserLogin() {
  const { set } = useSecureStorage();
  const {
    register,
    handleSubmit,
    setError
    } = useForm<loginSubmitForm>({
    resolver: yupResolver(loginValidationSchema)
  });
  const { handleServerErrors } = useServerValidation();


  const loginOnSuccess: useMutateCallbackType = (response: any) => {
    set("auth-token", response.token);
    set("auth-type", "user");
    localStorage.setItem("expiresAt", (new Date().getTime() + config.userExpireIn).toString());

    set('user', JSON.stringify(response.user));

    toast({
      title: "Login Successful",
      description: "Login Successful",
      variant: "success",
    });
    setTimeout(()=>{
      window.location.href = userRouteCollection.home;
    },1000)
  }

  const [postLogin, { isLoading }] = useMutate({ callback: loginOnSuccess, navigateBack: false });
  const onSubmit = async (data: loginSubmitForm) => {
    const response = await postLogin("users/login", data) as any;
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
            Enter your email and password to login
          </p>
        </div>
        <div className="grid gap-4">

          <div className="">
            <FormInput
              divClassName=' items-center  '
              label='User Code' defaultValue={""} placeholder='Enter User Code' register={register("user_code")} />
          </div>
          <div className="grid gap-2">
            <FormInput
              type="password"
              divClassName=' items-center  '
              label='Password' defaultValue={""} placeholder='Enter Password' register={register("password")} />
          </div>
          <Button type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full" disabled={isLoading}>
            Login
          </Button>

        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={userRouteCollection.contact_us} className="underline">
            Contact Admin
          </Link>
        </div>
      </div>
      <Toaster />

    </div>
  )
}
