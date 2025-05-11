import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(`Lỗi: ${error.message}`);
        } else {
            setMessage('Đăng nhập thành công!');
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
                placeholder="Mật khẩu"
            />
            <button onClick={handleSignIn}>Đăng nhập</button>
            {message && <p>{message}</p>}
        </div>
    );
}