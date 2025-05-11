import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(`Lỗi: ${error.message}`);
        } else {
            setMessage('Đăng ký thành công! Vui lòng kiểm tra email.');
            // Thêm thông tin vào bảng users
            await supabase.from('users').insert([{ id: data.user.id, email }]);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật применяется
            />
            <button onClick={handleSignUp}>Đăng ký</button>
            {message && <p>{message}</p>}
        </div>
    );
}