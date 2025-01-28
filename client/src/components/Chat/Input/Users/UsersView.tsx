import { OGDialog, OGDialogContent, OGDialogHeader, OGDialogTitle } from '~/components/ui';
import { useGetUsers } from '~/data-provider';
import type { TUsers } from 'librechat-data-provider';
import { DataTable, columns } from './Table'; 
import { useLocalize } from '~/hooks';


export default function UsersView({ open, onOpenChange }) {
  const localize = useLocalize();
  const { data, isLoading, error } = useGetUsers<TUsers>();
  const users = data?.users ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <OGDialog open={open} onOpenChange={onOpenChange}>
      <OGDialogContent
        title={localize('com_nav_users')}
        className="w-11/12 bg-background text-text-primary shadow-2xl"
      >
        <OGDialogHeader>
          <OGDialogTitle>{localize('com_nav_users')}</OGDialogTitle>
        </OGDialogHeader>
        <DataTable columns={columns} data={users} tableId="users-table"  />
      </OGDialogContent>
    </OGDialog>
  );
}