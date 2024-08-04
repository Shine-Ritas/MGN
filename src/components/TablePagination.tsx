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
  setCurrentPage: (currentPage: number) => void;
  isFetching?: boolean;
}

type OptionalTablePaginationInterface = Partial<TablePaginationInterface>;

export function TablePagination({
  url = "",
  lastPage = 10,
  currentPage = 1,
  setCurrentPage = (currentPage: number) => {},
  isFetching = false,
}: OptionalTablePaginationInterface) {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageLinks = () => {
    const pages = [];
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
        {getPageLinks()}
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
