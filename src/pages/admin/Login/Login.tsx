import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import Logo from "@/assets/imgs/logo.png"
import { loginValidationSchema } from "./LoginValidation"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import InputError from "@/components/ui/input-error"
import useMutate, { useMutateCallbackType } from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"
import { useAppDispatch } from "@/redux/hooks"
import { setAdmin } from "@/redux/slices/admin-auth-slice"
import { adminRouteCollection } from "@/routes/data/admin_route"
import useSecureStorage from "@/hooks/useSecureStorage"
import config from "@/config"
interface loginSubmitForm {
    email: string,
    password: string
}


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { set } = useSecureStorage();
      const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
      } = useForm<loginSubmitForm>({
        resolver: yupResolver(loginValidationSchema)
      });
      const {handleServerErrors} = useServerValidation();


      const loginOnSuccess : useMutateCallbackType = (response : any) => {
        set("auth-token", response.token);
        set("auth-type", "admin");
        set("auth-role", response.role);
        localStorage.setItem("expiresAt", (new Date().getTime() + config.adminExpireIn).toString());

        dispatch(setAdmin(response.user));

        toast({
          title: "Login Successful",
          description: "You have been logged in successfully",
          variant: "success",
        });
        navigate(adminRouteCollection.dashboard);
      }

      const [postLogin, { isLoading }] = useMutate({ callback: loginOnSuccess, navigateBack: false});
      const onSubmit =  async (data: loginSubmitForm) => {
        const response =  await postLogin("admin/login", data) as any;
        if (response && response.error) {
          handleServerErrors(response.error,setError);
         }
        }


    return (
        <div className="w-full h-screen flex justify-center items-center">

            <div className="">
                <img src={Logo} alt="logo" className="w-40 mx-auto" />

            <Card className="mx-auto max-w-sm">
                
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="example.com" type="email"
                            {...register("email")} />
                            <InputError field={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"  type="password" 
                            {...register("password")}
                            />
                            <InputError field={errors.password} />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            Login
                        </Button>
                    </div>
                </form>
                </CardContent>
            </Card>
            </div>

        <Toaster  />

        </div>
    )
}

export default Login