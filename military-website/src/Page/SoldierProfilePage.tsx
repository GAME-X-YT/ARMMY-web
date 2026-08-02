import React, { useState } from 'react';

export default function SecureSoldierLogin() {
    const [soldierIdInput, setSoldierIdInput] = useState('');
    const [accessCodeInput, setAccessCodeInput] = useState('');
    const [soldierData, setSoldierData] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSecureLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSoldierData(null);

        try {
            const res = await fetch('http://localhost:5000/api/soldiers/verify-secure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    soldierId: soldierIdInput,
                    accessCode: accessCodeInput
                })
            });

            const data = await res.json();

            if (data.success) {
                setSoldierData(data.data);
            } else {
                setErrorMsg(data.message);
            }
        } catch (err) {
            setErrorMsg('Network transmission error. Verify connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-xl md:text-2xl font-bold text-amber-500 uppercase tracking-widest">
                        SECURE PERSONNEL PORTAL
                    </h1>
                    <p className="text-xs text-neutral-400 mt-1">
                        Enter your assigned Army ID and security access code to view classified records.
                    </p>
                </header>

                {!soldierData ? (
                    /* Dual-Input Form */
                    <form onSubmit={handleSecureLogin} className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg space-y-4">
                        <div>
                            <label className="block text-xs text-neutral-400 mb-1">Army ID</label>
                            <input 
                                type="text" 
                                placeholder="e.g. USA-9942-SV" 
                                value={soldierIdInput}
                                onChange={(e) => setSoldierIdInput(e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded text-white font-mono text-sm tracking-wider uppercase focus:border-amber-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-neutral-400 mb-1">Security Access Code</label>
                            <input 
                                type="password" 
                                placeholder="Enter secure code" 
                                value={accessCodeInput}
                                onChange={(e) => setAccessCodeInput(e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 p-3 rounded text-white font-mono text-sm tracking-wider focus:border-amber-500 focus:outline-none"
                                required
                            />
                        </div>

                        {errorMsg && (
                            <div className="bg-red-950/50 border border-red-800 text-red-400 p-3 rounded text-xs text-center">
                                {errorMsg}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 rounded text-sm uppercase tracking-wider transition-colors"
                        >
                            {loading ? 'Authenticating...' : 'Access Classified Profile'}
                        </button>
                    </form>
                ) : (
                    /* Rendered Profile Page Once Authenticated */
                    <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-lg space-y-6">
                        <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
                            {soldierData.image && (
                                <img 
                                    src={`http://localhost:5000${soldierData.image}`} 
                                    alt={soldierData.name} 
                                    className="w-20 h-20 object-cover rounded border border-neutral-700" 
                                />
                            )}
                            <div>
                                <span className="bg-amber-500/10 text-amber-400 text-xs font-mono px-2 py-0.5 rounded border border-amber-500/20">
                                    {soldierData.soldierId}
                                </span>
                                <h2 className="text-xl font-bold text-white mt-1">{soldierData.name}</h2>
                                <p className="text-xs text-amber-500 font-semibold">{soldierData.rank}</p>
                            </div>
                        </div>

                        {/* Details grid matching admin updates */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-neutral-800/40 p-3 rounded border border-neutral-800">
                                <span className="text-neutral-500 block mb-1">Unit</span>
                                <span className="text-neutral-200 font-medium">{soldierData.unit}</span>
                            </div>
                            <div className="bg-neutral-800/40 p-3 rounded border border-neutral-800">
                                <span className="text-neutral-500 block mb-1">Deployment Location</span>
                                <span className="text-neutral-200 font-medium">{soldierData.location}</span>
                            </div>
                            <div className="bg-neutral-800/40 p-3 rounded border border-neutral-800">
                                <span className="text-neutral-500 block mb-1">Clearance Level</span>
                                <span className="text-neutral-200 font-medium">{soldierData.clearanceLevel}</span>
                            </div>
                            <div className="bg-neutral-800/40 p-3 rounded border border-neutral-800">
                                <span className="text-neutral-500 block mb-1">Income Bracket</span>
                                <span className="text-neutral-200 font-medium">{soldierData.annualIncome}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSoldierData(null)} 
                            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 rounded text-xs uppercase tracking-wider"
                        >
                            Lock & Exit Session
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}