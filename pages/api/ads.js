import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { user, error: authError } = await supabase.auth.getUser(req.headers.authorization);

  if (authError || !user) {
    console.log('Auth error:', authError);
    return res.status(401).json({ error: 'Chưa đăng nhập' });
  }

  if (req.method === 'POST') {
    const { platform, content, photo_url } = req.body;
    console.log('POST request body:', req.body);

    const { data, error } = await supabase
      .from('ads')
      .insert([
        {
          user_id: user.id,
          platform,
          content,
          photo_url,
          status: 'draft',
        },
      ])
      .select();

    if (error) {
      console.log('Insert error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Giả lập gọi Zalo API
    try {
      if (platform === 'zalo') {
        const response = await fetch('https://tinhlong.com/api/zalo/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ad_id: data[0].id, content, photo_url }),
        });
        if (!response.ok) throw new Error('Zalo API thất bại');
      }
      await supabase.from('ads').update({ status: 'published' }).eq('id', data[0].id);
      return res.status(200).json(data);
    } catch (err) {
      console.log('Zalo API error:', err);
      await supabase.from('ads').update({ status: 'failed' }).eq('id', data[0].id);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Select error:', error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: 'Phương thức không được hỗ trợ' });
}