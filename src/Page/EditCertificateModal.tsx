import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, X, Save, ShieldAlert } from 'lucide-react';

interface EditCertificateModalProps {
    soldier: {
        _id: string;
        soldierId: string;
        name: string;
        certificate?: {
            title?: string;
            description?: string;
            issueDate?: string;
            signedBy?: string;
            logo?: string;
        };
    };
    onClose: () => void;
    onUpdate: () => void;
}

export default function EditCertificateModal({ soldier, onClose, onUpdate }: EditCertificateModalProps) {
    const [title, setTitle] = useState(soldier.certificate?.title || 'Certificate of Special Commendation');
    const [description, setDescription] = useState(soldier.certificate?.description || '');
    const [signedBy, setSignedBy] = useState(soldier.certificate?.signedBy || 'Major Gen. Jeff M. Farris');
    const [issueDate, setIssueDate] = useState(soldier.certificate?.issueDate || new Date().toLocaleDateString());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
        const API_URL = import.meta.env.PROD 
    ? 'https://arrmy-backend.onrender.com' 
    : 'http://localhost:5000';


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/soldiers/${soldier._id}/certificate`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    certificate: {
                        title,
                        description,
                        signedBy,
                        issueDate
                    }
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to update certificate.');
            }

            onUpdate(); 
            onClose();  
        } catch (err: any) {
            setError(err.message || 'An error occurred while saving.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto font-mono">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-xl w-full bg-[#1b1812] border-2 border-amber-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(217,119,6,0.3)] text-white"
            >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40">
                    <span className="flex items-center gap-2 text-amber-400 text-xs tracking-wider uppercase font-bold">
                        <Award size={16} /> Admin: Edit Certificate Record
                    </span>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white p-1 rounded-lg transition">
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-red-950/60 border border-red-500 text-red-300 p-3 rounded-lg text-xs flex items-center gap-2">
                        <ShieldAlert size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">Certificate Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-neutral-900 border border-amber-900/50 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">Commendation Description</label>
                        <textarea 
                            rows={4}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full bg-neutral-900 border border-amber-900/50 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">Authenticated By (Officer)</label>
                            <input 
                                type="text" 
                                value={signedBy} 
                                onChange={(e) => setSignedBy(e.target.value)}
                                required
                                className="w-full bg-neutral-900 border border-amber-900/50 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] uppercase tracking-wider text-amber-400 mb-1 font-bold">Issue Date</label>
                            <input 
                                type="text" 
                                value={issueDate} 
                                onChange={(e) => setIssueDate(e.target.value)}
                                required
                                className="w-full bg-neutral-900 border border-amber-900/50 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-amber-900/40">
                        <button type="button" onClick={onClose} className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition border border-neutral-700">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition flex items-center gap-1.5 shadow">
                            <Save size={14} /> {loading ? 'Saving...' : 'Save Certificate'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}