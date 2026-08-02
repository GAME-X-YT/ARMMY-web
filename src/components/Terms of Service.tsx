import { FileText, Lock, AlertTriangle, Scale, RefreshCw } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-12 pt-32 font-mono">
            {/* Header Banner */}
            <div className="w-full bg-neutral-900/80 border border-amber-500/30 p-8 md:p-12 rounded-2xl shadow-xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-600 via-amber-400 to-amber-600"></div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Legal & Compliance Protocol</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-3">Terms of Service</h1>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-4xl">
                    Please review these terms and operational guidelines carefully before utilizing our secure military record portal, clearance dispatch systems, and command infrastructure.
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-[11px] text-neutral-400 border-t border-neutral-800 pt-4">
                    <span>Effective Date: <strong className="text-white">July 28, 2026</strong></span>
                    <span>Classification: <strong className="text-amber-500">Public Standard</strong></span>
                    <span>Version: <strong className="text-white">4.2.0</strong></span>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="w-full space-y-8 text-neutral-300 text-xs md:text-sm leading-relaxed">
                
                {/* Section 1 */}
                <div className="w-full bg-neutral-900/60 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-neutral-800 pb-3">
                        <FileText className="text-amber-400" size={22} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">1. Acceptance of Terms</h2>
                    </div>
                    <p className="text-neutral-400 mb-3">
                        By accessing, browsing, or utilizing this portal, command dashboards, or associated services, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and all applicable federal and international regulations.
                    </p>
                    <p className="text-neutral-400">
                        If you do not agree with any provision outlined within these terms, you must immediately terminate your session and disconnect from the network node.
                    </p>
                </div>

                {/* Section 2 */}
                <div className="w-full bg-neutral-900/60 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-neutral-800 pb-3">
                        <Lock className="text-amber-400" size={22} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">2. Access Credentials & Security</h2>
                    </div>
                    <ul className="space-y-3 text-neutral-400 list-disc pl-5">
                        <li><strong className="text-white">Single-Use Tokens:</strong> Access codes dispatched via our automated SMTP or secure channels are strictly single-use and time-sensitive. Sharing or transferring credentials compromises system integrity.</li>
                        <li><strong className="text-white">Command Passcodes:</strong> Administrative gateways require strict authorization keys (such as `COMMAND-999`). Unauthorized attempts to bypass authentication protocols are logged and subject to administrative review.</li>
                        <li><strong className="text-white">User Responsibility:</strong> You are entirely responsible for maintaining the confidentiality of your session tokens, registered email credentials, and profile configuration parameters.</li>
                    </ul>
                </div>

                {/* Section 3 */}
                <div className="w-full bg-neutral-900/60 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-neutral-800 pb-3">
                        <Scale className="text-amber-400" size={22} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">3. Permitted Use & Restrictions</h2>
                    </div>
                    <p className="text-neutral-400 mb-4">
                        The platform is engineered exclusively for authorized personnel records management, verified clearance tracking, and secure support inquiries. Users are strictly prohibited from:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80">
                            <span className="text-red-400 font-bold block mb-2">❌ Prohibited Action</span>
                            <p className="text-neutral-400 text-xs">Injecting malicious scripts, SQL payloads, or attempting unauthorized data extraction from soldier databases.</p>
                        </div>
                        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800/80">
                            <span className="text-red-400 font-bold block mb-2">❌ Prohibited Action</span>
                            <p className="text-neutral-400 text-xs">Misrepresenting identity or spoofing client emails during clearance token generation procedures.</p>
                        </div>
                    </div>
                </div>

                {/* Section 4 */}
                <div className="w-full bg-neutral-900/60 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-neutral-800 pb-3">
                        <AlertTriangle className="text-amber-400" size={22} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">4. Limitation of Liability</h2>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                        Under no circumstances shall platform operators, commanders, or developers be held liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our database records, live support queues, or code dispatch mechanisms—even if notified of the potential for such damages.
                    </p>
                </div>

                {/* Section 5 */}
                <div className="w-full bg-neutral-900/60 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-neutral-800 pb-3">
                        <RefreshCw className="text-amber-400" size={22} />
                        <h2 className="text-sm md:text-base font-bold uppercase tracking-wider text-white">5. Modifications to Terms</h2>
                    </div>
                    <p className="text-neutral-400">
                        We reserve the right to modify, amend, or update these Terms of Service at any time without direct individual notification. Continued utilization of the portal following any adjustments constitutes acceptance of the revised protocols.
                    </p>
                </div>

            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center border-t border-neutral-800 pt-6 text-xs text-neutral-500">
                Secure Command Infrastructure &copy; 2026. All rights reserved.
            </div>
        </div>
    );
}