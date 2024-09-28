import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import useQuery from '@/hooks/useQuery';
import React, { useCallback, useState } from 'react'
import { RecentlyUploadedResponse } from './types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ComicType } from '@/constants/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecentlyUploadedCard from './RecentlyUploadedCard';
import { useUserAppSelector } from '@/redux/hooks';
import { selectSafeContent } from '@/redux/slices/user-global';

type handlePageChangeType = (page: number) => void;

const RecentlyUploaded = () => {

    const [page, setPage] = useState<number>(1);
    const [currentType, setCurrentType] = useState<string>("");

    const isSafeMode = useUserAppSelector(selectSafeContent) ? false : "" ;

    const { data, isLoading, isFetching } = useQuery(`users/last-uploaded?per_page=12&page=${page}&mogou_type=${currentType}&legal_only=${isSafeMode}`);


    const MemorizedData = React.useMemo(() => {
        return data;
    }, [data]) as RecentlyUploadedResponse;

    const lastPage = MemorizedData?.mogous?.last_page;

    const handlePageChange: handlePageChangeType = useCallback((page) => {
        if (page < 1) {
            return;
        }
        setPage(page)
    }, [])

    const handleCurrentTypeChange = useCallback((type: string) => {
        currentType == type ? setCurrentType("") : setCurrentType(type)
    }, [])


    return (
        <Card className='border-none  bg-background'>
            <CardTitle className='flex justify-between mb-12 flex-col md:flex-row'>
                <p className='text-2xl '>Recently Uploaded</p>
                <div className="flex gap-12 mt-4 md:mt-0">

                    <ToggleGroup
                        onValueChange={(value) => handleCurrentTypeChange(value)}
                        value={currentType}
                        rovingFocus={false}
                        variant="outline" type="single" className='gap-3'>
                        {
                            ComicType.map((type) => (
                                <ToggleGroupItem key={type.id}
                                    disabled={isFetching}
                                    className="text-xs md:text-sm md:w-20" value={type.title} aria-label="Toggle bold">
                                    {
                                        type.title
                                    }
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>

                    <div className="flex gap-4">
                        <Button
                            disabled={isFetching || page === 1}
                            onClick={() => handlePageChange(page - 1)} className="px-2 py-1 rounded-sm">
                            <ChevronLeft />
                        </Button>

                        <Button
                            disabled={isFetching || page === lastPage}
                            onClick={() => handlePageChange(page + 1)} className="px-2 py-1 rounded-sm">
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </CardTitle>
            <CardDescription className='mt-4'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        !isLoading && MemorizedData?.mogous?.data.map((mogou) => (
                            <RecentlyUploadedCard key={mogou.id} mogou={mogou} />
                        ))
                    }
                </div>

            </CardDescription>

        </Card>
    )
}

export default RecentlyUploaded