import { lazy, useState } from "react";
import { UserLoginHistoryType, UserSubscriptionHistoryType } from "./UserDetail";

type UserDetailHistoryTableType = "login" | "subscription";


const UserLoginHistroy  = lazy(() => import('./UserLoginHistroy'))
const UserSubscriptionHistory = lazy(() => import('./UserSubscriptionHistory'))

const renderTable = (
    currentTable: UserDetailHistoryTableType,
    setCurrentTable: any,
    data : UserLoginHistoryType[] | UserSubscriptionHistoryType[]
) => {
    switch (currentTable) {
        case "login":
            return <UserLoginHistroy setCurrentTable={setCurrentTable} loginHistory={data as UserLoginHistoryType[] ?? []} />
        case "subscription":
            return <UserSubscriptionHistory setCurrentTable={setCurrentTable} history={data as UserSubscriptionHistoryType[] ?? []} />
    }
}

const UserDetailHistory = ({loginHistory,subscription_histroy}) => {

    const [currentTable, setCurrentTable] = useState<UserDetailHistoryTableType>('login');

    const histroy = currentTable === 'login' ? loginHistory : subscription_histroy ;

  return (
    <div className="h-full">
        {renderTable(currentTable,setCurrentTable,histroy)}
    </div>
  )
}

export default UserDetailHistory