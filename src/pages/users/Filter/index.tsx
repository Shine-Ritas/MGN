import FilterComponent from "./filter"
import useFilterState from "@/hooks/useFilterState";
import useQuery from "@/hooks/useQuery";
import { isSubscriptionValid } from "@/utilities/util";
import MogouCard from "../home/RecentlyUploadedCard";
import { useUserAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/slices/user-global";


const initlalFilterState = {
    search: "",
    page: 1,
    limit: 10,
    mogou_type: "",
    finish_status: "",
    chapters_count_order: "",
}


export default function Page() {

    const { bunUrl } = useFilterState(initlalFilterState, ['page']);

    const authUser = useUserAppSelector(selectAuthUser);
    

    const { data, isLoading } = useQuery(
        `/users/filter?${bunUrl}`
    );

    if(isLoading)
    {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-900 md:px-24">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">Boys Love Manga</h1>
                    <span className="text-gray-400">
                        {data?.mogous?.total} Results
                    </span>
                </div>

                <FilterComponent />

                {/* Manga Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-6">
                    {data?.mogous?.data.map((mogou) => (
                            <MogouCard key={mogou.id} mogou={mogou} userCanReadAll={isSubscriptionValid(authUser?.subscription_end_date)} />
                    ))}
                </div>
            </div>
        </div>
    )
}

