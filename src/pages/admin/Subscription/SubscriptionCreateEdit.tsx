import { useEffect } from 'react';
import Goback from "@/components/goback-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/ui/custom/FormInput";
import { subscriptionValidationSchema } from "./SubscriptionValidation";
import { SubscriptionType } from "./type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutate from "@/hooks/useMutate";
import useServerValidation from "@/hooks/useServerValidation";
import { useNavigate, useParams } from "react-router-dom";
import { adminRouteCollection } from "@/routes/data/admin_route";
import useQuery from "@/hooks/useQuery";
import { AlertCircle } from 'lucide-react';

interface SubscriptionCreateEditProps {
  isEdit?: boolean;
}

const SubscriptionCreateEdit = ({ isEdit = false }: SubscriptionCreateEditProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data:subscription , isLoading } = useQuery(isEdit ? `admin/subscriptions/${id}` : undefined);

  useEffect(() => {

    if (subscription && isEdit) {
      reset(subscription);
    }

    if(isEdit && !isLoading && !subscription)
    {
        navigate(adminRouteCollection.subscriptions)
    }

    return () =>{
      isEdit = false;
    }
  }, [isEdit]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<SubscriptionType>({
    resolver: yupResolver(subscriptionValidationSchema)
  });

  const onSuccessCallback = () => {
    navigate(adminRouteCollection.subscriptions);
  };

  const [mutate, { isLoading: isMutating }] = useMutate({ callback: onSuccessCallback });
  const { handleServerErrors } = useServerValidation();

  const onSubscriptionSubmit = async (data: SubscriptionType) => {
    const response = !isEdit 
      ? await mutate("admin/subscriptions", data)
      : await mutate(`admin/subscriptions/${id}`, data, "PUT") as any;

    if (response && response.error) {
      handleServerErrors(response.error, setError);
    }
  };

  if (!subscription && isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex-1 items-start gap-4 pt-4 md:gap-8">
      <form onSubmit={handleSubmit(onSubscriptionSubmit)}>
        <div className="mx-auto flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4 mb-10">
            <Goback to={-1} />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {!isEdit ? "Create Subscription" : "Edit Subscription"}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Goback to={adminRouteCollection.subscriptions} label="Discard" />
              <Button type="submit" size="sm" disabled={isMutating}>Save</Button>
            </div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{!isEdit ? "Create Subscription" : "Edit Subscription"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
                      <FormInput 
                        label="Subscription Name" 
                        placeholder="Enter Subscription Name" 
                        defaultValue={subscription?.subscription?.title} 
                        fieldError={errors?.title} 
                        register={register("title")} 
                      />
                      <FormInput 
                        label="Subscription Price" 
                        placeholder="" 
                        type="number" 
                        defaultValue={subscription?.subscription?.price} 
                        fieldError={errors?.price} 
                        register={register("price")} 
                      />
                      <div>
                        <FormInput 
                          label="Subscription Duration" 
                          placeholder="Duration" 
                          type="number" 
                          defaultValue={subscription?.subscription?.duration} 
                          fieldError={errors?.duration} 
                          register={register("duration")} 
                        />
                        <p className="mt-2 text-sm text-muted-foreground flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                           User has [Number] days left on their subscription. Send renewal reminders to ensure continuity
                        </p>
                      </div>
                      <div>
                        <FormInput 
                          label="Max Subscription Limit" 
                          placeholder="Maximum Users" 
                          type="number" 
                          defaultValue={subscription?.subscription?.max} 
                          fieldError={errors?.max} 
                          register={register("max")} 
                        />
                        <p className="mt-2 text-sm text-muted-foreground flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Maximum size of subscription package. Enter 0 for unlimited.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-end gap-2 md:hidden mt-4">
            <Goback to={adminRouteCollection.subscriptions} label="Discard" />
            <Button type="submit" size="sm" disabled={isMutating}>Save</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SubscriptionCreateEdit;
