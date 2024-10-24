import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

interface TablePaginationInterface {
  url: string;
  lastPage: number;
  currentPage: number;
  setCurrentPage: any;
  isFetching?: boolean;
  paging? : boolean
}

type OptionalTablePaginationInterface = Partial<TablePaginationInterface>;

export function TablePagination({
  url = "",
  lastPage = 10,
  currentPage = 1,
  setCurrentPage = () => {},
  isFetching = false,
  paging =  true
}: OptionalTablePaginationInterface) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageLinks = (paging:boolean) => {
    const pages: JSX.Element[] = [];

    if (!paging)
    {
      // current page only
      return <PaginationItem key={currentPage}>
        <PaginationLink
          href={`${
            url
          }?page=${currentPage}`}
          isActive={true}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage);
          }}
        >
          {currentPage}
        </PaginationLink>
      </PaginationItem>
    }

    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${url}?page=${i}`}
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {isFetching && i === currentPage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              i
            )}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${url}?page=${currentPage - 1}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        { getPageLinks(paging)}
        {currentPage < lastPage && (
          <PaginationItem>
            <PaginationNext
              href={`${url}?page=${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
