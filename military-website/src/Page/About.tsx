
import { ShieldCheck, Lock, UserCheck,  Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function about() {
    return (
        <div className="min-h-screen bg-[#745a2c] text-white pt-28 pb-16 px-4 md:px-8 font-mono">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* Hero Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs tracking-widest uppercase font-bold">
                        <ShieldCheck size={14} /> Official Command Directive
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider">
                        About <span className="text-amber-400">U.S. Army</span> Verification
                    </h1>
                    <p className="text-neutral-400 text-xs md:text-sm max-w-2xl mx-auto">
                        Securing digital infrastructure and safeguarding personnel profiles against unauthorized replication and fraudulent impersonation vectors.
                    </p>
                </motion.div>

                {/* Main About Us Mission Block (Provided Text) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-[#1E2229] border border-amber-600/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-amber-400 mb-6 flex items-center gap-3">
                        <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></span>
                        About Us
                    </h2>

                    <div className="space-y-4 text-neutral-300 text-xs md:text-sm leading-relaxed">
                        <p>
                            We are US ARMY trusted verification service dedicated to helping protect active clients from identity impersonation and fraudulent activity. Our mission is to confirm the authenticity of verified individuals through secure and reliable processes, helping create a safer and more trustworthy environment.
                        </p>
                        <p>
                            With a focus on privacy, accuracy, and security, we work to ensure that clients can confidently connect with verified individuals while reducing the risks associated with impersonation and false identities.
                        </p>
                        <div className="pt-4 border-t border-neutral-800 text-amber-300/90 font-semibold">
                            ✓ This platform helps verify authorized profiles and reduce the risk of impersonation through secure identity verification processes.
                        </div>
                    </div>
                </motion.div>

                {/* Core Pillars / Grid Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1E2229]/60 border border-neutral-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <Lock size={20} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-white">Privacy First</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Strict data encryption protocols shield sensitive service records from exposure while allowing authorized lookups.
                        </p>
                    </div>

                    <div className="bg-[#1E2229]/60 border border-neutral-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <UserCheck size={20} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-white">Identity Integrity</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Every registered soldier profile is tied directly to unique security credentials and verification hashes.
                        </p>
                    </div>

                    <div className="bg-[#1E2229]/60 border border-neutral-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <Globe size={20} />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider text-white">Global Command</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Continuous real-time database validation tracking active deployment theaters, assignments, and clearances.
                        </p>
                    </div>
                </div>

                {/* Operational Statistics Section */}
                <div className="bg-linear-to-r from-emerald-950/40 via-[#1E2229] to-amber-950/20 border border-neutral-800 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-amber-400">100%</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Encrypted Record</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-amber-400">24/7</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">System Monitoring</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-amber-400">Zero</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Impersonation Tolerance</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-3xl font-black text-amber-400">SEC-V</div>
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Clearance Protocol</div>
                    </div>
                </div>

            </div>
        </div>
    );
}