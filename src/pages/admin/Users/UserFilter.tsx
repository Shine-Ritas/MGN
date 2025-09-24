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
  submitUrl: () => void;
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

export default function UserFilter({ getByKey, handleFilter ,total,submitUrl}: UserFilterProps) {
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
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 xl:hidden">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={searchInput}
            onKeyUp={(e) => e.key === "Enter" && handleFilter("search", e.currentTarget.value)}
            type="text"
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Select onValueChange={onActiveFilterChange} defaultValue={getByKey("active")}>
            <SelectTrigger aria-label="Filter User Status">
              <SelectValue placeholder="Status" />
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-hidden">
              <Button variant="outline" className="justify-between">
                {!isLoading && selectSubscription.length === 0
                  ? "Subscriptions"
                  : selectSubscription.length === 1
                  ? selectSubscription[0].title
                  : `${selectSubscription.length} selected`}
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
        </div>

        <Button  
          onClick={submitUrl}
          variant="outline" 
          className="bg-background font-semibold text-xs"
        >
          Total: {total ?? 0}
        </Button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden xl:grid xl:grid-cols-4 gap-4 items-center">
        <Select onValueChange={onActiveFilterChange} defaultValue={getByKey("active")}>
          <SelectTrigger aria-label="Filter User Status">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-hidden">
            <Button variant="outline" className="min-w-[130px] max-w-[200px] justify-between">
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

        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={searchInput}
            onKeyUp={(e) => e.key === "Enter" && handleFilter("search", e.currentTarget.value)}
            type="text"
            placeholder="Search..."
            className="pl-8"
          />
        </div>

        <Button  
          onClick={submitUrl}
          variant="outline" 
          className="bg-background font-semibold"
        >
          Total: {total ?? 0} results
        </Button>
      </div>
    </div>
  );
}
