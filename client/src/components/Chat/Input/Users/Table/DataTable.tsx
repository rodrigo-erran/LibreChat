import { ListFilter } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,   
  getFacetedUniqueValues,  
  useReactTable,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  PaginationControls
} from '~/components/ui';
import useLocalize from '~/hooks/useLocalize';
import { useMediaQuery, useTableState } from '~/hooks';
import { cn } from '~/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableId: string;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  tableId,
}: DataTableProps<TData, TValue>) {
  const localize = useLocalize();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const {
    states: {
      columnVisibility,
      sorting,
      columnFilters,
      rowSelection,
      pageSize,
    },
    actions: {
      setColumnVisibility,
      setSorting,
      setColumnFilters,
      setRowSelection,
      setPageSize,
      resetColumnVisibility,
    },
  } = useTableState(tableId);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize,
        pageIndex: 0, // Você pode adicionar pageIndex ao estado se necessário
      },
    },
  });

  return (
    <div className="grid h-[80vh] grid-rows-[auto_1fr_auto] gap-4">
      <div className="flex flex-wrap items-center gap-2 py-2 sm:gap-4 sm:py-4">
        <Input
          placeholder={localize('com_users_filter')}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="flex-1 text-sm"
        />

        <select
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            table.setPageSize(newSize);
          }}
          className="h-8 rounded-md border border-border-light bg-transparent px-2 py-1 text-sm"          
        >
          {[5, 10, 20, 30, 50, 100].map(size => (
            <option key={size} value={size}>
        {localize(
            'com_ui_show_max_rows',size.toString()
        )}
 
            </option>
          ))}
        </select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={cn('min-w-[40px]', isSmallScreen && 'px-2 py-1')}>
              <ListFilter className="size-3.5 sm:size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="max-h-[300px] overflow-y-auto dark:border-gray-700 dark:bg-gray-850"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="cursor-pointer text-sm capitalize dark:text-white dark:hover:bg-gray-800"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                >
                  {localize(column.columnDef.translateKey)}
                </DropdownMenuCheckboxItem>
              ))}
            <DropdownMenuCheckboxItem
              className="cursor-pointer text-sm capitalize dark:text-white dark:hover:bg-gray-800"
              onClick={resetColumnVisibility}
            >
              {localize('com_ui_reset_columns')}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full overflow-auto rounded-md border border-black/10 dark:border-white/10">
        <Table className="w-full min-w-[300px] border-separate border-spacing-0">
          <TableHeader className="sticky top-0 z-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border-light">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap bg-surface-secondary px-2 py-2 text-left text-sm font-medium text-text-secondary sm:px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b border-border-light transition-colors hover:bg-surface-secondary [tr:last-child_&]:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="align-start px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm [tr[data-disabled=true]_&]:opacity-50"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {localize('com_users_no_results')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls table={table} localize={localize} />
    </div>
  );
}