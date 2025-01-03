import FormInput from '@/components/ui/custom/FormInput';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ShinyButton from '@/components/magicui/shiny-button';
import { BotIcon } from 'lucide-react';
import { LazyMotion, domAnimation, m } from "framer-motion"
import FormSelect from '@/components/ui/custom/FormSelect';
import { socialMedias } from '../constant';
import { Label } from '@/components/ui/label';
import useMutate from '@/hooks/useMutate';
import useServerValidation from '@/hooks/useServerValidation';
import { BotPublisher } from '../types';
import { botMutateValidation } from './bot-mutate-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Goback from '@/components/goback-btn';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const CreateBot = () => {

    const navigate = useNavigate();
    const onSuccessCallback = () => {
        toast({
            title: "Bot Created",
            description: "Bot has been created successfully",
            variant: "success",
        });

        navigate(-1);
    };

    const [mutate, { isLoading: isMutating }] = useMutate({ callback: onSuccessCallback });
    const { handleServerErrors } = useServerValidation();

    const {
        register,
        handleSubmit,
        setError,
        setValue: setFormValue,
        formState: { errors }
    } = useForm<BotPublisher>({
        resolver: yupResolver(botMutateValidation)
    });


    const submit = async (data: BotPublisher) => {
        const response = await mutate("admin/bot-publisher", data, "POST") as any;

        if (response && response.error) {
            handleServerErrors(response.error, setError);
        }
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="flex items-center gap-4 mt-4 mb-3">
                <Goback to={-1} />
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Add New Bot
                </h1>
            </div>

            <m.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex ">

                <form onSubmit={handleSubmit(submit)} >
                    <Card
                        className='flex flex-col gap-10 justify-center items-center px-8'>
                        <CardTitle className='flex gap-3 items-center text-neon-primary pt-4'>

                            <BotIcon size={30} />
                            <h2 className='text-3xl font-semibold'>Create Bot</h2>
                        </CardTitle>

                        <CardContent className='flex flex-col gap-3 '>
                            <div>
                                <FormInput
                                    divClassName='grid-cols-4 items-center'
                                    inputClassName='col-span-3'
                                    label='Bot Name' defaultValue={""} placeholder='Enter bot name' register={register("name")} />
                            </div>

                            <div>
                                <FormInput
                                    divClassName='grid-cols-4 items-center justify-between'
                                    inputClassName='col-span-3'

                                    label='Token Key' defaultValue={""} placeholder='Enter token key' register={register("token_key")} />
                            </div>

                            <div className="grid gap-4 grid-cols-4 items-center justify-between">
                                <Label htmlFor="social_media" className='col-span-1'>Social Media</Label>
                                <FormSelect selectKey="type"
                                    className='col-span-3'
                                    setValue={setFormValue}
                                    errors={errors?.type}
                                    defaultValue={"1"}

                                    collection={socialMedias} />
                            </div>

                            <ShinyButton
                                type='submit'
                                disabled={isMutating}
                                className={`mt-4 w-full bg-neon-primary !text-white ${isMutating ? 'opacity-50' : ''}`}
                                text={isMutating ? 'Creating...' : 'Create Bot'}
                            />
                        </CardContent>

                    </Card>
                </form>

            </m.div>
        </LazyMotion>

    );
}

export default CreateBot