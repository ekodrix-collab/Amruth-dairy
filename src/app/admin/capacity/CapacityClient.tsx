'use client'

import { Droplets } from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { DataTable, ColumnDef } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'

interface CapacityLog {
  id: string;
  date: string;
  total_litres: number;
  booked_litres: number;
  is_full: boolean;
}

export function CapacityClient({ data }: { data: CapacityLog[] }) {
  const columns: ColumnDef<CapacityLog>[] = [
    { header: 'Date', cell: (row) => new Date(row.date).toLocaleDateString() },
    { header: 'Total Capacity', align: 'right', cell: (row) => `${row.total_litres} L` },
    { header: 'Booked', align: 'right', cell: (row) => `${row.booked_litres.toFixed(2)} L` },
    { header: 'Available', align: 'right', cell: (row) => `${(row.total_litres - row.booked_litres).toFixed(2)} L` },
    { header: 'Status', align: 'center', cell: (row) => <StatusBadge status={!row.is_full ? 'Accepting' : 'Full'} type={!row.is_full ? 'success' : 'danger'} /> },
  ]

  return (
    <div>
      <AdminHeader title="Production & Capacity" description="Log daily milk yield and track capacity limits." icon={Droplets} actionLabel="Log Yield" />
      <DataTable data={data} columns={columns} />
    </div>
  )
}
