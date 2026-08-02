
import { Shield, Lock, FileText, HelpCircle, Terminal } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-neutral-400 border-t border-amber-500/20 text-xs font-mono relative overflow-hidden">
            {/* Top decorative amber line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    
                    {/* Column 1: System Info */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Terminal size={16} className="text-amber-500" />
                            <h3 className="font-bold tracking-wider uppercase text-xs text-amber-400">Official System</h3>
                        </div>
                        <p className="text-neutral-400 leading-relaxed text-[11px]">
                            Secure Department of Defense information portal, engineered for authorized military service verification, secure record management, and clearance tracking.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-3">
                        <h3 className="text-white font-bold tracking-wider uppercase text-xs flex items-center gap-2">
                            <Shield size={14} className="text-amber-500" /> Quick Navigation
                        </h3>
                        <ul className="space-y-2 text-[11px]">
                            <li>
                                <a href="/privacy" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                    <FileText size={12} className="text-neutral-500" /> Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                    <Lock size={12} className="text-neutral-500" /> Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/LiveSupport" className="hover:text-amber-400 transition flex items-center gap-1.5">
                                    <HelpCircle size={12} className="text-neutral-500" /> Help & Support Desk
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Security Notice */}
                    <div className="space-y-3">
                        <h3 className="text-white font-bold tracking-wider uppercase text-xs flex items-center gap-2">
                            <Lock size={14} className="text-amber-500" /> Security Protocol
                        </h3>
                        <p className="text-neutral-400 leading-relaxed text-[11px]">
                            All network activities, authentication tokens, and administrative requests are continuously monitored, logged, and audited. Unauthorized access attempts face federal prosecution.
                        </p>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
                    <div>
                        &copy; 2026 U.S. Army Verification Portal. All Rights Reserved.
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Node Security Status: Optimal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}