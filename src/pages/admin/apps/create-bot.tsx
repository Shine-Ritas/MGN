import FormInput from '@/components/ui/custom/FormInput';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ShinyButton from '@/components/magicui/shiny-button';
import { BotIcon } from 'lucide-react';
import { LazyMotion, domAnimation, m } from "framer-motion"
import FormSelect from '@/components/ui/custom/FormSelect';
import { socialMedias } from './constant';
import { Label } from '@/components/ui/label';
import useMutate from '@/hooks/useMutate';
import useServerValidation from '@/hooks/useServerValidation';
import { BotPublisher } from './types';
import { botMutateValidation } from './BotMutateValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const CreateBot = () => {

    const onSuccessCallback = () => {
        console.log('created')
    };

    const [mutate, { isLoading: isMutating }] = useMutate({ callback: onSuccessCallback });
    const { handleServerErrors } = useServerValidation();

    const {
        register,
        handleSubmit,
        setError,
        setValue : setFormValue,
        formState: { errors }
    } = useForm<BotPublisher>({
        resolver: yupResolver(botMutateValidation)
    });


    const submit = async (data : BotPublisher) => {
        console.log(data);
        console.log(errors);
        const response =  await mutate("admin/bot-publisher", data,"POST") as any;

        if (response && response.error) {
            handleServerErrors(response.error, setError);
        }
    };

    return (
        <LazyMotion features={domAnimation}>
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
                                    divClassName='grid-cols-2 items-center  '
                                    label='Bot Name' defaultValue={""} placeholder='Enter bot name' register={register("name")} />
                            </div>

                            <div>
                                <FormInput
                                    divClassName='grid-cols-2 items-center justify-between'
                                    label='Token Key' defaultValue={""} placeholder='Enter token key' register={register("token_key")} />
                            </div>

                            <div className="grid gap-4 grid-cols-2 items-center justify-between">
                                <Label htmlFor="social_media">Social Media</Label>
                                <FormSelect selectKey="type"
                                    setValue={setFormValue}
                                    errors={errors?.type}
                                    defaultValue={"0"}
                                    
                                    collection={socialMedias} />
                            </div>

                            <div>
                                <FormInput
                                    divClassName='grid-cols-2 items-center justify-between'
                                    label='To Ids' defaultValue={""} placeholder='Enter Collection of Ids' register={register("available_ids")} />
                            </div>


                            <button 
                            disabled={isMutating}        
                            type='submit'>
                                <ShinyButton
                                    type='submit'
                                    className='mt-4 w-full bg-neon-primary !text-white '
                                    text='Create Bot'
                                />
                            </button>
                        </CardContent>

                    </Card>
                </form>

            </m.div>
        </LazyMotion>

    );
}

export default CreateBot