'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import {
  Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronRight, 
  Map, ShieldCheck, Database, Droplets, Users, 
  IndianRupee, CreditCard, Umbrella, PlusCircle, UserPlus, 
  FileText, Package, Send, Settings, AlertCircle, UserCircle, Truck
} from 'lucide-react'

// --- MOCK DATA ---
const deliveryData = [
  { time: '5 AM', delivered: 100 },
  { time: '7 AM', delivered: 250 },
  { time: '9 AM', delivered: 400 },
  { time: '11 AM', delivered: 542 },
  { time: '1 PM', delivered: 650 },
  { time: '3 PM', delivered: 842 },
]

const revenueData = [
  { date: 'May 1', revenue: 120000 },
  { date: 'May 5', revenue: 150000 },
  { date: 'May 11', revenue: 190000 },
  { date: 'May 16', revenue: 245680 },
]

const sparklineData1 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 45 }]
const sparklineData2 = [{ v: 45 }, { v: 35 }, { v: 20 }, { v: 25 }, { v: 12 }, { v: 15 }, { v: 10 }]

export default function AdminDashboardHome() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0f2e5c] flex items-center gap-2">
            Good Morning, <br className="lg:hidden" />
            <span className="text-4xl leading-tight">Admin <span className="animate-wave inline-block origin-bottom-right">👋</span></span>
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Everything happening across today's dairy operations.</p>
        </div>
        
        {/* Status Pills */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white border border-green-100 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><ShieldCheck size={16}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Farm Health</p>
              <p className="text-xs font-bold text-green-600">Excellent</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Activity size={16}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Uptime</p>
              <p className="text-xs font-bold text-blue-600">99.9%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-green-100 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={16}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Server Status</p>
              <p className="text-xs font-bold text-green-600">Healthy</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-green-100 rounded-xl px-3 py-2 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><Database size={16}/></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Database</p>
              <p className="text-xs font-bold text-green-600">Connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <MetricCard title="Today's Deliveries" value="236" trend="+ 12.5%" isUp icon={Map} color="blue" sparkData={sparklineData1} />
        <MetricCard title="Milk Quantity (L)" value="842" trend="+ 8.2%" isUp icon={Droplets} color="sky" sparkData={sparklineData1} />
        <MetricCard title="Active Subscribers" value="1,248" trend="+ 9.4%" isUp icon={Users} color="blue" sparkData={sparklineData1} />
        <MetricCard title="Revenue This Month" value="₹2,45,680" trend="+ 15.3%" isUp icon={IndianRupee} color="sky" sparkData={sparklineData1} />
        <MetricCard title="Pending Payments" value="18" trend="- 3.1%" isUp={false} icon={CreditCard} color="red" sparkData={sparklineData2} />
        <MetricCard title="Vacation Requests" value="14" trend="+ 7.7%" isUp icon={Umbrella} color="amber" sparkData={sparklineData1} />
        <MetricCard title="Extra Orders" value="32" trend="+ 18.6%" isUp icon={PlusCircle} color="purple" sparkData={sparklineData1} />
        <MetricCard title="Waitlisted Customers" value="27" trend="- 5.2%" isUp={false} icon={UserPlus} color="red" sparkData={sparklineData2} />
      </div>

      {/* MAIN GRID - ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Delivery Overview Area Chart */}
        <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-slate-800">Today's Delivery Overview</h2>
            <select className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
              <option>Today</option>
            </select>
          </div>
          <div className="flex gap-8 mb-6">
            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Delivered</p><p className="text-lg font-black text-slate-800">542 L</p></div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Remaining</p><p className="text-lg font-black text-slate-800">300 L</p></div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Total Stops</p><p className="text-lg font-black text-slate-800">236</p></div>
            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Est. Completion</p><p className="text-lg font-black text-slate-800">11:45 AM</p></div>
          </div>
          <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={deliveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="delivered" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorDelivered)" dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Morning Route Progress</span>
              <span className="text-[10px] font-bold text-slate-800">66% Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 flex-1 bg-blue-500 rounded-l-full" />
              <div className="h-1.5 flex-1 bg-blue-500" />
              <div className="h-1.5 flex-1 bg-blue-500 relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-sm z-10"><Truck size={8} className="text-blue-500"/></div>
              </div>
              <div className="h-1.5 flex-1 bg-slate-100" />
              <div className="h-1.5 flex-1 bg-slate-100 rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Milk Capacity Donut */}
        <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col items-center justify-center relative">
          <h2 className="text-sm font-bold text-slate-800 absolute top-5 left-5">Milk Capacity</h2>
          <div className="w-[180px] h-[180px] mt-6 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{value: 84}, {value: 16}]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                  <Cell fill="#0066cc" />
                  <Cell fill="#f1f5f9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800">84%</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Capacity Used</span>
            </div>
          </div>
          <div className="mt-4 w-full text-center">
            <p className="text-xl font-black text-slate-800">84 / <span className="text-slate-400 text-lg">100 Liters</span></p>
          </div>
          <div className="mt-4 w-full bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm"><Droplets size={16}/></div>
             <div>
               <p className="text-[10px] font-bold text-slate-500 uppercase">Remaining Capacity</p>
               <p className="text-sm font-black text-slate-800">16 Liters</p>
             </div>
          </div>
        </div>

        {/* Customer Activity Feed */}
        <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-slate-800">Customer Activity</h2>
            <button className="text-[10px] font-bold text-[#0066cc] bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100">View All</button>
          </div>
          <div className="flex-1 space-y-6">
            <ActivityItem name="Sneha R." action="Vacation enabled" time="8:45 AM" type="vacation" />
            <ActivityItem name="Rohit Kumar" action="Skip tomorrow" time="8:15 AM" type="skip" />
            <ActivityItem name="Anita Sharma" action="New subscription" time="7:50 AM" type="new" />
            <ActivityItem name="Vikram Joshi" action="Payment completed" time="7:30 AM" type="payment" />
          </div>
        </div>
      </div>

      {/* MAIN GRID - ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        
        {/* Revenue Analytics Line Chart */}
        <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-800">Revenue Analytics</h2>
            <select className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <p className="text-2xl font-black text-slate-800">₹2,45,680</p>
            <span className="text-[10px] font-bold text-green-600 flex items-center"><ArrowUpRight size={12}/> 15.3%</span>
          </div>
          <div className="flex-1 min-h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(val) => `${val/1000}k`} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#0066cc" strokeWidth={3} dot={{ r: 4, fill: '#0066cc', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <QuickAction icon={FileText} label="Delivery Sheet" />
            <QuickAction icon={UserPlus} label="Add Customer" />
            <QuickAction icon={Settings} label="Capacity" />
            <QuickAction icon={Send} label="Notify" />
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-slate-800">Notifications</h2>
            <button className="text-[10px] font-bold text-[#0066cc] bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100">All</button>
          </div>
          <div className="space-y-4 flex-1">
            <NotificationItem icon={CreditCard} color="green" text="Payment received from Vikram" time="2m" />
            <NotificationItem icon={AlertCircle} color="amber" text="Capacity warning: 84% utilized" time="10m" />
            <NotificationItem icon={UserCircle} color="blue" text="New customer Anita joined" time="25m" />
            <NotificationItem icon={Umbrella} color="red" text="Vacation for Sneha ends" time="1h" />
          </div>
        </div>

      </div>

    </div>
  )
}

// --- SUBCOMPONENTS ---

function MetricCard({ title, value, trend, isUp, icon: Icon, color, sparkData }: any) {
  const colorMap: any = {
    blue: { bg: 'bg-blue-50', text: 'text-[#0066cc]', stroke: '#0066cc' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-500', stroke: '#0ea5e9' },
    red: { bg: 'bg-red-50', text: 'text-red-500', stroke: '#ef4444' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-500', stroke: '#f59e0b' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-500', stroke: '#8b5cf6' },
  }
  const c = colorMap[color]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[120px]">
      <div className="flex justify-between items-start mb-2">
        <div className={`w-8 h-8 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{title}</p>
        <p className="text-xl font-black text-slate-800 mt-0.5">{value}</p>
      </div>
      <div className={`absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
        {isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
        {trend}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[30px] opacity-30 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="v" stroke={c.stroke} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ActivityItem({ name, action, time, type }: any) {
  const typeMap: any = {
    vacation: { dot: 'bg-amber-500', pillBg: 'bg-amber-50', pillText: 'text-amber-600', pillLabel: 'Vacation' },
    skip: { dot: 'bg-red-500', pillBg: 'bg-red-50', pillText: 'text-red-600', pillLabel: 'Skip' },
    new: { dot: 'bg-[#0066cc]', pillBg: 'bg-blue-50', pillText: 'text-[#0066cc]', pillLabel: 'New' },
    payment: { dot: 'bg-green-500', pillBg: 'bg-green-50', pillText: 'text-green-600', pillLabel: 'Payment' },
  }
  const t = typeMap[type]

  return (
    <div className="flex items-start gap-4 relative">
      <div className="absolute left-3.5 top-8 bottom-[-24px] w-px bg-slate-100" />
      <div className="relative z-10 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm overflow-hidden">
         <span className="text-[10px] font-bold text-slate-500">{name.charAt(0)}</span>
         <div className={`absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 ${t.dot} rounded-full border border-white`} />
      </div>
      <div className="flex-1 pt-1">
        <div className="flex justify-between items-start">
          <p className="text-xs font-bold text-slate-800">{name}</p>
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${t.pillBg} ${t.pillText}`}>{t.pillLabel}</span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{action}</p>
        <p className="text-[9px] font-bold text-slate-400 mt-1 flex justify-end w-full">{time}</p>
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label }: any) {
  return (
    <button className="flex flex-col items-center justify-center p-3 text-center rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-colors mb-2">
        <Icon size={18} />
      </div>
      <span className="text-[10px] font-bold text-slate-600 leading-tight">{label}</span>
    </button>
  )
}

function NotificationItem({ icon: Icon, color, text, time }: any) {
  const colorMap: any = {
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-[#0066cc]',
    red: 'bg-red-50 text-red-600',
  }
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={14} />
        </div>
        <p className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">{text}</p>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
  )
}
