import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { user_id, prompt } = await req.json();
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

    // Lấy thông tin người dùng và bài đăng để cung cấp ngữ cảnh
    const { data: user } = await supabase.from('users').select('email, role, plan').eq('id', user_id).single();
    const { data: ads } = await supabase.from('ads').select('title, platform, category').eq('user_id', user_id);

    // Gửi yêu cầu đến Grok API
    try {
      const grokResponse = await axios.post(
        'https://api.x.ai/v1/completions',
        {
          prompt: `User: ${user?.email}, Role: ${user?.role}, Plan: ${user?.plan}. Ads: ${JSON.stringify(ads)}. Prompt: ${prompt}`,
          max_tokens: 150,
        },
        {
          headers: { Authorization: `Bearer ${process.env.GROK_API_KEY}` },
        }
      );

      return Response.json({ response: grokResponse.data.choices[0].text });
    } catch (grokError) {
      console.error('Grok API error:', grokError);

      // Dự phòng với ChatGPT API
      const chatGPTResponse = await axios.post(
        'https://api.openai.com/v3/completions',
        {
          model: 'gpt-3.5-turbo',
          prompt: `User: ${user?.email}, Role: ${user?.role}, Plan: ${user?.plan}. Ads: ${JSON.stringify(ads)}. Prompt: ${prompt}`,
          max_tokens: 150,
        },
        {
          headers: { Authorization: `Bearer ${process.env.CHATGPT_API_KEY}` },
        }
      );

      return Response.json({ response: chatGPTResponse.data.choices[0].text });
    }
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Không thể xử lý yêu cầu AI' }, { status: 500 });
  }
}