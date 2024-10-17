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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { Category } from "./type"
import { categoryValidationSchema } from "./CategoryValidation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useMutate from "@/hooks/useMutate"
import InputError from "@/components/ui/input-error"
import useServerValidation from "@/hooks/useServerValidation"
import { useAppDispatch } from "@/redux/hooks"
import { addCategories } from "@/redux/slices/category-slice"


type CategoryModalProps = {
  initCategory?: Category;
  setInitCategory: (category: Category | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CategoryModal({ initCategory, setInitCategory, open, setOpen }: CategoryModalProps) {

  const category = initCategory;

  const dispatch = useAppDispatch();

  const isCreate = !category;

  const {
    register, handleSubmit, setError, formState: { errors }
  } = useForm<Category>({
    resolver: yupResolver(categoryValidationSchema)
  });

  const {handleServerErrors} = useServerValidation();


  const onSuccessCallback = (response: any) => {
    setInitCategory(undefined);
    setOpen(false);
    dispatch({type: "categories/add", payload: response.data});
    dispatch(addCategories(response.data));
  }


  const [postCategory, { isLoading }] = useMutate({ callback:onSuccessCallback});

  const onSubmit = async (data: Category) => {
    
    const response = isCreate ?  await postCategory("admin/categories", data) :await postCategory(`admin/categories/${category?.id}`, data,"PUT") as any;
   
    if (response && response.error) {
      handleServerErrors(response.error,setError);
    }
  }

  return ( 
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="md" className="py-4 gap-1"  >
          <PlusCircle className="h-3.5 w-3.5" />
          
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={() => {
        setInitCategory(undefined);
      }}>
        <DialogHeader>
          <DialogTitle>
            Create new Category
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Category Name
              </Label>
              <Input
                id="name"
                {...register("title")}
                defaultValue={category?.title}
                className="col-span-3"
              />
            <InputError field={errors.title} />

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
