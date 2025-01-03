import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TablePaginationInterface {
  url: string;
  lastPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isFetching?: boolean;
  paging?: boolean;
  hideLabel?: boolean;
}

type OptionalTablePaginationInterface = Partial<TablePaginationInterface>;

export function TablePagination({
  url = "",
  lastPage = 10,
  currentPage = 1,
  setCurrentPage = () => {},
  isFetching = false,
  paging = true,
  hideLabel = false
}: OptionalTablePaginationInterface) {
  const [inputPage, setInputPage] = useState(currentPage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setInputPage(page);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(Number(e.target.value));
  };

  const handlePageJump = () => {
    if (inputPage > 0 && inputPage <= lastPage) {
      handlePageChange(inputPage);
    } else {
      alert(`Please enter a valid page number between 1 and ${lastPage}`);
    }
  };

  const pageLinks = useMemo(() => {
    if (!paging) {
      return (
        <PaginationItem key={currentPage}>
          <PaginationLink
            href={`${url}?page=${currentPage}`}
            isActive={true}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage);
              setIsDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    const pages: JSX.Element[] = [];
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
            className="cursor-pointer"
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
  }, [paging, currentPage, lastPage, url, isFetching]);


  return (
    <Pagination>
      <PaginationContent>
        {(
          <PaginationItem>
            <PaginationPrevious
              href={`${url}?page=${currentPage - 1}`}
              onClick={(e) => {
                e.preventDefault();
                (currentPage > 1 ) && handlePageChange(currentPage - 1);
              }}
              withLabel={!hideLabel}
              className={`${(currentPage > 1) ? 'cursor-pointer' : 'cursor-not-allowed text-muted'}`}
            />
          </PaginationItem>
        )}
        {pageLinks}
        {(
          <PaginationItem>
            <PaginationNext
              href={`${url}?page=${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                currentPage < lastPage && handlePageChange(currentPage + 1);
              }}
              withLabel={!hideLabel}
              className={`${currentPage < lastPage ? 'cursor-pointer' : 'cursor-not-allowed text-muted'}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Jump to Page</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                id="pageNumber"
                max={lastPage}
                value={inputPage}
                onChange={handleInputChange}
                className="col-span-3"
              />
              <Button onClick={handlePageJump}>Jump</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Pagination>
  );
}
