import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { SortFilterHeader } from '~/components/ui/SortFilterHeader';
import { useLocalize } from '~/hooks';

interface FilterableColumnConfig<TData> {
  key: keyof TData;
  translateKey: string;
  filterCategory?: string;
  customCell?: (value: any, row: TData) => React.ReactNode;
  additionalConfig?: Partial<ColumnDef<TData>>;
  normalizeValue?: (value: string) => string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
}

export function createFilterableColumn<TData extends Record<string, any>>({
  key,
  translateKey,
  filterCategory,
  customCell,
  additionalConfig = {},
  normalizeValue,
  sortable = true,
  filterable = true,
  visible = true,
}: FilterableColumnConfig<TData>): ColumnDef<TData> {
  return {
    accessorKey: key as string,
    id: key as string,
    translateKey,
    header: ({ column }) => {
      const localize = useLocalize();
      
      const values = Array.from(column.getFacetedUniqueValues().keys()).filter(Boolean);
      const normalizedValues = values.reduce((acc: string[], value) => {
        const normalized = normalizeValue 
          ? normalizeValue(value as string)
          : (value as string);
        
        if (!acc.includes(normalized)) {
          acc.push(normalized);
        }
        return acc;
      }, []);

      normalizedValues.sort();
      
      return (
        <SortFilterHeader
          column={column}
          title={localize(translateKey)}
          filters={{
            [filterCategory || localize(`com_ui_${String(key)}s`)]: normalizedValues
          }}
          valueMap={Object.fromEntries(normalizedValues.map(value => [value, value]))}
        />
      );
    },
    cell: customCell 
      ? ({ row }) => {
          const value = row.original[key];
          const normalizedValue = normalizeValue 
            ? normalizeValue(value as string)
            : value;
          return customCell(normalizedValue, row.original);
        }
      : ({ row }) => row.original[key],
    enableSorting: sortable,
    enableFiltering: filterable,
    enableHiding: true,
    show: visible,
    ...additionalConfig,
  };
}