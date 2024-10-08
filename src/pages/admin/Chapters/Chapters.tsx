import Goback from '@/components/goback-btn'
import { ChapterTable } from './ChapterTable'
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';
import ChapterAnalysis from './Analysic';
import { TablePagination } from '@/components/TablePagination';
import { Button } from '@/components/ui/button';

const Chapters = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { slug } = useParams<{ slug: string }>();
    const [queryParameters] = useSearchParams();
    const [search] = useState<string>(queryParameters.get('search') ?? "");

    const navigate = useNavigate();


    const { data : chapters , isLoading, isFetching } = useQuery(`admin/mogous/${slug}/chapters?page=${currentPage}&search=${search}&limit=10`);
    
    if(isLoading)
    {
        return ;
    }

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8">
            <div className="flex-1 auto-rows-max gap-4" >
                <div className="flex items-center justify-between gap-4 mb-10">

                    <div className="flex gap-4 items-center">
                        <Goback to={-1} />
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Chapters
                        </h1>
                    </div>
                    
                    <div className="">
                        <Button 
                        onClick={() => navigate(`/admin/mogou/${slug}/chapters/create`)}
                        size="sm" variant={"neon"} className="h-10 gap-1">
                            Add New Chapter
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-0 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-3">
                            <ChapterTable chapterCollection={chapters?.mogou_chapters?.data} />

                            {
                                (chapters && chapters.mogou_chapters.total > 9) && 
                                <TablePagination url={chapters.mogou_chapters.path} 
                                lastPage={chapters.mogou_chapters.last_page}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                isFetching={isFetching} />
                            }
                        </div>
                         <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            {
                                slug && <ChapterAnalysis slug={slug!} />
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chapters