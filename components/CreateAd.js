import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CreateAd() {
    const [platform, setPlatform] = useState('zalo');
    const [content, setContent] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateAd = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            setMessage('Vui lòng đăng nhập!');
            return;
        }

        const response = await fetch('/api/ads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ platform, content, photo_url: photoUrl }),
        });

        const result = await response.json();
        if (response.ok) {
            setMessage('Tạo quảng cáo thành công!');
        } else {
            setMessage(`Lỗi: ${result.error}`);
        }
    };

    return (
        <div>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="zalo">Zalo</option>
                <option value="facebook">Facebook</option>
            </select>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung quảng cáo"
            />
            <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="URL ảnh"
            />
            <button onClick={handleCreateAd}>Tạo quảng cáo</button>
            {message && <p>{message}</p>}
        </div>
    );
}