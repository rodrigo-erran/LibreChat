import { Column } from '@tanstack/react-table';
import { ListFilter, FilterX } from 'lucide-react';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import { Button } from './Button';
import useLocalize from '~/hooks/useLocalize';
import { cn } from '~/utils';

interface SortFilterHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  column: Column<TData, TValue>;
  filters?: Record<string, string[] | number[]>;
  valueMap?: Record<string, string>;
}

export function SortFilterHeader<TData, TValue>({
  column,
  title,
  className = '',
  filters,
  valueMap,
}: SortFilterHeaderProps<TData, TValue>) {
  const localize = useLocalize();
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
  variant="ghost"
  className="px-2 py-0 text-xs hover:bg-surface-hover data-[state=open]:bg-surface-hover sm:px-2 sm:py-2 sm:text-sm"
>
  <span className={cn(
    column.getIsFiltered() && "font-bold" // Texto em negrito quando filtrado
  )}>
    {title}
  </span>
  <ListFilter 
    className={cn(
      "icon-sm ml-2",
      column.getIsFiltered() ? "text-red-500" : "opacity-30" // Ícone vermelho quando filtrado
    )}
  />
  {(() => {
    const sortState = column.getIsSorted();
    if (sortState === 'desc') {
      return <ArrowDownIcon className="icon-sm ml-2" />;
    }
    if (sortState === 'asc') {
      return <ArrowUpIcon className="icon-sm ml-2" />;
    }
    return <CaretSortIcon className="icon-sm ml-2" />;
  })()}
</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="z-[1001] dark:border-gray-700 dark:bg-gray-850"
        >
          {/* Opções de Ordenação */}
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer text-text-primary"
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {localize('com_ui_ascending')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer text-text-primary"
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {localize('com_ui_descending')}
          </DropdownMenuItem>

          {/* Mostrar Todos (se houver filtros) */}
          {filters && (
            <DropdownMenuItem
              className={
                column.getIsFiltered()
                  ? 'cursor-pointer dark:text-white dark:hover:bg-gray-800'
                  : 'pointer-events-none opacity-30'
              }
              onClick={() => {
                column.setFilterValue(undefined);
              }}
            >
              <FilterX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              {localize('com_ui_show_all')}
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className="dark:bg-gray-500" />

          {/* Lista de Filtros com scroll */}
          <div
            className={cn(
              "max-h-[200px] overflow-y-auto",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-thumb]:bg-gray-300",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
            )}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(156 163 175) transparent'
            }}
          >
            {filters &&
              Object.entries(filters).map(([key, values]) =>
                values.map((value: string | number) => {
                  const localizedValue = localize(valueMap?.[value] ?? '');
                  const filterValue = localizedValue.length ? localizedValue : valueMap?.[value];
                  if (!filterValue) {
                    return null;
                  }
                  return (
                    <DropdownMenuItem
                      className="cursor-pointer text-text-primary"
                      key={`${key}-${value}`}
                      onClick={() => {
                        column.setFilterValue(value);
                      }}
                    >
                      <ListFilter className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                      {filterValue}
                    </DropdownMenuItem>
                  );
                }),
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}