import { useState } from "react";

import useQuery from "@/hooks/useQuery";
import MonthPicker from "@/components/ui/month-picker";
import { MostUploadedAdmin } from "./content-growth/most-uploaded-admin";
import { ContentUploaded } from "./content-growth/content-uploaded";
import { MostUserFavorite } from "./content-growth/most-user-favorite";
import ContentViewRank from "./content-growth/content-view-rank";

const ContentGrowth = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data, isLoading } = useQuery("/admin/dashboard/chapter-growth?date=" + date?.toISOString());
  return (
    <>
      <div className="flex justify-end mb-4">
        <MonthPicker date={date} setDate={setDate} />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {!isLoading && <MostUploadedAdmin chartData={data?.most_chapter_uploaded_admins} />}
        {!isLoading && <ContentUploaded chartData={data?.chapters_by_week} />}
        {!isLoading && <MostUserFavorite chartData={data?.content_by_favorites} />}
      </div>
      
      <div className="w-full">
        {!isLoading && <ContentViewRank chartData={data?.most_view_contents} />}
      </div>
    </>
  );
};

export default ContentGrowth;