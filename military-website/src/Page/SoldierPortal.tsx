import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SoldierPortal() {
    const { soldierId } = useParams();
    const navigate = useNavigate();
    const [soldierData, setSoldierData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    useEffect(() => {
        // Fetch specific soldier details from your backend using the soldierId parameter
        fetch(`${API_URL}/api/soldiers/${soldierId}`)
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized or invalid soldier record.');
                return res.json();
            })
            .then(data => {
                setSoldierData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [soldierId]);

    if (loading) return <div className="min-h-screen bg-black text-amber-500 flex items-center justify-center font-mono text-xs animate-pulse">DECRYPTING SECURE RECORD...</div>;
    if (error) return <div className="min-h-screen bg-black text-red-500 flex items-center justify-center font-mono text-xs">⚠️ ACCESS DENIED: {error}</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
            <div className="max-w-4xl mx-auto bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-6 mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-amber-400 uppercase tracking-widest">Secure Personnel Dossier</h1>
                        <p className="text-xs text-neutral-400 mt-1">ID: {soldierData?.soldierId}</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs px-4 py-2 rounded-xl transition"
                    >
                        Back
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <img 
                            src={soldierData?.photoUrl || "https://via.placeholder.com/150"} 
                            alt="Soldier" 
                            className="w-full h-64 object-cover rounded-xl border border-neutral-800"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-4 text-sm">
                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                            <span className="text-[10px] uppercase text-neutral-500 block">Full Name</span>
                            <span className="font-bold text-white text-base">{soldierData?.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                                <span className="text-[10px] uppercase text-neutral-500 block">Rank</span>
                                <span className="font-semibold text-amber-400">{soldierData?.rank}</span>
                            </div>
                            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                                <span className="text-[10px] uppercase text-neutral-500 block">Status</span>
                                <span className="font-semibold text-emerald-400">{soldierData?.status}</span>
                            </div>
                        </div>
                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                            <span className="text-[10px] uppercase text-neutral-500 block">Assigned Unit</span>
                            <span className="text-neutral-300">{soldierData?.unit}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}