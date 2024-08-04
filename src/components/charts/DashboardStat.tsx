import { ElementType } from "react"

type DashboardStatProps = {
    Icon : ElementType,
    stat : string,
    label : string
}

const DashboardStat = ({Icon,stat,label} : DashboardStatProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
    <Icon className="text-6xl"/>
    <h1 className="font-bold">{stat}</h1>
    <p className="">{label}</p>
</div>
  )
}

export default DashboardStat