import React, { useState } from 'react';
import { KeyRound, ArrowLeft, UserPlus } from 'lucide-react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (user: any) => void;
}

export default function ProfileModal({ isOpen, onClose, onLoginSuccess }: ProfileModalProps) {
    // Form views: 'login' | 'register' | 'step1_verify' | 'step2_newpass'
    const [view, setView] = useState<'login' | 'register' | 'step1_verify' | 'step2_newpass'>('login');

    // Login & Register shared fields
    const [soldierId, setSoldierId] = useState('');
    const [password, setPassword] = useState('');
    
    // Register specific fields
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');

    // Recovery fields
    const [recoveryId, setRecoveryId] = useState('');
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    if (!isOpen) return null;

    // Handle Standard Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ soldierId, password }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) throw new Error(data.message || 'Login failed.');

            localStorage.setItem('militaryUser', JSON.stringify(data.user));
            onLoginSuccess(data.user);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Invalid Soldier ID or credentials.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Admin Registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ soldierId, password, name: regName, email: regEmail }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed.');

            setMessage('Admin account registered successfully! You can now sign in.');
            setTimeout(() => {
                setView('login');
                setMessage('');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    // Step 1: Verify Army ID and Gmail address exist and match
    const handleVerifyIdentity = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/verify-recovery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ soldierId: recoveryId, email: recoveryEmail }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) throw new Error(data.message || 'Verification failed.');

            setMessage('Identity verified successfully. Please enter your new password.');
            setView('step2_newpass');
        } catch (err: any) {
            setError(err.message || 'No matching record found for this ID and Email.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Submit matching new passwords
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match. Please re-enter.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/update-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ soldierId: recoveryId, newPassword }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) throw new Error(data.message || 'Password update failed.');

            alert('Password changed successfully! You can now log in with your new credentials.');
            setView('login');
            setRecoveryId('');
            setRecoveryEmail('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('');
        } catch (err: any) {
            setError(err.message || 'Failed to update password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
            <div className="max-w-md w-full bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm"
                >
                    ✕
                </button>

                {/* VIEW 1: STANDARD LOGIN FORM */}
                {view === 'login' && (
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-block mb-3">
                            Secure Authentication
                        </span>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white mb-2">Personnel Sign In</h2>
                        <p className="text-xs text-neutral-400 mb-6">Enter your authorized Army ID and password.</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Army ID</label>
                                <input
                                    type="text"
                                    value={soldierId}
                                    onChange={(e) => setSoldierId(e.target.value)}
                                    placeholder="USA-XXXX-XX"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="F9#4!kL2"
                                    required
                                    // The custom style/class prevents Chrome's white auto-fill background flash
                                    style={{ WebkitBoxShadow: '0 0 0 30px #0a0a0a inset', WebkitTextFillColor: '#ffffff' }}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />

                            </div>

                            <button 
                                type="submit" 
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-4 flex items-center justify-between text-xs">
                            <button
                                type="button"
                                onClick={() => { setView('register'); setError(''); setMessage(''); }}
                                className="text-amber-400 hover:underline flex items-center gap-1"
                            >
                                <UserPlus size={13} /> Register Admin ID
                            </button>
                            <button
                                type="button"
                                onClick={() => { setView('step1_verify'); setError(''); setMessage(''); }}
                                className="text-neutral-400 hover:text-white flex items-center gap-1"
                            >
                                <KeyRound size={13} /> Forgot Password?
                            </button>
                        </div>

                        {error && <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-center">{error}</div>}
                        {message && <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs text-center">{message}</div>}
                    </div>
                )}

                {/* VIEW 1.5: ADMIN REGISTRATION FORM */}
                {view === 'register' && (
                    <div>
                        <button 
                            onClick={() => { setView('login'); setError(''); setMessage(''); }}
                            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 mb-3"
                        >
                            <ArrowLeft size={14} /> Back to Sign In
                        </button>

                        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-block mb-3">
                            Authorized Enrollment
                        </span>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white mb-2">Register Admin Account</h2>
                        <p className="text-xs text-neutral-400 mb-6">Restricted to authorized codes: USA-7628-LG or USA-9942-SV.</p>

                        <form onSubmit={handleRegister} className="space-y-3">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Full Name / Officer Name</label>
                                <input
                                    type="text"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    placeholder="Commander Name"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Gmail Address (For Recovery)</label>
                                <input
                                    type="email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    placeholder="email@gmail.com"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Authorized Army ID</label>
                                <input
                                    type="text"
                                    value={soldierId}
                                    onChange={(e) => setSoldierId(e.target.value)}
                                    placeholder="USA-XXXX-XX"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="J&88je%va$"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-amber-500/20 mt-2"
                            >
                                {loading ? 'Registering...' : 'Register Admin Account'}
                            </button>
                        </form>

                        {error && <div className="mt-3 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-center">{error}</div>}
                        {message && <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs text-center">{message}</div>}
                    </div>
                )}

                {/* VIEW 2: RECOVERY STEP 1 — VERIFY ID & GMAIL */}
                {view === 'step1_verify' && (
                    <div>
                        <button 
                            onClick={() => { setView('login'); setError(''); setMessage(''); }}
                            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 mb-3"
                        >
                            <ArrowLeft size={14} /> Back to Sign In
                        </button>
                        
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 inline-block mb-3">
                            Password Recovery (Step 1 of 2)
                        </span>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white mb-2">Verify Identity</h2>
                        <p className="text-xs text-neutral-400 mb-6">Enter your registered Army ID and Gmail address to proceed.</p>

                        <form onSubmit={handleVerifyIdentity} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Army ID</label>
                                <input
                                    type="text"
                                    value={recoveryId}
                                    onChange={(e) => setRecoveryId(e.target.value)}
                                    placeholder="USA-XXXX-XX"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Gmail Address</label>
                                <input
                                    type="email"
                                    value={recoveryEmail}
                                    onChange={(e) => setRecoveryEmail(e.target.value)}
                                    placeholder="your-email@gmail.com"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase py-3 rounded-xl transition shadow-lg"
                            >
                                {loading ? 'Verifying records...' : 'Verify & Continue'}
                            </button>
                        </form>

                        {error && <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-center">{error}</div>}
                    </div>
                )}

                {/* VIEW 3: RECOVERY STEP 2 — INPUT NEW PASSWORD TWICE */}
                {view === 'step2_newpass' && (
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 inline-block mb-3">
                            Password Recovery (Step 2 of 2)
                        </span>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white mb-2">Set New Password</h2>
                        <p className="text-xs text-neutral-400 mb-6">Identity verified for <strong className="text-white">{recoveryId}</strong>. Enter your new password twice.</p>

                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="j9#4!kL2"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="J&88je%va$"
                                    required
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
                            >
                                {loading ? 'Updating...' : 'Change Password'}
                            </button>
                        </form>

                        {message && <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs text-center">{message}</div>}
                        {error && <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-center">{error}</div>}
                    </div>
                )}

            </div>
        </div>
    );
}