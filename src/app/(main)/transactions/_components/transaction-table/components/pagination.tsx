import {
  Pagination as PaginationPrimitive,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DeepReadonly } from "@/types";

type PaginationProps = DeepReadonly<{
  totalCount: number;
  pageSize: number;
  currentPage: number;
}>;

export function Pagination({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const range = 2;
    const pages: number[] = [];

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <PaginationPrimitive>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={canGoPrevious ? `?page=${currentPage - 1}` : "#"}
          />
        </PaginationItem>
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={canGoNext ? `?page=${currentPage + 1}` : "#"} />
        </PaginationItem>
      </PaginationContent>
    </PaginationPrimitive>
  );
}
