'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Repeat,
  Truck,
  CreditCard,
  Package,
  Layers,
  Clock,
  BarChart2,
  Settings,
  LogOut,
  Search,
  Sparkles,
  Bell,
  MessageSquare,
  Calendar,
  Sun,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Database,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import Image from 'next/image'

const adminNavItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/customers', icon: Users, label: 'Customers' },
  { href: '/admin/subscriptions', icon: Repeat, label: 'Subscriptions' },
  { href: '/admin/deliveries', icon: Truck, label: 'Deliveries' },
  { href: '/admin/billing', icon: CreditCard, label: 'Billing' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/capacity', icon: Layers, label: 'Capacity' },
  { href: '/admin/waitlist', icon: Clock, label: 'Waitlist' },
  { href: '/admin/reports', icon: BarChart2, label: 'Reports' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-hidden">
      
      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-slate-200 z-30 flex-shrink-0 transition-all duration-300">
        
        {/* Logo Header */}
        <div className="h-[80px] px-6 flex items-center">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6f4fe] flex items-center justify-center text-[#0066cc]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                <path d="M5 10c0-2 2-3 4-3h6c2 0 4 1 4 3" />
                <path d="M5 10v6c0 2 2 3 4 3h6c2 0 4-1 4-3v-6" />
                <circle cx="9" cy="13" r="1" fill="currentColor" />
                <circle cx="15" cy="13" r="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-black text-[#0f2e5c] leading-none tracking-tight font-display">Amruth</p>
              <p className="text-[9px] text-[#0066cc] font-black uppercase tracking-widest mt-1">Dairy Farm</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/admin')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative block"
              >
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-bold transition-all relative z-10",
                  isActive 
                    ? "bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/20" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white" : "text-slate-400"} />
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 text-center border border-slate-100 flex flex-col items-center relative overflow-hidden">
             {/* Milk Bottle Graphic (Mocked with CSS) */}
             <div className="w-16 h-20 bg-white border-2 border-slate-200 rounded-[10px_10px_4px_4px] relative mb-3 overflow-hidden shadow-sm flex items-end justify-center pb-2">
                <div className="absolute top-0 w-8 h-4 bg-slate-200 rounded-t-sm" />
                <div className="w-full h-[60%] bg-blue-50 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/50" />
                </div>
                <MilkIcon />
             </div>
             <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">100% Pure • Farm Fresh</p>
             <p className="text-[10px] text-slate-500 font-medium mt-1">Delivering purity every<br/>morning before sunrise.</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-left border-none bg-transparent"
          >
            <LogOut size={18} className="text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT AREA (HEADER + DASHBOARD)
      ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Header */}
        <header className="h-[80px] bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 flex-shrink-0">
          
          {/* Mobile Menu Toggle & Search */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-800"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center gap-4 w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search customers, orders, invoices..." 
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                  <span>⌘</span><span>K</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0066cc] hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
                <Sparkles size={16} />
                <span>Ask AI</span>
              </button>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3 border-r border-slate-200 pr-4 lg:pr-6">
              <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-50">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">8</span>
              </button>
              <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-50">
                <MessageSquare size={20} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-50 hidden sm:block">
                <Calendar size={20} />
              </button>
              <div className="pl-2">
                <ThemeToggle />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 border-r border-slate-200 pr-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">May 18, 2025</p>
                <p className="text-xs font-semibold text-slate-500">Sunday</p>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="text-amber-500" size={24} />
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">26°C</p>
                  <p className="text-xs font-semibold text-slate-500">Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-800 group-hover:text-[#0066cc] transition-colors">Admin</p>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0066cc]">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 bg-[#f8fafc]">
          {children}
        </main>

        {/* Bottom Status Footer */}
        <footer className="h-[40px] bg-white border-t border-slate-200 flex items-center justify-between px-6 flex-shrink-0 text-[11px] font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-slate-400" />
            <span>Amruth Dairy Farm Admin <span className="text-slate-400">v2.4.1</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">System Health</span>
              <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Excellent
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Server</span>
              <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Healthy
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Database</span>
              <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Connected
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">API Status</span>
              <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">Last Backup <span className="font-bold text-slate-700 ml-1">2 hours ago</span></span>
            <span className="text-slate-400">© 2025 Amruth Dairy Farm. All rights reserved.</span>
          </div>
        </footer>

      </div>

      {/* =========================================
          MOBILE OVERLAY MENU
      ========================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-[280px] bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="h-[80px] px-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f4fe] flex items-center justify-center text-[#0066cc]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                      <path d="M5 10c0-2 2-3 4-3h6c2 0 4 1 4 3" />
                      <path d="M5 10v6c0 2 2 3 4 3h6c2 0 4-1 4-3v-6" />
                      <circle cx="9" cy="13" r="1" fill="currentColor" />
                      <circle cx="15" cy="13" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0f2e5c] leading-none tracking-tight font-display">Amruth</p>
                    <p className="text-[9px] text-[#0066cc] font-black uppercase tracking-widest mt-1">Dairy Farm</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {adminNavItems.map((item) => {
                  const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/admin')
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all",
                        isActive 
                          ? "bg-[#eff6ff] text-[#0066cc]" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      )}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-[#0066cc]" : "text-slate-400"} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-slate-200">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}

// Simple decorative milk icon for the sidebar ad
function MilkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute text-blue-200 z-10 bottom-2">
      <path d="M7 10v12h10V10l-2-4h-6z"/>
      <path d="M8.5 2h7"/>
      <path d="M12 2v4"/>
    </svg>
  )
}
