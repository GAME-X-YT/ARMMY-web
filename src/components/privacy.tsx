import { motion } from 'framer-motion';
import { Shield, Eye, Database, Server } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-16 pt-32 font-mono overflow-hidden">
            
            {/* Background Tactical Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-12 text-amber-500"
                >
                    <Shield size={160} />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
            </div>

            {/* Header Banner */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-5xl mx-auto bg-[#242018]/90 border border-amber-600/40 p-8 md:p-12 rounded-2xl shadow-xl mb-10 overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-600 via-amber-400 to-amber-600"></div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Data Privacy & Security Directive</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-amber-400 mb-3">Privacy Policy</h1>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-3xl">
                    Safeguarding military personnel data, clearance tokens, and system telemetry in compliance with federal information security standards.
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-[11px] text-neutral-400 border-t border-amber-900/30 pt-4">
                    <span>Effective Date: <strong className="text-white">July 28, 2026</strong></span>
                    <span>Security Tier: <strong className="text-amber-500">Restricted Defense Protocol</strong></span>
                </div>
            </motion.div>

            {/* Content Sections */}
            <div className="relative z-10 max-w-5xl mx-auto space-y-8 text-neutral-300 text-xs md:text-sm leading-relaxed">
                
                {/* Section 1 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-[#242018]/80 border border-amber-900/30 p-6 md:p-10 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4 border-b border-amber-900/30 pb-3">
                        <Database className="text-amber-400" size={20} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">1. Information We Collect</h2>
                    </div>
                    <p className="text-neutral-400 mb-3">
                        To maintain secure verification registers, we compile specific data parameters supplied directly through authentication requests and administrative channels:
                    </p>
                    <ul className="space-y-2 text-neutral-400 list-disc pl-5">
                        <li><strong className="text-white">Authentication Identifiers:</strong> Single-use clearance codes and email dispatch logs.</li>
                        <li><strong className="text-white">Service Credentials:</strong> Rank, unit assignments, enlistment records, and official soldier identification numbers.</li>
                        <li><strong className="text-white">System Telemetry:</strong> IP addresses, node access times, and browser security fingerprints.</li>
                    </ul>
                </motion.div>

                {/* Section 2 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-[#242018]/80 border border-amber-900/30 p-6 md:p-10 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4 border-b border-amber-900/30 pb-3">
                        <Eye className="text-amber-400" size={20} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">2. Use of Telemetry & Records</h2>
                    </div>
                    <p className="text-neutral-400">
                        All gathered metrics are restricted entirely to verifying active military clearance, executing backend node queries via MongoDB registries, and resolving live support desk inquiries safely without commercial exploitation or external broker sharing.
                    </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-[#242018]/80 border border-amber-900/30 p-6 md:p-10 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4 border-b border-amber-900/30 pb-3">
                        <Server className="text-amber-400" size={20} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">3. Data Protection & Encryption</h2>
                    </div>
                    <p className="text-neutral-400">
                        Server infrastructure utilizes encrypted environment protocols, secure SMTP transport layers, and tokenized session tracking to prevent unauthorized payload interception or database intrusion attempts.
                    </p>
                </motion.div>

            </div>

            {/* Footer Note */}
            <div className="relative z-10 max-w-5xl mx-auto mt-12 text-center border-t border-amber-900/30 pt-6 text-xs text-neutral-500">
                Secure Information Assurance Directive &copy; 2026. All rights reserved.
            </div>
        </div>
    );
}