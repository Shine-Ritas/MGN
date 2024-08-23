import { useState } from 'react';
import FormInput from '@/components/ui/custom/FormInput';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ShinyButton from '@/components/magicui/shiny-button';
import { BotIcon } from 'lucide-react';
import { LazyMotion, domAnimation, m } from "framer-motion"
import FormSelect from '@/components/ui/custom/FormSelect';
import { socialMedias } from './constant';
import { Label } from '@/components/ui/label';



const CreateBot = () => {
    const [botData, setBotData] = useState({
        name: '',
        token_key: '',
        type: 'telegram',
        available_ids: '',
    });

    const handleInputChange = (e : any) => {
        setBotData({
            ...botData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(botData);
    };

    return (
        <LazyMotion features={domAnimation}>
            <m.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex">
                <Card
                    className='flex flex-col gap-10 justify-center items-center px-8 py-8'
                    onSubmit={handleSubmit} >

                    <CardTitle className='flex gap-3 items-center text-neon-primary'>

                        <BotIcon size={30} />
                        <h2 className='text-3xl font-semibold'>Create Bot</h2>
                    </CardTitle>

                    <CardContent className='flex flex-col gap-3 '>
                        <div>
                            <FormInput
                                divClassName='grid-cols-2 items-center  '
                                label='Bot Name' defaultValue={botData.name} placeholder='Enter bot name' register={() => { }} />
                        </div>

                        <div>
                            <FormInput
                                divClassName='grid-cols-2 items-center justify-between'
                                label='Token Key' defaultValue={botData.token_key} placeholder='Enter token key' register={() => { }} />
                        </div>

                        <div className="grid gap-4 grid-cols-2 items-center justify-between">
                            <Label htmlFor="social_media">Social Media</Label>
                            <FormSelect selectKey="social_media"
                                setValue={() => { }}
                                errors={{}}
                                defaultValue={"0"}
                                collection={socialMedias} />
                        </div>

                        <div>
                            <FormInput
                                divClassName='grid-cols-2 items-center justify-between'
                                label='To Ids' defaultValue={botData.token_key} placeholder='Enter Collection of Ids' register={() => { }} />
                        </div>


                        <div>
                            <ShinyButton
                                className='mt-4 w-full bg-neon-primary !text-white '
                                text='Create Bot'
                            />
                        </div>
                    </CardContent>

                </Card>
            </m.div>
        </LazyMotion>

    );
}

export default CreateBot