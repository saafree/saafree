import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Lấy Supabase URL và KEY từ biến môi trường
const SUPABASE_URL = 'https://udwvmxorbyohvvzbwaze.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const platform = formData.get('platform');
    const adId = formData.get('adId');

    if (!file || !platform || !adId) {
      return NextResponse.json({ error: 'Thiếu file, platform hoặc adId' }, { status: 400 });
    }

    // Lấy token từ Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header:', authHeader);
      return NextResponse.json({ error: 'Thiếu hoặc sai định dạng token' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    console.log('Token received:', token);

    // Khởi tạo Supabase client với token người dùng
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Xác thực user từ token
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.log('Auth error:', authError);
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc token không hợp lệ' }, { status: 401 });
    }

    console.log('User authenticated:', user.id);

    // Chuẩn bị dữ liệu file
    const fileName = `${user.id}/${adId}/${Date.now()}.${file.type.split('/')[1]}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Nếu platform là zalo thì upload lên tinhlong.com
    if (platform === 'zalo') {
      const uploadForm = new FormData();
      uploadForm.append('image', new Blob([fileBuffer], { type: file.type }), fileName);

      const response = await fetch('https://tinhlong.com/api/upload.php', {
        method: 'POST',
        body: uploadForm,
      });

      if (!response.ok) throw new Error('Upload Zalo thất bại');

      const { url } = await response.json();
      return NextResponse.json({ url });
    } else {
      // platform khác, upload lên Supabase Storage
      const bucket = file.type.startsWith('image') ? 'images' : 'videos';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, fileBuffer, {
          contentType: file.type,
        });

      if (uploadError) {
        console.log('Storage error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return NextResponse.json({ url: publicUrl });
    }
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
