'use client'

import { useState, useMemo } from 'react'
import { Droplets, Calendar as CalendarIcon, Save, Info, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface CapacityLog {
  id: string;
  date: string;
  total_litres: number;
  booked_litres: number;
  is_full: boolean;
}

export function CapacityClient({ data: initialData }: { data: CapacityLog[] }) {
  const [data, setData] = useState<CapacityLog[]>(initialData);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Create a quick lookup map for dates
  const capacityMap = useMemo(() => {
    const map = new Map<string, CapacityLog>();
    data.forEach(log => map.set(log.date, log));
    return map;
  }, [data]);

  // Helpers for calendar
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Create a proper date adjusted for local timezone rendering correctly
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    // Note: using local year, month, day to avoid UTC shifts
    const localD = new Date(currentYear, currentMonth, i);
    // adjust to noon to avoid timezone boundary issues when doing .toISOString().split('T')[0]
    localD.setHours(12, 0, 0, 0); 
    calendarDays.push(localD);
  }

  // Current selected log
  // Get date string safely
  const tempD = new Date(selectedDate);
  tempD.setHours(12, 0, 0, 0);
  const selectedDateStr = tempD.toISOString().split('T')[0];
  
  const activeLog = capacityMap.get(selectedDateStr) || {
    id: 'new',
    date: selectedDateStr,
    total_litres: 100, // default if not set
    booked_litres: 0,
    is_full: false
  };

  // Editing state
  const [editTotal, setEditTotal] = useState<string>(activeLog.total_litres.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // When selected date changes, reset the edit field
  const handleDateSelect = (d: Date) => {
    setSelectedDate(d);
    d.setHours(12, 0, 0, 0);
    const dStr = d.toISOString().split('T')[0];
    const log = capacityMap.get(dStr);
    setEditTotal(log ? log.total_litres.toString() : '100');
    setMessage(null);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    handleDateSelect(newDate);
  };

  const available = Math.max(0, Number(editTotal) - activeLog.booked_litres);
  const percentFull = Math.min(100, (activeLog.booked_litres / (Number(editTotal) || 1)) * 100);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);
      
      const newTotal = Number(editTotal);
      if (isNaN(newTotal) || newTotal <= 0) {
        throw new Error("Please enter a valid positive number for capacity.");
      }
      
      const res = await fetch('/api/admin/capacity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDateStr,
          total_litres: newTotal
        })
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to update capacity');
      
      // Update local state
      setData(prev => {
        const existingIndex = prev.findIndex(p => p.date === selectedDateStr);
        if (existingIndex >= 0) {
          const newData = [...prev];
          newData[existingIndex] = result.data;
          return newData;
        }
        return [...prev, result.data];
      });
      
      setMessage({ text: 'Capacity updated successfully!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <AdminHeader 
        title="Production Capacity" 
        description="Manage your daily milk yield limits to prevent overbooking." 
        icon={Droplets} 
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        alignItems: 'start' 
      }}>
        
        {/* LEFT COLUMN: EDIT CARD */}
        <div style={{ 
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)', 
          borderRadius: '24px', 
          padding: '32px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden',
          flex: 2,
          minWidth: '350px'
        }}>
          {/* Decorative background circle */}
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px',
            borderRadius: '50%', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            opacity: 0.5, zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                  {activeLog.id === 'new' ? 'No data logged yet. Defaulting to 100L.' : 'Editing logged capacity.'}
                </p>
              </div>
              <div style={{
                background: percentFull >= 100 ? '#fef2f2' : '#f0fdf4',
                color: percentFull >= 100 ? '#ef4444' : '#22c55e',
                padding: '8px 16px',
                borderRadius: '99px',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {percentFull >= 100 ? <AlertTriangle size={16}/> : <CheckCircle2 size={16}/>}
                {percentFull >= 100 ? 'Fully Booked' : 'Accepting Orders'}
              </div>
            </div>

            {/* Visual Gauge */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Capacity Utilization</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{Math.round(percentFull)}%</span>
              </div>
              <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${percentFull}%`, 
                  background: percentFull >= 100 ? '#ef4444' : percentFull > 80 ? '#f59e0b' : '#3b82f6',
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '99px'
                }} />
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>TOTAL (L)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="number"
                    value={editTotal}
                    onChange={(e) => setEditTotal(e.target.value)}
                    style={{ 
                      fontSize: '28px', fontWeight: 800, color: '#0f172a', width: '100%', 
                      background: 'transparent', border: 'none', outline: 'none', borderBottom: '2px dashed #cbd5e1',
                      padding: '0 0 4px 0'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ background: '#fff7ed', padding: '20px', borderRadius: '16px', border: '1px solid #ffedd5' }}>
                <div style={{ fontSize: '12px', color: '#c2410c', fontWeight: 600, marginBottom: '8px' }}>BOOKED (L)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ea580c' }}>
                  {activeLog.booked_litres}
                </div>
              </div>

              <div style={{ background: available <= 0 ? '#fef2f2' : '#f0fdf4', padding: '20px', borderRadius: '16px', border: `1px solid ${available <= 0 ? '#fee2e2' : '#dcfce7'}` }}>
                <div style={{ fontSize: '12px', color: available <= 0 ? '#b91c1c' : '#166534', fontWeight: 600, marginBottom: '8px' }}>AVAILABLE (L)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: available <= 0 ? '#ef4444' : '#22c55e' }}>
                  {available.toFixed(1)}
                </div>
              </div>
            </div>

            {message && (
              <div style={{ 
                padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 500,
                background: message.type === 'success' ? '#dcfce7' : '#fef2f2',
                color: message.type === 'success' ? '#166534' : '#991b1b'
              }}>
                {message.text}
              </div>
            )}

            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '16px',
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: isSaving ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Capacity'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: MINI CALENDAR */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '24px', 
          padding: '24px', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          flex: 1,
          minWidth: '300px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={20} color="#64748b" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {selectedDate.toLocaleString('default', { month: 'long' })} {currentYear}
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                onClick={() => changeMonth(-1)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}
              >
                &larr;
              </button>
              <button 
                onClick={() => handleDateSelect(new Date())}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontWeight: 600, color: '#475569', fontSize: '12px' }}
              >
                Today
              </button>
              <button 
                onClick={() => changeMonth(1)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontWeight: 700, color: '#475569' }}
              >
                &rarr;
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} style={{ textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {calendarDays.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} />;
              
              const dateStr = date.toISOString().split('T')[0];
              const tempSelected = new Date(selectedDate);
              tempSelected.setHours(12,0,0,0);
              const isSelected = tempSelected.toISOString().split('T')[0] === dateStr;
              
              const tempToday = new Date();
              tempToday.setHours(12,0,0,0);
              const isToday = tempToday.toISOString().split('T')[0] === dateStr;
              
              const log = capacityMap.get(dateStr);
              
              // Determine indicator color based on capacity
              let indicatorColor = 'transparent';
              if (log) {
                const percent = (log.booked_litres / log.total_litres) * 100;
                if (percent >= 100) indicatorColor = '#ef4444'; // Red if full
                else if (percent >= 80) indicatorColor = '#f59e0b'; // Orange if near full
                else indicatorColor = '#22c55e'; // Green if safe
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(date)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #0f172a' : '1px solid transparent',
                    background: isSelected ? '#f8fafc' : isToday ? '#eff6ff' : 'transparent',
                    color: isToday && !isSelected ? '#2563eb' : '#334155',
                    fontSize: '14px',
                    fontWeight: isSelected || isToday ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: 0,
                    transition: 'background 0.2s'
                  }}
                >
                  {date.getDate()}
                  <div style={{ 
                    width: '4px', height: '4px', borderRadius: '50%', background: indicatorColor,
                    position: 'absolute', bottom: '6px'
                  }} />
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>Legend</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                Accepting Orders
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                Near Capacity (80%+)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                Fully Booked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
