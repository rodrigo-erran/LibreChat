import { Table } from '@tanstack/react-table';
import { Button } from '~/components/ui';

interface PaginationControlsProps {
  table: Table<any>;
  localize: (key: string, ...args: any[]) => string;
}

export default function PaginationControls({ table, localize }: PaginationControlsProps) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    const pages = [];
  
  if (totalPages <= 3) {  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
  }
  return pages;
  };

  return (
    <div className="flex items-center justify-between py-4">
        <div className="text-muted-foreground text-sm">
        {localize(
            'com_ui_page_count_description',
            Math.min(
            table.getFilteredRowModel().rows.length,
            (table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1
            ).toString(),
            Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
            ).toString(),
            table.getFilteredRowModel().rows.length.toString()
        )}
        </div>
        <div className="flex items-center rounded-full border border-border-light bg-background shadow-sm">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-l-full px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                {localize('com_ui_prev')}
            </Button>

            <div className="flex items-center border-x border-border-light px-2 gap-2"> {/* Adicionado gap-2 aqui */}
                {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                    <span
                        key={`ellipsis-${index}`}
                        className="text-sm text-gray-500 dark:text-gray-400"
                    >
                        {page}
                    </span>
                    );
                }

                return (
                    <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => table.setPageIndex((page as number) - 1)}
                    className={`rounded-full h-7 w-7 p-0 transition-colors ${
                        currentPage === page
                        ? 'bg-primary text-white hover:bg-primary/90 dark:bg-gray-700 dark:text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    >
                    {page}
                    </Button>
                );
                })}
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-r-full px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                {localize('com_ui_next')}
            </Button>
        </div>
    </div>
  );
}