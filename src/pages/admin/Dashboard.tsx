
import { CardsStats } from "@/components/charts/Stats";
import Frame from "./Home/Frame";

const Dashboard = () => {

  return (
    <div className="flex flex-col gap-4">
      <Frame />
      <CardsStats />
    </div>
  )
}

export default Dashboard