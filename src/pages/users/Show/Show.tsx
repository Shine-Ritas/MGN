
import useQuery from "@/hooks/useQuery";
import HeadingSection from "./HeadingSection";
import { ChapterTable } from "./ChapterTable";
import { useParams } from "react-router-dom";
import Goback from "@/components/goback-btn";
import { lazy, Suspense, useEffect } from "react";
import useAdsRef from "@/hooks/useAdsRef";
import SEO from "@/pages/seo";

const RelatedMogou = lazy(() => import('./RelatedMogou'));

const Show = () => {

    const { slug } = useParams<{ slug: string }>();

    const { data: mogous, isLoading, isFetching } = useQuery(`users/mogous/${slug}`);

    const { reAds } = useAdsRef({ adsOn: true });

    useEffect(() => {
        if (!isFetching) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            reAds();
        }

    }, [isFetching, reAds])

    useEffect(() => {
        document.title = `${mogous?.mogou?.title} - Manga Details`;
        const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (metaDescription) {
            metaDescription.content = mogous?.mogou?.description.slice(0, 150);
        }
    }, [mogous]);


    if (!isLoading && mogous?.mogou == null) {
        return <div>
            notFound
        </div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
       <>
        <SEO title={`${mogous?.mogou?.title} - Manga Details`} description={mogous?.mogou?.description.slice(0, 150)} name="Manga Details" type="manga" />

        <div className=" px-6 md:px-24 flex flex-col">
            <div id="popoverhe"></div>
            <div className="flex items-center gap-4 mb-10 ">
                <Goback
                    size={"sm"}
                    to={'/'} />
                <h1 className="flex-1 shrink-0 lg:whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {mogous?.mogou?.title}
                </h1>
            </div>

            <div className="">
                <HeadingSection mogou={mogous?.mogou} isFavorite={mogous?.is_favorite} />
            </div>

            <div className="mt-12 grid md:grid-cols-8 gap-4 ">
                <div className="md:col-span-6 ">
                    <ChapterTable mogous={mogous}   />
                </div>
                <div className="md:col-span-2 flex justify-start text-start">
                    {
                        mogous?.mogou && <Suspense fallback={<div>Loading...</div>}>
                            <RelatedMogou slug={mogous?.mogou.slug} />
                        </Suspense>
                    }

                </div>
            </div>

        </div></>
    )
}

export default Show