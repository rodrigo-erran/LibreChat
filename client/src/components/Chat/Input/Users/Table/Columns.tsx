import { ArrowUpDown } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TUser,  } from 'librechat-data-provider';
import { Button, Checkbox } from '~/components';
import { useLocalize } from '~/hooks';
import { formatDate } from '~/utils';
import { createFilterableColumn } from '~/utils/createFilterableColumn';
import Avatar from '../Avatar';
 

export const columns: ColumnDef<TUser>[] = [
    
    {
        id: 'select',
        header: ({ table }) => {
          return (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
              className="flex"
            />
          );
        },

        cell: ({ row }) => {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="flex"
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
      },

      {
        id: 'avatar',
        header: 'Avatar',
        translateKey: 'com_ui_avatar',
        cell: ({ row }) => <Avatar user={row.original} />,
      },


      {
        accessorKey: 'username',
        translateKey: 'com_auth_username',
        header: ({ column }) => {
          const localize = useLocalize();
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="px-2 py-0 text-xs sm:px-2 sm:py-2 sm:text-sm"          >
               {localize('com_auth_username')}
              <ArrowUpDown className="ml-2 h-3 w-4 sm:h-4 sm:w-4" />
            </Button>
          );
        },
        cell: ({ row }) => row.original.username,
      },     
      {
        accessorKey: 'name',
        translateKey: 'com_ui_name',
        header: ({ column }) => {
          const localize = useLocalize();
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="px-2 py-0 text-xs sm:px-2 sm:py-2 sm:text-sm"          >
               {localize('com_ui_name')}
              <ArrowUpDown className="ml-2 h-3 w-4 sm:h-4 sm:w-4" />
            </Button>
          );
        },
        cell: ({ row }) => row.original.email,
      },     
 
    {
      accessorKey: 'email',
      translateKey: 'com_auth_email',
      header: ({ column }) => {
        const localize = useLocalize();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="px-2 py-0 text-xs sm:px-2 sm:py-2 sm:text-sm"          >
             {localize('com_auth_email')}
            <ArrowUpDown className="ml-2 h-3 w-4 sm:h-4 sm:w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.email,
    },     

    createFilterableColumn({
        key: 'provider',
        translateKey: 'com_ui_provider',
      }),  

      createFilterableColumn({
        key: 'role',
        translateKey: 'com_ui_role_select',
      }),        

      {
        accessorKey: 'createdAt',
        translateKey: 'com_ui_creation_date',
        header: ({ column }) => {
          const localize = useLocalize();
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="px-2 py-0 text-xs sm:px-2 sm:py-2 sm:text-sm"
            >
              {localize('com_ui_creation_date')} 
              <ArrowUpDown className="ml-2 h-3 w-4 sm:h-4 sm:w-4" />
            </Button>
          );
        },
        cell: ({ row }) => formatDate(row.original.createdAt),
      }  

];