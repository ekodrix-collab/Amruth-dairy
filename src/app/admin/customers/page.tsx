'use client'

import { useState, useEffect } from 'react'
import {
  Users, CloudUpload, Download, Filter, UserCheck, Umbrella, CalendarX, UserPlus, Droplets,
  Search, MapPin, Calendar, Edit2, MoreHorizontal, MessageSquare, ListTodo, Edit, Send, FileText, CheckSquare, XSquare, Square,
  ChevronRight, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts'

// --- MOCK DATA ---
const overviewData = [
  { name: 'Active', value: 1089, color: '#22c55e', percent: '87%' },
  { name: 'Vacation', value: 64, color: '#f59e0b', percent: '5%' },
  { name: 'Skip Tomorrow', value: 38, color: '#f97316', percent: '3%' },
  { name: 'Pending', value: 42, color: '#8b5cf6', percent: '3%' },
  { name: 'Waitlist', value: 27, color: '#ef4444', percent: '2%' },
]

const milkQuantitiesData = [
  { name: '1.0 L / Day', value: 652 },
  { name: '1.5 L / Day', value: 342 },
  { name: '2.0 L / Day', value: 158 },
  { name: '0.5 L / Day', value: 96 },
]

export default function CustomersPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#0066cc]">
            <Users size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Customers</h1>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Manage your dairy subscribers and their delivery preferences.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><CloudUpload size={16} /> Import</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><Download size={16} /> Export</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-xl text-xs font-bold text-[#0066cc] bg-blue-50 hover:bg-blue-100 shadow-sm transition-all">
            <Filter size={16} /> Filters
            <span className="bg-[#0066cc] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] ml-1">2</span>
          </button>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="Total Customers" value="1,248" trend="+ 12.5%" subtext="vs last month" isUp icon={Users} color="blue" />
        <MetricCard title="Active Customers" value="1,089" trend="+ 8.6%" subtext="77% of total" isUp icon={UserCheck} color="green" />
        <MetricCard title="On Vacation" value="64" trend="+ 3.2%" subtext="This month" isUp icon={Umbrella} color="amber" />
        <MetricCard title="Skipped Tomorrow" value="38" trend="- 2.1%" subtext="Tomorrow" isUp={false} icon={CalendarX} color="purple" />
        <MetricCard title="New This Month" value="42" trend="+ 15.7%" subtext="New subscribers" isUp icon={UserPlus} color="emerald" />
        <MetricCard title="Total Liters / Day" value="842 L" trend="77%" subtext="of capacity" isUp icon={Droplets} color="sky" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        
        {/* LEFT COLUMN: TABLE */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Tabs & Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 p-4 gap-4">
            <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto hide-scrollbar">
              <button className="text-xs font-bold text-[#0066cc] border-b-2 border-[#0066cc] pb-4 -mb-4 whitespace-nowrap">All Customers</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 pb-4 -mb-4 whitespace-nowrap">Active</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 pb-4 -mb-4 whitespace-nowrap">Vacation</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 pb-4 -mb-4 whitespace-nowrap">Skipped</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 pb-4 -mb-4 whitespace-nowrap">Pending</button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 pb-4 -mb-4 whitespace-nowrap">Waitlist</button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search in customers..." className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-4 px-4 w-10"><Square size={14} className="text-slate-300"/></th>
                  <th className="py-4 px-2">Customer</th>
                  <th className="py-4 px-2">Phone</th>
                  <th className="py-4 px-2">Plan / Qty</th>
                  <th className="py-4 px-2">Address</th>
                  <th className="py-4 px-2">Next Delivery</th>
                  <th className="py-4 px-2">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium text-slate-700 divide-y divide-slate-50">
                <CustomerRow name="Sneha R." phone="98765 43210" qty="1.0 L / Day" address="HSR Layout, Sector 2" nextDate="Tomorrow" nextTime="6:00 AM" status="Active" avatar="S" hasWhatsapp />
                <CustomerRow name="Rohit Kumar" phone="91234 56789" qty="1.5 L / Day" address="Koramangala 4th Block" nextDate="Tomorrow" nextTime="6:00 AM" status="Active" avatar="R" hasWhatsapp />
                <CustomerRow name="Anita Sharma" phone="99876 54321" qty="1.0 L / Day" address="BTM Layout, 2nd Stage" nextDate="May 22, 2025" nextTime="Return Date" status="On Vacation" avatar="A" hasWhatsapp />
                <CustomerRow name="Vikram Joshi" phone="90123 45678" qty="2.0 L / Day" address="Jayanagar 8th Block" nextDate="Tomorrow" nextTime="6:00 AM" status="Active" avatar="V" hasWhatsapp />
                <CustomerRow name="Priya Nair" phone="95312 34567" qty="1.0 L / Day" address="Basavanagudi" nextDate="Skipped" nextTime="May 19" status="Skip Tomorrow" avatar="P" />
                <CustomerRow name="Meera Iyer" phone="93456 78901" qty="1.5 L / Day" address="JP Nagar 6th Phase" nextDate="Tomorrow" nextTime="6:00 AM" status="Active" avatar="M" hasWhatsapp />
                <CustomerRow name="Arjun Patel" phone="90567 89012" qty="1.0 L / Day" address="Banashankari 3rd Stage" nextDate="Tomorrow" nextTime="6:00 AM" status="Active" avatar="A" />
                <CustomerRow name="Karthik Rao" phone="98701 23456" qty="1.0 L / Day" address="Whitefield, ITPL Main Rd" nextDate="Setup pending" nextTime="-" status="Pending" avatar="K" hasWhatsapp />
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="border-t border-slate-100 p-4 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>Showing 1 to 8 of 1,248 customers</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400"><ChevronRight size={14} className="rotate-180"/></button>
                <button className="w-7 h-7 rounded-lg border border-[#0066cc] bg-blue-50 text-[#0066cc] flex items-center justify-center">1</button>
                <button className="w-7 h-7 rounded-lg border border-transparent hover:bg-slate-50 flex items-center justify-center">2</button>
                <button className="w-7 h-7 rounded-lg border border-transparent hover:bg-slate-50 flex items-center justify-center">3</button>
                <span>...</span>
                <button className="w-7 h-7 rounded-lg border border-transparent hover:bg-slate-50 flex items-center justify-center">156</button>
                <button className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50"><ChevronRight size={14}/></button>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <span>Rows per page</span>
                <select className="border border-slate-200 rounded-lg px-2 py-1 bg-white outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Customer Overview Donut */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-slate-800">Customer Overview</h2>
              <select className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
                <option>This Month</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[120px] h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={overviewData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" stroke="none">
                      {overviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1 ml-4">
                {overviewData.map((d, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="font-bold text-slate-700">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-800">{d.value.toLocaleString()}</span>
                      <span className="text-slate-400 w-8 text-right">({d.percent})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Milk Quantities */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-slate-800">Top Milk Quantities</h2>
              <button className="text-[10px] font-bold text-[#0066cc] bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100">View all</button>
            </div>
            <div className="space-y-4">
              {milkQuantitiesData.map((item, idx) => {
                const max = Math.max(...milkQuantitiesData.map(d => d.value))
                const width = `${(item.value / max) * 100}%`
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-700 w-16">{item.name}</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0066cc] rounded-full" style={{ width }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-800 w-8 text-right">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-3">
              <QuickActionButton icon={UserPlus} label="Add Customer" color="blue" />
              <QuickActionButton icon={MessageSquare} label="Send Message" color="emerald" />
              <QuickActionButton icon={Download} label="Export List" color="purple" />
              <QuickActionButton icon={Edit} label="Bulk Update" color="amber" />
              <QuickActionButton icon={Send} label="Send Offers" color="sky" />
              <QuickActionButton icon={FileText} label="Customer Notes" color="slate" />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

// --- SUBCOMPONENTS ---

function MetricCard({ title, value, trend, isUp, icon: Icon, color, subtext }: any) {
  const colorMap: any = {
    blue: { bg: 'bg-blue-50', text: 'text-[#0066cc]' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-500' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-500' },
  }
  const c = colorMap[color]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-8 h-8 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 mb-0.5">{title}</p>
        <p className="text-xl font-black text-slate-800">{value}</p>
        <div className="flex flex-col mt-1">
          <span className={`text-[10px] font-bold flex items-center gap-0.5 ${isUp === undefined ? 'text-slate-500' : isUp ? 'text-green-600' : 'text-red-500'}`}>
            {isUp === true && <ArrowUpRight size={10}/>}
            {isUp === false && <ArrowDownRight size={10}/>}
            {trend}
          </span>
          <span className="text-[9px] font-bold text-slate-400">{subtext}</span>
        </div>
      </div>
    </div>
  )
}

function CustomerRow({ name, phone, qty, address, nextDate, nextTime, status, avatar, hasWhatsapp }: any) {
  const statusMap: any = {
    'Active': { bg: 'bg-green-50', text: 'text-green-600' },
    'On Vacation': { bg: 'bg-amber-50', text: 'text-amber-600' },
    'Skip Tomorrow': { bg: 'bg-orange-50', text: 'text-orange-600' },
    'Pending': { bg: 'bg-blue-50', text: 'text-blue-500' },
  }
  const s = statusMap[status] || { bg: 'bg-slate-50', text: 'text-slate-500' }

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="py-3 px-4"><Square size={14} className="text-slate-200 group-hover:text-slate-400 cursor-pointer transition-colors"/></td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-600 overflow-hidden">
             {/* Note: User uploaded image showed actual photos. We use initials for mock. */}
            {avatar}
          </div>
          <span className="font-bold text-slate-800">{name}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-600">{phone}</span>
          {hasWhatsapp && <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px]">W</div>}
        </div>
      </td>
      <td className="py-3 px-2">
        <span className="text-[10px] font-bold text-[#0066cc] bg-blue-50 px-2 py-1 rounded-md border border-blue-100">{qty}</span>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1.5 text-slate-500 max-w-[160px]">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{address}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-2">
          <Calendar size={12} className={status === 'Skip Tomorrow' ? 'text-red-400' : 'text-[#0066cc]'} />
          <div className="flex flex-col leading-tight">
             <span className={`font-bold ${status === 'Skip Tomorrow' ? 'text-red-500' : 'text-slate-800'}`}>{nextDate}</span>
             <span className="text-[9px] text-slate-400">{nextTime}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.bg} ${s.text}`}>{status}</span>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 text-[#0066cc] hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100"><Edit2 size={12}/></button>
          <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200"><MoreHorizontal size={12}/></button>
        </div>
      </td>
    </tr>
  )
}

function QuickActionButton({ icon: Icon, label, color }: any) {
  const colorMap: any = {
    blue: 'bg-blue-50 text-[#0066cc] hover:bg-[#0066cc] border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 border-emerald-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-600 border-purple-100',
    amber: 'bg-amber-50 text-amber-500 hover:bg-amber-500 border-amber-100',
    sky: 'bg-sky-50 text-sky-500 hover:bg-sky-500 border-sky-100',
    slate: 'bg-slate-50 text-slate-600 hover:bg-slate-600 border-slate-200',
  }
  return (
    <button className="flex flex-col items-center justify-center p-3 text-center rounded-xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm transition-all group">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors mb-2 ${colorMap[color]} group-hover:text-white border`}>
        <Icon size={14} />
      </div>
      <span className="text-[9px] font-bold text-slate-600 leading-tight">{label}</span>
    </button>
  )
}
