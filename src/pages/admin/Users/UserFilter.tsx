import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQuery from "@/hooks/useQuery";
import { SubscriptionType } from "../Subscription/type";

type UserFilterProps = {
  getByKey: (key: string) => any;
  handleFilter: (key: string, value: any) => void;
  total?: number;
};

type UserActiveStatus = {
  id: number;
  title: string;
};

const userActiveStatus: UserActiveStatus[] = [
  { id: 1, title: "Active" },
  { id: 0, title: "Inactive" },
];

export default function UserFilter({ getByKey, handleFilter ,total}: UserFilterProps) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [selectSubscription, setSelectSubscription] = useState<SubscriptionType[]>([]);

  const handleSubscriptionChange = (subscription: SubscriptionType) => {
    const isSelected = selectSubscription.some((p) => p.id === subscription.id);
    const updatedSubscription = isSelected
      ? selectSubscription.filter((p) => p.id !== subscription.id)
      : [...selectSubscription, subscription];

    setSelectSubscription(updatedSubscription);
    const subscriptionIds = updatedSubscription.map((p) => p.id);
    handleFilter("subscriptions", subscriptionIds);

  };

  const onActiveFilterChange = (value: string) => {
    const statusId = parseInt(value, 10);
    handleFilter("active", statusId);
  };

  const { data: subs, isLoading } = useQuery("admin/subscriptions");

  useEffect(() => {
    if (getByKey("search")) {
      searchInput.current!.value = getByKey("search");
    }

    if ( !isLoading && getByKey("subscriptions")) {
      const subscriptionIds = getByKey("subscriptions");
      const selectedSubscriptions = subs?.subscriptions?.data?.filter((p: SubscriptionType) =>
        subscriptionIds.includes(p.id)
      );
      setSelectSubscription(selectedSubscriptions);
    }

  }, [getByKey, isLoading, subs?.subscriptions?.data]);

  return (
    <div className="grid lg:grid-cols-4 gap-4 items-center lg:justify-end ps-1">
      {/* Active Status Filter */}
      <Select onValueChange={onActiveFilterChange} defaultValue={getByKey("active")}>
        <SelectTrigger>
          <SelectValue placeholder="Filter User Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            {userActiveStatus.map((type) => (
              <SelectItem value={String(type.id)} key={type.id}>
                {type.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Subscriptions Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-hidden">
          <Button variant="outline" className="min-w-[130px] max-w-[200px]  justify-between">
            {!isLoading && selectSubscription.length === 0
              ? "Subscriptions"
              : selectSubscription.map((progress) => progress.title).join(" , ")}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]">
          {subs?.subscriptions?.data?.map((subscription: SubscriptionType) => (
            <DropdownMenuCheckboxItem
              key={subscription.id}
              checked={selectSubscription.some((p) => p.id === subscription.id)}
              onCheckedChange={() => handleSubscriptionChange(subscription)}
            >
              {subscription.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchInput}
          onKeyUp={(e) => e.key === "Enter" && handleFilter("search", e.currentTarget.value)}
          type="text"
          placeholder="Search User ..."
          className="pl-8 lg:w-[200px]"
        />
      </div>

      <Button  variant="outline" className="bg-background font-semibold text-xs text-muted-foreground w-fit">
        Total : {total ?? 0} results
      </Button>
    </div>
  );
}
