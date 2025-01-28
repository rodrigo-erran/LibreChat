import { atomFamily } from 'recoil';
import type { SortingState, VisibilityState, ColumnFiltersState } from '@tanstack/react-table';


interface TableState {
  columnVisibility: VisibilityState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  rowSelection: Record<string, boolean>;
  pageSize: number;
}


const defaultState: TableState = {
  columnVisibility: {},
  sorting: [],
  columnFilters: [],
  rowSelection: {},
  pageSize: 10,
};


export const tableStore = {
  columnVisibility: atomFamily({
    key: 'tableColumnVisibility',
    default: defaultState.columnVisibility,
    effects: [
      ({ setSelf, node }) => {
        const savedValue = localStorage.getItem(`table_visibility_${node.key}`);
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue));
        }
      },
    ],
  }),

  sorting: atomFamily({
    key: 'tableSorting',
    default: defaultState.sorting,
  }),

  columnFilters: atomFamily({
    key: 'tableColumnFilters',
    default: defaultState.columnFilters,
  }),

  rowSelection: atomFamily({
    key: 'tableRowSelection',
    default: defaultState.rowSelection,
  }),

  pageSize: atomFamily({
    key: 'tablePageSize',
    default: 10,  
    effects: [
      ({ setSelf, node }) => {
        const savedValue = localStorage.getItem(`table_pageSize_${node.key}`);
        if (savedValue != null) {
          setSelf(Number(savedValue));
        }
      },
      ({ onSet, node }) => {
        onSet((newValue) => {
          localStorage.setItem(`table_pageSize_${node.key}`, String(newValue));
        });
      },
    ],
  }),
};