import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Shield, RefreshCw, Copy, Check, AlertCircle, Hash } from 'lucide-react';

export default function AdminCodeGeneratorModule() {
    const [soldierId, setSoldierId] = useState('');
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const API_URL = import.meta.env.PROD 
    ? 'https://arrmy-backend.onrender.com' 
    : 'http://localhost:5000';

    const handleGenerateCode = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        setGeneratedCode(null);

        try {
        // Change single quotes '' to backticks ``
        const response = await fetch(`${API_URL}/api/soldiers/generate-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ soldierId: soldierId.trim() }),
        });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate access code.');
            }

            setGeneratedCode(data.code || data.accessCode);
            setSuccessMessage('Access code successfully generated and dispatched.');
        } catch (err: any) {
            setError(err.message || 'An error occurred during code generation.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCode = () => {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };
    return (
        <div className="max-w-xl mx-auto p-6 bg-neutral-900 border border-neutral-800 rounded-2xl text-neutral-200">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-amber-500" />
                <h2 className="text-lg font-bold tracking-wide uppercase">Generate Clearance Key</h2>
            </div>

            <p className="text-xs text-neutral-400 mb-6">
                Enter target Soldier ID to dispatch a single-use authentication key.
            </p>

            <form onSubmit={handleGenerateCode} className="space-y-4">
                <div className="relative">
                    <Hash className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        value={soldierId}
                        onChange={(e) => setSoldierId(e.target.value)}
                        placeholder="USA-***-***"
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                    {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                        <Key className="w-4 h-4" />
                    )}
                    {loading ? 'Processing...' : 'GENERATE & DISPATCH'}
                </button>
            </form>

            {/* Error Message Alert */}
            {error && (
                <div className="mt-4 p-3 bg-red-950/50 border border-red-800 rounded-xl flex items-center gap-2 text-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Success / Generated Code Box */}
            <AnimatePresence>
                {generatedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 p-4 bg-emerald-950/30 border border-emerald-800/50 rounded-xl space-y-3"
                    >
                        <div className="text-xs text-emerald-400 font-medium">
                            {successMessage}
                        </div>
                        <div className="flex items-center justify-between bg-neutral-950 px-4 py-3 rounded-lg border border-neutral-800">
                            <span className="font-mono text-amber-400 text-lg tracking-widest">{generatedCode}</span>
                            <button
                                onClick={handleCopyCode}
                                className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg transition-colors text-neutral-200"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy Key'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}