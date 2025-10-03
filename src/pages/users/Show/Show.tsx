
import useQuery from "@/hooks/useQuery";
import HeadingSection from "./HeadingSection";
import { ChapterTable } from "./ChapterTable";
import { useParams } from "react-router-dom";
import Goback from "@/components/goback-btn";
import { lazy, Suspense, useEffect } from "react";
import useAdsRef from "@/hooks/useAdsRef";
import SEO from "@/pages/seo";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserComment } from "./UserComment";
import { Comment } from "./types";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";

const RelatedMogou = lazy(() => import('./RelatedMogou'));

// Related Mogou Loading Skeleton Component
const RelatedMogouSkeleton = () => (
    <Card className="w-full py-8 px-4">
        <CardTitle className="text-lg">
            You may also like
        </CardTitle>
        <CardContent className="grid grid-cols-1 gap-y-4 mt-8 w-full px-0">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-start gap-4">
                    <Skeleton className="w-20 h-28 rounded-md" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

const mockComments: Comment[] = [
    {
      id: 1,
      content: "This manga chapter was absolutely amazing! The art style is incredible.",
      user_id: 1,
      user_name: "Naruto Fan",
      user_profile_url: "/anime-fan.png",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      child_comments: [
        {
          id: 2,
          content: "I totally agree! The fight scenes were so well drawn.",
          user_id: 2,
          user_name: "Manga Reader",
          user_profile_url: "/manga-reader.jpg",
          created_at: new Date(Date.now() - 1800000).toISOString(),
          parent_comment_id: 1,
        },
        {
          id: 3,
          content: "The character development in this arc is top tier!",
          user_id: 3,
          user_name: "Otaku Master",
          user_profile_url: "/otaku.jpg",
          created_at: new Date(Date.now() - 900000).toISOString(),
          parent_comment_id: 1,
        },
      ],
    },
    {
      id: 4,
      content: "Can't wait for the next chapter! When does it release?",
      user_id: 4,
      user_name: "Weekly Reader",
      user_profile_url: "/person-reading.png",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      child_comments: [],
    },
  ]

const Show = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: mogous, isLoading, isFetching } = useQuery(`users/mogous/${slug}`);
    const { reAds } = useAdsRef({ adsOn: true });
    const authUser = useUserAppSelector(selectAuthUser);

    // Handle scroll and ads refresh when fetching completes
    useEffect(() => {
        if (!isFetching) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            reAds();
        }
    }, [isFetching, reAds]);

    // Update document meta when mogous data is available
    useEffect(() => {
        if (mogous?.mogou?.title) {
            document.title = `${mogous.mogou.title} - Manga Details`;
            
            const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
            if (metaDescription && mogous.mogou.description) {
                metaDescription.content = mogous.mogou.description.slice(0, 150);
            }
        }
    }, [mogous]);

    // Handle not found case
    if (!isLoading && mogous?.mogou == null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
                <h2 className="text-2xl font-semibold text-muted-foreground">Manga Not Found</h2>
                <p className="text-sm text-muted-foreground mt-2">The manga you're looking for doesn't exist.</p>
                <div className="mt-4">
                    <Goback size="sm" to="/" />
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO 
                title={`${mogous?.mogou?.title || 'Loading...'} - Manga Details`} 
                description={mogous?.mogou?.description?.slice(0, 150) || 'Manga details page'} 
                name="Manga Details" 
                type="manga" 
            />

            <div className="flex flex-col mt-8 px-4 md:px-0">
                {/* Ads anchor point */}
                <div id="popoverhe"></div>
                
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <Goback size="sm" to="/" />
                    <h1 className="flex-1 shrink-0 lg:whitespace-nowrap text-xl font-semibold tracking-tight lg:grow-0">
                        {mogous?.mogou?.title || 'Loading...'}
                    </h1>
                </div>

                {/* Manga Details Section */}
                <div className="mb-4">
                    <HeadingSection mogous={mogous} loading={isLoading} />
                </div>

                {/* Main Content Grid */}
                <div className="lg:mt-4 grid xl:grid-cols-8 gap-4">
                    {/* Chapter Table Section */}
                    <div className="xl:col-span-6  flex flex-col gap-5">
                        <ChapterTable mogous={mogous} />

                        <UserComment 
                            comments={mockComments} 
                            authUser={authUser}
                            onSubmitComment={(content,image,parentId)=>{
                                return Promise.resolve();
                            }} 
                        />
                    </div>
                    
                    {/* Related Manga Section */}
                    <div className="xl:col-span-2 flex justify-start text-start">
                        {mogous?.mogou && (
                            <Suspense fallback={<RelatedMogouSkeleton />}>
                                <RelatedMogou slug={mogous.mogou.slug} />
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Show