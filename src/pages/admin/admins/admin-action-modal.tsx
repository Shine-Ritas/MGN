import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useMutate from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"
import { toast } from "@/components/ui/use-toast"
import {  AdminType } from "./types/type"
import { adminActionValidation, AdminActionValidationType } from "./admin-action-validation"
import FormInput from "@/components/ui/custom/FormInput"
import { Label } from "@/components/ui/label"
import FormSelect from "@/components/ui/custom/FormSelect"
import { useEffect } from "react"


type AdminActionModalProps = {
  roles : any;
  admin?: AdminType;
  setInitAdmin: (category: AdminType | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch?: () => void;
};


export function AdminActionModal({ roles ,admin, setInitAdmin, open, setOpen,refetch }: AdminActionModalProps) {


  const isCreate = !admin;

  const {
    setValue,
    reset,
    register, handleSubmit, setError, formState: { errors }
  } = useForm<AdminActionValidationType>({
    resolver: yupResolver(adminActionValidation)
  });

  useEffect(() => {
    if (admin) {
      reset({
        name: admin.name,
        email: admin.email,
        password: "", // Don't prefill password for security reasons
        role_id: admin.role_id
      });
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        role_id: undefined,
      });
    }
  }, [admin, reset]);

  const {handleServerErrors} = useServerValidation();


  const onSuccessCallback = (response: any) => {
    setInitAdmin(undefined);
    setOpen(false);
    refetch && refetch();
    toast({
      title: "Action",
      description: `${isCreate ? "New user admin was created" : "Admin wasupdated"} successfully`,
      variant: "success"
    })
  }


  const [postAdmin, { isLoading }] = useMutate({ callback:onSuccessCallback});

  const onSubmit = async (data: any) => {
   
    data['action'] = isCreate ? "create" : "update";
    data['admin_id'] = admin?.id;
    
    const response = await postAdmin("admin/admins", data) ;
   
    if (response && response.error) {
      handleServerErrors(response.error,setError);
    }
  }

  return( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="md" className="py-4 gap-1"  >
          <PlusCircle className="h-3.5 w-3.5" />
          
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={() => {
        setInitAdmin(undefined);
      }}>
        <DialogHeader>
          <DialogTitle>
            {
              isCreate ? "Create Admin" : "Update Admin"
            }
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to {isCreate ? "create" : "update"} an admin
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
                <FormInput label="Name" placeholder="Name" defaultValue={admin?.name} register={register('name')} fieldError={errors?.name} />
                <FormInput type="email" label="Email" placeholder="Email" defaultValue={admin?.email} register={register('email')} fieldError={errors?.email} />

              <FormInput
              type="password"
              divClassName=' items-center  '
              label='Password' defaultValue={""} placeholder='Enter Password' register={register("password")} />

                <div className="">
                    <Label htmlFor="role" className="">Role</Label>
                    <FormSelect
                    className="mt-2"
                            selectKey="role_id"
                            defaultValue={admin?.role_id?.toString()}
                            collection={roles}
                            setValue={setValue}
                            errors={errors}

                        />
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {
                isCreate ? "Create" : "Update"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
