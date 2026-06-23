import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Strict role check
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { date, total_litres } = await request.json();

    if (!date || total_litres === undefined || Number(total_litres) <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid payload: Valid date and positive total_litres required' }, { status: 400 });
    }

    const adminSupabase = createAdminClient();

    // Check if record exists
    const { data: existing } = await adminSupabase
      .from('daily_capacity')
      .select('id, booked_litres')
      .eq('date', date)
      .maybeSingle();

    let result;
    if (existing) {
      if (Number(total_litres) < Number(existing.booked_litres)) {
          return NextResponse.json({ success: false, message: 'Total capacity cannot be less than already booked litres' }, { status: 400 });
      }
      
      const { data, error } = await adminSupabase
        .from('daily_capacity')
        .update({ total_litres: Number(total_litres) })
        .eq('id', existing.id)
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await adminSupabase
        .from('daily_capacity')
        .insert({ date, total_litres: Number(total_litres), booked_litres: 0 })
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error('Capacity update error:', err);
    return NextResponse.json({ success: false, message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
