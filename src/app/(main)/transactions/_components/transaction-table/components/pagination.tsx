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

function getPageNumbers(currentPage: number, totalPages: number) {
  const range = 2;
  const firstPage = 1;

  // Initialize with first page
  const pages: (number | "ellipsis")[] = [firstPage];

  // Calculate visible page range
  const visibleRangeStart = Math.max(2, currentPage - range);
  const visibleRangeEnd = Math.min(totalPages - 1, currentPage + range);

  // Add ellipsis after first page if needed
  if (visibleRangeStart > 2) {
    pages.push("ellipsis");
  }

  // Add visible page numbers
  const visiblePages = Array.from(
    { length: visibleRangeEnd - visibleRangeStart + 1 },
    (_, i) => visibleRangeStart + i,
  );
  pages.push(...visiblePages);

  // Add ellipsis before last page if needed
  if (visibleRangeEnd < totalPages - 1) {
    pages.push("ellipsis");
  }

  // Add last page if there are multiple pages
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

export function Pagination({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <PaginationPrimitive className="flex justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={canGoPrevious ? `?page=${currentPage - 1}` : "#"}
            aria-disabled={!canGoPrevious}
            className={!canGoPrevious ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {getPageNumbers(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={canGoNext ? `?page=${currentPage + 1}` : "#"}
            aria-disabled={!canGoNext}
            className={!canGoNext ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationPrimitive>
  );
}
