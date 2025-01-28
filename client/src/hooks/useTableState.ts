import { useRecoilState } from 'recoil';
import { tableStore } from '~/store/table';

export default function useTableState(tableId: string) {
  const [columnVisibility, setColumnVisibility] = useRecoilState(
    tableStore.columnVisibility(tableId)
  );
  
  const [sorting, setSorting] = useRecoilState(
    tableStore.sorting(tableId)
  );
  
  const [columnFilters, setColumnFilters] = useRecoilState(
    tableStore.columnFilters(tableId)
  );
  
  const [rowSelection, setRowSelection] = useRecoilState(
    tableStore.rowSelection(tableId)
  );
  
  const [pageSize, setPageSize] = useRecoilState(
    tableStore.pageSize(tableId)
  );

  const resetColumnVisibility = () => {
    setColumnVisibility({});
  };

  return {
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
  };
}