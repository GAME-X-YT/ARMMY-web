

// // import { useState, type FormEvent } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ShieldCheck, Lock, Award, MapPin, Calendar, Hash, AlertCircle, Crosshair } from 'lucide-react';

// // interface SoldierData {
// //     image?: string;
// //     name: string;
// //     rank: string;
// //     unit: string;
// //     status: string;
// //     clearanceLevel: string;
// //     location: string;
// //     enlistmentDate: string;
// //     soldierId: string;
// //     awards?: string[];
// //     [key: string]: any;
// // }

// // export default function Verify() {
// //     const [soldierId, setSoldierId] = useState('');
// //     const [accessCode, setAccessCode] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);
// //     const [soldier, setSoldier] = useState<SoldierData | null>(null);

// //     const handleVerify = async (e: FormEvent) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError(null);

// //         try {
// //             const response = await fetch('http://localhost:5000/api/verify', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ soldierId, accessCode }),
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 throw new Error(data.message || 'Verification failed');
// //             }

// //             setSoldier(data.soldier || data);
// //         } catch (err: any) {
// //             setError(err.message || 'An unexpected error occurred.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleLogout = () => {
// //         setSoldier(null);
// //         setAccessCode('');
// //         setSoldierId('');
// //         setError(null);
// //     };

// //     // Helper to format image source properly whether it includes full URL or relative path
// //     const getImageUrl = (imagePath?: string) => {
// //         if (!imagePath) return '';
// //         if (imagePath.startsWith('http')) return imagePath;
// //         return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
// //     };

// //     return (
// //         <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden font-mono">
            
// //             {/* Background Animated Tactical Elements */}
// //             <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
// //                 <motion.div
// //                     animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
// //                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// //                     className="absolute top-1/4 left-10 text-amber-500"
// //                 >
// //                     <ShieldCheck size={120} />
// //                 </motion.div>
// //                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
// //             </div>

// //             {/* Main Interactive Card */}
// //             <motion.div 
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6 }}
// //                 className="relative z-10 max-w-2xl w-full bg-[#242018]/95 backdrop-blur-md border border-amber-600/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
// //             >
// //                 {/* Top Tactical Status Bar */}
// //                 <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40 text-[10px] text-amber-400 tracking-widest uppercase">
// //                     <span className="flex items-center gap-1.5">
// //                         <Crosshair size={14} className="text-amber-500 animate-pulse" />
// //                         Secure Tactical Uplink Active
// //                     </span>
// //                     <span>Protocol: SEC-99</span>
// //                 </div>

// //                 {!soldier && (
// //                     <>
// //                         <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-center text-amber-400 drop-shadow-md">
// //                             Secure Personnel Portal
// //                         </h1>
// //                         <p className="text-neutral-400 text-xs text-center mb-8">
// //                             Enter your assigned Army ID and single-use secure clearance code dispatched via email.
// //                         </p>

// //                         <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
// //                             <div className="relative">
// //                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
// //                                     <Hash size={16} />
// //                                 </span>
// //                                 <input
// //                                     type="text"
// //                                     value={soldierId}
// //                                     onChange={(e) => setSoldierId(e.target.value)}
// //                                     placeholder="ARMY ID (e.g. USA-9942-SV)"
// //                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
// //                                     required
// //                                 />
// //                             </div>

// //                             <div className="relative">
// //                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
// //                                     <Lock size={16} />
// //                                 </span>
// //                                 <input
// //                                     type="password"
// //                                     value={accessCode}
// //                                     onChange={(e) => setAccessCode(e.target.value)}
// //                                     placeholder="ENTER ACCESS CODE"
// //                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
// //                                     required
// //                                 />
// //                             </div>

// //                             <motion.button
// //                                 whileHover={{ scale: 1.02 }}
// //                                 whileTap={{ scale: 0.98 }}
// //                                 type="submit"
// //                                 disabled={loading}
// //                                 className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 font-bold px-7 py-3.5 rounded-xl transition text-black disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
// //                             >
// //                                 {loading ? (
// //                                     <>
// //                                         <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
// //                                         Authenticating Record...
// //                                     </>
// //                                 ) : (
// //                                     'Access Classified Profile'
// //                                 )}
// //                             </motion.button>
// //                         </form>
// //                     </>
// //                 )}

// //                 <AnimatePresence>
// //                     {error && (
// //                         <motion.div 
// //                             initial={{ opacity: 0, height: 0 }}
// //                             animate={{ opacity: 1, height: 'auto' }}
// //                             exit={{ opacity: 0, height: 0 }}
// //                             className="bg-red-950/80 border border-red-700/80 text-red-300 p-4 rounded-xl text-xs mb-6 text-center flex items-center justify-center gap-2 shadow-lg"
// //                         >
// //                             <AlertCircle size={16} className="text-red-400 shrink-0" />
// //                             <span>{error}</span>
// //                         </motion.div>
// //                     )}
// //                 </AnimatePresence>

// //                 {/* Full Soldier Profile Result Panel */}
// //                 <AnimatePresence>
// //                     {soldier && (
// //                         <motion.div 
// //                             initial={{ opacity: 0, scale: 0.95 }}
// //                             animate={{ opacity: 1, scale: 1 }}
// //                             exit={{ opacity: 0, scale: 0.95 }}
// //                             transition={{ duration: 0.4 }}
// //                             className="bg-[#14120f] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-6"
// //                         >
// //                             {/* Header / Avatar Section */}
// //                             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-neutral-800 pb-5">
// //                                 {soldier.image ? (
// //                                     <div className="relative shrink-0">
// //                                         <img
// //                                             src={getImageUrl(soldier.image)}
// //                                             alt={soldier.name}
// //                                             className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/60 shadow-md bg-neutral-900"
// //                                         />
// //                                         <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
// //                                             VERIFIED
// //                                         </span>
// //                                     </div>
// //                                 ) : (
// //                                     <div className="w-24 h-24 rounded-xl bg-neutral-800 border-2 border-amber-500/30 flex items-center justify-center text-amber-500/40 text-xs text-center p-2 shrink-0">
// //                                         NO IMAGE UPLOADED
// //                                     </div>
// //                                 )}

// //                                 <div className="text-center sm:text-left space-y-1">
// //                                     <h2 className="text-xl font-bold text-white tracking-wide">{soldier.name}</h2>
// //                                     <p className="text-amber-400 text-xs font-semibold">{soldier.rank} — {soldier.unit}</p>
// //                                     <div className="pt-1">
// //                                         <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-800/80">
// //                                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
// //                                             {soldier.status}
// //                                         </span>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Core Details Grid (Fixed text clipping and layout alignment) */}
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
// //                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
// //                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
// //                                         <ShieldCheck size={12} className="text-amber-500" /> Clearance Level
// //                                     </span>
// //                                     <strong className="text-white text-sm wrap-break-word">{soldier.clearanceLevel || 'N/A'}</strong>
// //                                 </div>

// //                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
// //                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
// //                                         <MapPin size={12} className="text-amber-500" /> Station Location
// //                                     </span>
// //                                     <strong className="text-white text-sm wrap-break-word">{soldier.location || 'N/A'}</strong>
// //                                 </div>

// //                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
// //                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
// //                                         <Calendar size={12} className="text-amber-500" /> Enlistment Date
// //                                     </span>
// //                                     <strong className="text-white text-sm wrap-break-word">{soldier.enlistmentDate || 'N/A'}</strong>
// //                                 </div>

// //                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
// //                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
// //                                         <Hash size={12} className="text-amber-500" /> Soldier ID
// //                                     </span>
// //                                     <strong className="text-white text-sm wrap-break-word">{soldier.soldierId || 'N/A'}</strong>
// //                                 </div>
// //                             </div>

// //                             {/* Additional custom/dynamic database fields */}
// //                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
// //                                 {Object.keys(soldier).map((key) => {
// //                                     const hiddenKeys = ['_id', 'soldierId', 'accessCode', 'name', 'rank', 'unit', 'status', 'clearanceLevel', 'image', 'email', 'password', 'enlistmentDate', 'location', 'awards', 'activeAccessCode', 'codeExpiresAt', 'isCodeUsed', '__v', 'createdAt', 'updatedAt'];
// //                                     if (!hiddenKeys.includes(key) && soldier[key] !== undefined && soldier[key] !== null) {
// //                                         return (
// //                                             <div key={key} className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
// //                                                 <span className="text-amber-400 text-[10px] uppercase tracking-wider block">{key.replace(/([A-Z])/g, ' $1')}</span>
// //                                                 <strong className="text-white text-sm wrap-break-word">{String(soldier[key])}</strong>
// //                                             </div>
// //                                         );
// //                                     }
// //                                     return null;
// //                                 })}
// //                             </div>

// //                             {/* Awards & Decorations */}
// //                             {soldier.awards && soldier.awards.length > 0 && (
// //                                 <div className="pt-2">
// //                                     <span className="text-neutral-400 flex items-center gap-1.5 text-xs uppercase font-bold mb-2.5">
// //                                         <Award size={14} className="text-amber-500" /> Decorations & Honors
// //                                     </span>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {soldier.awards.map((award: string, index: number) => (
// //                                             <motion.span 
// //                                                 key={index} 
// //                                                 initial={{ opacity: 0, y: 5 }}
// //                                                 animate={{ opacity: 1, y: 0 }}
// //                                                 transition={{ delay: index * 0.1 }}
// //                                                 className="bg-[#2a2419] text-amber-300 text-[11px] px-3 py-1.5 rounded-lg border border-amber-600/30 shadow-sm"
// //                                             >
// //                                                 ★ {award}
// //                                             </motion.span>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {/* Logout / Reset Button */}
// //                             <button 
// //                                 onClick={handleLogout} 
// //                                 className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors border border-neutral-700 mt-4"
// //                             >
// //                                 Lock & Exit Session
// //                             </button>
// //                         </motion.div>
// //                     )}
// //                 </AnimatePresence>
// //             </motion.div>
// //         </div>
// //     );
// // }

// import { useState, type FormEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ShieldCheck, Lock, Award, MapPin, Calendar, Hash, AlertCircle, Crosshair } from 'lucide-react';

// interface SoldierData {
//     image?: string;
//     name: string;
//     rank: string;
//     unit: string;
//     status: string;
//     clearanceLevel: string;
//     location: string;
//     enlistmentDate: string;
//     soldierId: string;
//     awards?: string[];
//     [key: string]: any;
// }

// export default function Verify() {
//     const [soldierId, setSoldierId] = useState('');
//     const [accessCode, setAccessCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [soldier, setSoldier] = useState<SoldierData | null>(null);

//     const handleVerify = async (e: FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:5000/api/verify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ soldierId, accessCode }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Verification failed');
//             }

//             setSoldier(data.soldier || data);
//         } catch (err: any) {
//             setError(err.message || 'An unexpected error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         setSoldier(null);
//         setAccessCode('');
//         setSoldierId('');
//         setError(null);
//     };

//     const getImageUrl = (imagePath?: string) => {
//         if (!imagePath) return '';
//         if (imagePath.startsWith('http')) return imagePath;
//         return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
//     };

//     return (
//         <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden font-mono">
            
//             {/* Background Animated Tactical Elements */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
//                 <motion.div
//                     animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                     className="absolute top-1/4 left-10 text-amber-500"
//                 >
//                     <ShieldCheck size={120} />
//                 </motion.div>
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
//             </div>

//             {/* Main Interactive Card */}
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="relative z-10 max-w-2xl w-full bg-[#242018]/95 backdrop-blur-md border border-amber-600/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
//             >
//                 {/* Top Tactical Status Bar */}
//                 <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40 text-[10px] text-amber-400 tracking-widest uppercase">
//                     <span className="flex items-center gap-1.5">
//                         <Crosshair size={14} className="text-amber-500 animate-pulse" />
//                         Secure Tactical Uplink Active
//                     </span>
//                     <span>Protocol: SEC-99</span>
//                 </div>

//                 {!soldier && (
//                     <>
//                         <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-center text-amber-400 drop-shadow-md">
//                             Secure Personnel Portal
//                         </h1>
//                         <p className="text-neutral-400 text-xs text-center mb-8">
//                             Enter your assigned Army ID and single-use secure clearance code dispatched via email.
//                         </p>

//                         <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Hash size={16} />
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={soldierId}
//                                     onChange={(e) => setSoldierId(e.target.value)}
//                                     placeholder="ARMY ID (e.g. USA-9942-SV)"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Lock size={16} />
//                                 </span>
//                                 <input
//                                     type="password"
//                                     value={accessCode}
//                                     onChange={(e) => setAccessCode(e.target.value)}
//                                     placeholder="ENTER ACCESS CODE"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 font-bold px-7 py-3.5 rounded-xl transition text-black disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
//                                         Authenticating Record...
//                                     </>
//                                 ) : (
//                                     'Access Classified Profile'
//                                 )}
//                             </motion.button>
//                         </form>
//                     </>
//                 )}

//                 <AnimatePresence>
//                     {error && (
//                         <motion.div 
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="bg-red-950/80 border border-red-700/80 text-red-300 p-4 rounded-xl text-xs mb-6 text-center flex items-center justify-center gap-2 shadow-lg"
//                         >
//                             <AlertCircle size={16} className="text-red-400 shrink-0" />
//                             <span>{error}</span>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Full Soldier Profile Result Panel */}
//                 <AnimatePresence>
//                     {soldier && (
//                         <motion.div 
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             transition={{ duration: 0.4 }}
//                             className="bg-[#14120f] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-6"
//                         >
//                             {/* Header / Avatar Section */}
//                             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-neutral-800 pb-5">
//                                 {soldier.image ? (
//                                     <div className="relative shrink-0">
//                                         <img
//                                             src={getImageUrl(soldier.image)}
//                                             alt={soldier.name}
//                                             className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/60 shadow-md bg-neutral-900"
//                                         />
//                                         <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
//                                             VERIFIED
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <div className="w-24 h-24 rounded-xl bg-neutral-800 border-2 border-amber-500/30 flex items-center justify-center text-amber-500/40 text-xs text-center p-2 shrink-0">
//                                         NO IMAGE UPLOADED
//                                     </div>
//                                 )}

//                                 <div className="text-center sm:text-left space-y-1">
//                                     <h2 className="text-xl font-bold text-white tracking-wide">{soldier.name}</h2>
//                                     <p className="text-amber-400 text-xs font-semibold">{soldier.rank} — {soldier.unit}</p>
//                                     <div className="pt-1">
//                                         <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-800/80">
//                                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                                             {soldier.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Core Details Grid */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <ShieldCheck size={12} className="text-amber-500" /> Clearance Level
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.clearanceLevel || 'N/A'}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <MapPin size={12} className="text-amber-500" /> Station Location
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.location || 'N/A'}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Calendar size={12} className="text-amber-500" /> Enlistment Date
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.enlistmentDate || 'N/A'}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Hash size={12} className="text-amber-500" /> Soldier ID
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.soldierId || 'N/A'}</strong>
//                                 </div>
//                             </div>

//                             {/* Additional custom/dynamic database fields (unit, age, bloodType now included) */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
//                                 {Object.keys(soldier).map((key) => {
//                                     // Removed 'unit' from hiddenKeys so it can render if also stored separately, 
//                                     // and allowed 'age' and 'bloodType' / 'bloodGroup' to show up.
//                                     const hiddenKeys = ['_id', 'soldierId', 'accessCode', 'name', 'rank', 'status', 'clearanceLevel', 'image', 'email', 'password', 'enlistmentDate', 'location', 'awards', 'activeAccessCode', 'codeExpiresAt', 'isCodeUsed', '__v', 'createdAt', 'updatedAt'];
                                    
//                                     if (!hiddenKeys.includes(key) && soldier[key] !== undefined && soldier[key] !== null && soldier[key] !== '') {
//                                         return (
//                                             <div key={key} className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                                 <span className="text-amber-400 text-[10px] uppercase tracking-wider block">{key.replace(/([A-Z])/g, ' $1')}</span>
//                                                 <strong className="text-white text-sm wrap-break-word">{String(soldier[key])}</strong>
//                                             </div>
//                                         );
//                                     }
//                                     return null;
//                                 })}
//                             </div>

//                             {/* Awards & Decorations */}
//                             {soldier.awards && soldier.awards.length > 0 && (
//                                 <div className="pt-2">
//                                     <span className="text-neutral-400 flex items-center gap-1.5 text-xs uppercase font-bold mb-2.5">
//                                         <Award size={14} className="text-amber-500" /> Decorations & Honors
//                                     </span>
//                                     <div className="flex flex-wrap gap-2">
//                                         {soldier.awards.map((award: string, index: number) => (
//                                             <motion.span 
//                                                 key={index} 
//                                                 initial={{ opacity: 0, y: 5 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{ delay: index * 0.1 }}
//                                                 className="bg-[#2a2419] text-amber-300 text-[11px] px-3 py-1.5 rounded-lg border border-amber-600/30 shadow-sm"
//                                             >
//                                                 ★ {award}
//                                             </motion.span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Logout / Reset Button */}
//                             <button 
//                                 onClick={handleLogout} 
//                                 className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors border border-neutral-700 mt-4"
//                             >
//                                 Lock & Exit Session
//                             </button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </motion.div>
//         </div>
//     );
// }

// import { useState, type FormEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import CertificateModal from './CertificateModal';
// import { ShieldCheck, Lock, Award, MapPin, Calendar, Hash, AlertCircle, Crosshair, Home, FileBadge } from 'lucide-react';

// interface SoldierData {
//     image?: string;
//     name: string;
//     rank: string;
//     unit: string;
//     status: string;
//     clearanceLevel: string;
//     location: string; // Base U.S. Army Defense Boston MA
//     homeAddress?: string; // 102 W Flagler St, Miami, FL 33140
//     enlistmentDate: string;
//     soldierId: string;
//     awards?: string[];
//     [key: string]: any;
// }

// export default function Verify() {
//     const [soldierId, setSoldierId] = useState('');
//     const [accessCode, setAccessCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [soldier, setSoldier] = useState<SoldierData | null>(null);
//     const [showCertificate, setShowCertificate] = useState(false);

//     const handleVerify = async (e: FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:5000/api/verify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ soldierId, accessCode }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Verification failed');
//             }

//             setSoldier(data.soldier || data);
//         } catch (err: any) {
//             setError(err.message || 'An unexpected error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         setSoldier(null);
//         setAccessCode('');
//         setSoldierId('');
//         setError(null);
//     };

//     const getImageUrl = (imagePath?: string) => {
//         if (!imagePath) return '';
//         if (imagePath.startsWith('http')) return imagePath;
//         return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
//     };

//     return (
//         <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden font-mono">
            
//             {/* Background Animated Tactical Elements */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
//                 <motion.div
//                     animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                     className="absolute top-1/4 left-10 text-amber-500"
//                 >
//                     <ShieldCheck size={120} />
//                 </motion.div>
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
//             </div>

//             {/* Main Interactive Card */}
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="relative z-10 max-w-2xl w-full bg-[#242018]/95 backdrop-blur-md border border-amber-600/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
//             >
//                 {/* Top Tactical Status Bar */}
//                 <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40 text-[10px] text-amber-400 tracking-widest uppercase">
//                     <span className="flex items-center gap-1.5">
//                         <Crosshair size={14} className="text-amber-500 animate-pulse" />
//                         Secure Tactical Uplink Active
//                     </span>
//                     <span>Protocol: SEC-99</span>
//                 </div>

//                 {!soldier && (
//                     <>
//                         <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-center text-amber-400 drop-shadow-md">
//                             Secure Personnel Portal
//                         </h1>
//                         <p className="text-neutral-400 text-xs text-center mb-8">
//                             Enter your assigned Army ID and single-use secure clearance code dispatched via email.
//                         </p>

//                         <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Hash size={16} />
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={soldierId}
//                                     onChange={(e) => setSoldierId(e.target.value)}
//                                     placeholder="ARMY ID (e.g. USA-9942-SV)"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Lock size={16} />
//                                 </span>
//                                 <input
//                                     type="password"
//                                     value={accessCode}
//                                     onChange={(e) => setAccessCode(e.target.value)}
//                                     placeholder="ENTER ACCESS CODE"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 font-bold px-7 py-3.5 rounded-xl transition text-black disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
//                                         Authenticating Record...
//                                     </>
//                                 ) : (
//                                     'Access Classified Profile'
//                                 )}
//                             </motion.button>
//                         </form>
//                     </>
//                 )}

//                 <AnimatePresence>
//                     {error && (
//                         <motion.div 
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="bg-red-950/80 border border-red-700/80 text-red-300 p-4 rounded-xl text-xs mb-6 text-center flex items-center justify-center gap-2 shadow-lg"
//                         >
//                             <AlertCircle size={16} className="text-red-400 shrink-0" />
//                             <span>{error}</span>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Full Soldier Profile Result Panel */}
//                 <AnimatePresence>
//                     {soldier && (
//                         <motion.div 
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             transition={{ duration: 0.4 }}
//                             className="bg-[#14120f] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-6"
//                         >
//                             {/* Header / Avatar Section */}
//                             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-neutral-800 pb-5">
//                                 {soldier.image ? (
//                                     <div className="relative shrink-0">
//                                         <img
//                                             src={getImageUrl(soldier.image)}
//                                             alt={soldier.name}
//                                             className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/60 shadow-md bg-neutral-900"
//                                         />
//                                         <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
//                                             VERIFIED
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <div className="w-24 h-24 rounded-xl bg-neutral-800 border-2 border-amber-500/30 flex items-center justify-center text-amber-500/40 text-xs text-center p-2 shrink-0">
//                                         NO IMAGE UPLOADED
//                                     </div>
//                                 )}

//                                 <div className="text-center sm:text-left space-y-1">
//                                     <h2 className="text-xl font-bold text-white tracking-wide">{soldier.name}</h2>
//                                     <p className="text-amber-400 text-xs font-semibold">{soldier.rank} — {soldier.unit}</p>
//                                     <div className="pt-1">
//                                         <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-800/80">
//                                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                                             {soldier.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Location Banner (Current Work Posting vs. Home Address) */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#1d1914] p-4 rounded-xl border border-amber-600/30">
//                                 <div className="flex items-start gap-3">
//                                     <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
//                                         <MapPin size={16} />
//                                     </div>
//                                     <div>
//                                         <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Current Work Posting (Boston)</span>
//                                         <p className="text-xs text-white font-medium mt-0.5">{soldier.location || 'Base U.S. Army Defense Boston MA'}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-amber-900/40 pt-3 md:pt-0 md:pl-3">
//                                     <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
//                                         <Home size={16} />
//                                     </div>
//                                     <div>
//                                         <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Home Address (Miami, FL)</span>
//                                         <p className="text-xs text-white font-medium mt-0.5">{soldier.homeAddress || '102 W Flagler St, Miami, FL 33140'}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Core Details Grid */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <ShieldCheck size={12} className="text-amber-500" /> Clearance Level
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.clearanceLevel || 'N/A'}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Calendar size={12} className="text-amber-500" /> Enlistment Date
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.enlistmentDate || 'N/A'}</strong>
//                                 </div>
//                             </div>

//                             {/* Additional custom/dynamic database fields */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
//                                 {Object.keys(soldier).map((key) => {
//                                     const hiddenKeys = ['_id', 'soldierId', 'accessCode', 'name', 'rank', 'status', 'clearanceLevel', 'image', 'email', 'password', 'enlistmentDate', 'location', 'homeAddress', 'awards', 'activeAccessCode', 'codeExpiresAt', 'isCodeUsed', '__v', 'createdAt', 'updatedAt'];
                                    
//                                     if (!hiddenKeys.includes(key) && soldier[key] !== undefined && soldier[key] !== null && soldier[key] !== '') {
//                                         return (
//                                             <div key={key} className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                                 <span className="text-amber-400 text-[10px] uppercase tracking-wider block">{key.replace(/([A-Z])/g, ' $1')}</span>
//                                                 <strong className="text-white text-sm wrap-break-word">{String(soldier[key])}</strong>
//                                             </div>
//                                         );
//                                     }
//                                     return null;
//                                 })}
//                             </div>

//                             {/* Awards & Decorations */}
//                             {soldier.awards && soldier.awards.length > 0 && (
//                                 <div className="pt-2">
//                                     <span className="text-neutral-400 flex items-center gap-1.5 text-xs uppercase font-bold mb-2.5">
//                                         <Award size={14} className="text-amber-500" /> Decorations & Honors
//                                     </span>
//                                     <div className="flex flex-wrap gap-2">
//                                         {soldier.awards.map((award: string, index: number) => (
//                                             <motion.span 
//                                                 key={index} 
//                                                 initial={{ opacity: 0, y: 5 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{ delay: index * 0.1 }}
//                                                 className="bg-[#2a2419] text-amber-300 text-[11px] px-3 py-1.5 rounded-lg border border-amber-600/30 shadow-sm"
//                                             >
//                                                 ★ {award}
//                                             </motion.span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="pt-2">
//                                     <button
//                                         onClick={() => setShowCertificate(true)}
//                                         className="w-full bg-[#2a2419] hover:bg-[#382f21] text-amber-400 border border-amber-600/40 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow"
//                                     >
//                                         <FileBadge size={16} /> View / Edit Special Commendation Certificate
//                                     </button>
//                                 </div>

//                                 {/* Render the modal conditionally */}
//                             {showCertificate && soldier && (
//                                 <CertificateModal soldier={soldier} onClose={() => setShowCertificate(false)} />
//                             )}

//                             {/* Logout / Reset Button */}
//                             <button 
//                                 onClick={handleLogout} 
//                                 className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors border border-neutral-700 mt-4"
//                             >
//                                 Lock & Exit Session
//                             </button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </motion.div>
//         </div>
//     );
// }



// import { useState, type FormEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ShieldCheck, Lock, Award, MapPin, Calendar, Hash, AlertCircle, Crosshair, Home, Briefcase, Heart, DollarSign, FileBadge } from 'lucide-react';
// import CertificateModal from './CertificateModal';

// interface SoldierData {
//     image?: string;
//     name: string;
//     rank: string;
//     unit: string;
//     status: string;
//     clearanceLevel: string;
//     location: string; // Base U.S. Army Defense Boston MA (Work posting)
//     originalAddress?: string; // 102 W Flagler St, Miami, FL 33140 (Home address)
//     enlistmentDate: string;
//     soldierId: string;
//     age: number;
//     bloodType: string;
//     mos: string;
//     careerField: string;
//     maritalStatus?: string;
//     annualIncome?: string;
//     totalBenefits?: string;
//     awards?: string[];
//     [key: string]: any;
// }

// export default function Verify() {
//     const [soldierId, setSoldierId] = useState('');
//     const [accessCode, setAccessCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [soldier, setSoldier] = useState<SoldierData | null>(null);
//     const [showCertificate, setShowCertificate] = useState(false);

//     const handleVerify = async (e: FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:5000/api/verify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ soldierId, accessCode }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Verification failed');
//             }

//             setSoldier(data.soldier || data);
//         } catch (err: any) {
//             setError(err.message || 'An unexpected error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleLogout = () => {
//         setSoldier(null);
//         setAccessCode('');
//         setSoldierId('');
//         setError(null);
//         setShowCertificate(false);
//     };

//     const getImageUrl = (imagePath?: string) => {
//         if (!imagePath) return '';
//         if (imagePath.startsWith('http')) return imagePath;
//         return `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
//     };

//     return (
//         <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden font-mono">
            
//             {/* Background Animated Tactical Elements */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
//                 <motion.div
//                     animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                     className="absolute top-1/4 left-10 text-amber-500"
//                 >
//                     <ShieldCheck size={120} />
//                 </motion.div>
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
//             </div>

//             {/* Main Interactive Card */}
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="relative z-10 max-w-2xl w-full bg-[#242018]/95 backdrop-blur-md border border-amber-600/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
//             >
//                 {/* Top Tactical Status Bar */}
//                 <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40 text-[10px] text-amber-400 tracking-widest uppercase">
//                     <span className="flex items-center gap-1.5">
//                         <Crosshair size={14} className="text-amber-500 animate-pulse" />
//                         Secure Tactical Uplink Active
//                     </span>
//                     <span>Protocol: SEC-99</span>
//                 </div>

//                 {!soldier && (
//                     <>
//                         <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-center text-amber-400 drop-shadow-md">
//                             Secure Personnel Portal
//                         </h1>
//                         <p className="text-neutral-400 text-xs text-center mb-8">
//                             Enter your assigned Army ID and single-use secure clearance code dispatched via email.
//                         </p>

//                         <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Hash size={16} />
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={soldierId}
//                                     onChange={(e) => setSoldierId(e.target.value)}
//                                     placeholder="ARMY ID (e.g. USA-9942-SV)"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
//                                     <Lock size={16} />
//                                 </span>
//                                 <input
//                                     type="password"
//                                     value={accessCode}
//                                     onChange={(e) => setAccessCode(e.target.value)}
//                                     placeholder="ENTER ACCESS CODE"
//                                     className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
//                                     required
//                                 />
//                             </div>

//                             <motion.button
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 font-bold px-7 py-3.5 rounded-xl transition text-black disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
//                                         Authenticating Record...
//                                     </>
//                                 ) : (
//                                     'Access Classified Profile'
//                                 )}
//                             </motion.button>
//                         </form>
//                     </>
//                 )}

//                 <AnimatePresence>
//                     {error && (
//                         <motion.div 
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="bg-red-950/80 border border-red-700/80 text-red-300 p-4 rounded-xl text-xs mb-6 text-center flex items-center justify-center gap-2 shadow-lg"
//                         >
//                             <AlertCircle size={16} className="text-red-400 shrink-0" />
//                             <span>{error}</span>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {/* Full Soldier Profile Result Panel */}
//                 <AnimatePresence>
//                     {soldier && (
//                         <motion.div 
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.95 }}
//                             transition={{ duration: 0.4 }}
//                             className="bg-[#14120f] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-6"
//                         >
//                             {/* Header / Avatar Section */}
//                             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-neutral-800 pb-5">
//                                 {soldier.image ? (
//                                     <div className="relative shrink-0">
//                                         <img
//                                             src={getImageUrl(soldier.image)}
//                                             alt={soldier.name}
//                                             className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/60 shadow-md bg-neutral-900"
//                                         />
//                                         <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
//                                             VERIFIED
//                                         </span>
//                                     </div>
//                                 ) : (
//                                     <div className="w-24 h-24 rounded-xl bg-neutral-800 border-2 border-amber-500/30 flex items-center justify-center text-amber-500/40 text-xs text-center p-2 shrink-0">
//                                         NO IMAGE UPLOADED
//                                     </div>
//                                 )}

//                                 <div className="text-center sm:text-left space-y-1">
//                                     <h2 className="text-xl font-bold text-white tracking-wide">{soldier.name}</h2>
//                                     <p className="text-amber-400 text-xs font-semibold">{soldier.rank} — {soldier.unit}</p>
//                                     <div className="pt-1">
//                                         <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-800/80">
//                                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//                                             {soldier.status}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Location Banner */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#1d1914] p-4 rounded-xl border border-amber-600/30">
//                                 <div className="flex items-start gap-3">
//                                     <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
//                                         <MapPin size={16} />
//                                     </div>
//                                     <div>
//                                         <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Current Work Posting (Boston)</span>
//                                         <p className="text-xs text-white font-medium mt-0.5">{soldier.location}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-amber-900/40 pt-3 md:pt-0 md:pl-3">
//                                     <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
//                                         <Home size={16} />
//                                     </div>
//                                     <div>
//                                         <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Home Address (Miami, FL)</span>
//                                         <p className="text-xs text-white font-medium mt-0.5">{soldier.originalAddress || '102 W Flagler St, Miami, FL 33140'}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Schema Specific Details Grid */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <ShieldCheck size={12} className="text-amber-500" /> Clearance Level
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.clearanceLevel}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Briefcase size={12} className="text-amber-500" /> MOS
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.mos}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Briefcase size={12} className="text-amber-500" /> Career Field
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.careerField}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Calendar size={12} className="text-amber-500" /> Enlistment Date
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.enlistmentDate}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Hash size={12} className="text-amber-500" /> Age
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">Age {soldier.age}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Hash size={12} className="text-amber-500" /> Blood Type
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">Type {soldier.bloodType}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <Heart size={12} className="text-amber-500" /> Marital Status
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.maritalStatus || 'Widow'}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <DollarSign size={12} className="text-amber-500" /> Annual Income
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.annualIncome}</strong>
//                                 </div>

//                                 <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1 sm:col-span-2">
//                                     <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
//                                         <DollarSign size={12} className="text-amber-500" /> Benefits
//                                     </span>
//                                     <strong className="text-white text-sm wrap-break-word">{soldier.totalBenefits}</strong>
//                                 </div>
//                             </div>

//                             {/* Awards & Decorations */}
//                             {soldier.awards && soldier.awards.length > 0 && (
//                                 <div className="pt-2">
//                                     <span className="text-neutral-400 flex items-center gap-1.5 text-xs uppercase font-bold mb-2.5">
//                                         <Award size={14} className="text-amber-500" /> Decorations & Honors
//                                     </span>
//                                     <div className="flex flex-wrap gap-2">
//                                         {soldier.awards.map((award: string, index: number) => (
//                                             <motion.span 
//                                                 key={index} 
//                                                 initial={{ opacity: 0, y: 5 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 transition={{ delay: index * 0.1 }}
//                                                 className="bg-[#2a2419] text-amber-300 text-[11px] px-3 py-1.5 rounded-lg border border-amber-600/30 shadow-sm"
//                                             >
//                                                 ★ {award}
//                                             </motion.span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Certificate Trigger Button */}
//                             <div className="pt-2">
//                                 <button
//                                     onClick={() => setShowCertificate(true)}
//                                     className="w-full bg-[#2a2419] hover:bg-[#382f21] text-amber-400 border border-amber-600/40 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow"
//                                 >
//                                     <FileBadge size={16} /> Commanding Officer Certificate
//                                 </button>
//                             </div>

//                             {/* Logout / Reset Button */}
//                             <button 
//                                 onClick={handleLogout} 
//                                 className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors border border-neutral-700 mt-2"
//                             >
//                                 Lock & Exit Session
//                             </button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </motion.div>

//             {/* Certificate Modal Overlay Component */}
//             {showCertificate && soldier && (
//                 <CertificateModal soldier={soldier} onClose={() => setShowCertificate(false)} />
//             )}
//         </div>
//     );
// }



import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, Crosshair, Hash, Lock, AlertCircle, 
    MapPin, Home, Briefcase, Calendar, Heart, 
    DollarSign, Award, FileBadge 
} from 'lucide-react';
import CertificateModal from './CertificateModal'; // Adjust path as needed

interface SoldierData {
    image?: string;
    name: string;
    rank: string;
    unit: string;
    status: string;
    clearanceLevel: string;
    location: string; // Base U.S. Army Defense Boston MA (Work posting)
    originalAddress?: string; // 102 W Flagler St, Miami, FL 33140 (Home address)
    enlistmentDate: string;
    soldierId: string;
    age: number;
    bloodType: string;
    mos: string;
    careerField: string;
    maritalStatus?: string;
    annualIncome?: string;
    totalBenefits?: string;
    awards?: string[];
    [key: string]: any;
}

export default function Verify() {
    const [soldierId, setSoldierId] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [soldier, setSoldier] = useState<SoldierData | null>(null);
    const [showCertificate, setShowCertificate] = useState(false);
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    const handleVerify = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ soldierId, accessCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            setSoldier(data.soldier || data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setSoldier(null);
        setAccessCode('');
        setSoldierId('');
        setError(null);
        setShowCertificate(false);
    };

    const getImageUrl = (imagePath?: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        return `${API_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    return (
        <div className="relative min-h-screen w-full bg-[#1b1812] text-white p-6 md:p-12 flex flex-col items-center justify-center overflow-hidden font-mono">
            
            {/* Background Animated Tactical Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 text-amber-500"
                >
                    <ShieldCheck size={120} />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#382e21_1px,transparent_1px),linear-gradient(to_bottom,#382e21_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>
            </div>

            {/* Main Interactive Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-2xl w-full bg-[#242018]/95 backdrop-blur-md border border-amber-600/40 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
                {/* Top Tactical Status Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40 text-[10px] text-amber-400 tracking-widest uppercase">
                    <span className="flex items-center gap-1.5">
                        <Crosshair size={14} className="text-amber-500 animate-pulse" />
                        Secure Tactical Uplink Active
                    </span>
                    <span>Protocol: SEC-99</span>
                </div>

                {!soldier && (
                    <>
                        <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase mb-2 text-center text-amber-400 drop-shadow-md">
                            Secure Personnel Portal
                        </h1>
                        <p className="text-neutral-400 text-xs text-center mb-8">
                            Enter your assigned Army ID and single-use secure clearance code dispatched via email.
                        </p>

                        <form onSubmit={handleVerify} className="flex flex-col gap-4 mb-6">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
                                    <Hash size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={soldierId}
                                    onChange={(e) => setSoldierId(e.target.value)}
                                    placeholder="ARMY ID (e.g. USA-9942-SV)"
                                    className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-amber-500/60">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type="password"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    placeholder="ENTER ACCESS CODE"
                                    className="w-full bg-[#14120f] border border-amber-900/60 rounded-xl pl-10 pr-4 py-3.5 text-white tracking-widest text-xs focus:outline-none focus:border-amber-500 transition shadow-inner"
                                    required
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 font-bold px-7 py-3.5 rounded-xl transition text-black disabled:opacity-50 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                        Authenticating Record...
                                    </>
                                ) : (
                                    'Access Classified Profile'
                                )}
                            </motion.button>
                        </form>
                    </>
                )}

                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-950/80 border border-red-700/80 text-red-300 p-4 rounded-xl text-xs mb-6 text-center flex items-center justify-center gap-2 shadow-lg"
                        >
                            <AlertCircle size={16} className="text-red-400 shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Full Soldier Profile Result Panel */}
                <AnimatePresence>
                    {soldier && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#14120f] border border-amber-500/40 rounded-xl p-6 shadow-2xl relative overflow-hidden space-y-6"
                        >
                            {/* Header / Avatar Section */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-neutral-800 pb-5">
                                {soldier.image ? (
                                    <div className="relative shrink-0">
                                        <img
                                            src={getImageUrl(soldier.image)}
                                            alt={soldier.name}
                                            className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/60 shadow-md bg-neutral-900"
                                        />
                                        <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                                            VERIFIED
                                        </span>
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-xl bg-neutral-800 border-2 border-amber-500/30 flex items-center justify-center text-amber-500/40 text-xs text-center p-2 shrink-0">
                                        NO IMAGE UPLOADED
                                    </div>
                                )}

                                <div className="text-center sm:text-left space-y-1">
                                    <h2 className="text-xl font-bold text-white tracking-wide">{soldier.name}</h2>
                                    <p className="text-amber-400 text-xs font-semibold">{soldier.rank} — {soldier.unit}</p>
                                    <div className="pt-1">
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-800/80">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            {soldier.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Banner */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#1d1914] p-4 rounded-xl border border-amber-600/30">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Current Work Posting (Boston)</span>
                                        <p className="text-xs text-white font-medium mt-0.5">{soldier.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-amber-900/40 pt-3 md:pt-0 md:pl-3">
                                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 mt-0.5 shrink-0">
                                        <Home size={16} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block">Home Address (Miami, FL)</span>
                                        <p className="text-xs text-white font-medium mt-0.5">{soldier.originalAddress || '102 W Flagler St, Miami, FL 33140'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Schema Specific Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <ShieldCheck size={12} className="text-amber-500" /> Clearance Level
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.clearanceLevel}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Briefcase size={12} className="text-amber-500" /> MOS
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.mos}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Briefcase size={12} className="text-amber-500" /> Career Field
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.careerField}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Calendar size={12} className="text-amber-500" /> Enlistment Date
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.enlistmentDate}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Hash size={12} className="text-amber-500" /> Age
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">Age {soldier.age}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Hash size={12} className="text-amber-500" /> Blood Type
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">Type {soldier.bloodType}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <Heart size={12} className="text-amber-500" /> Marital Status
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.maritalStatus || 'Widow'}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <DollarSign size={12} className="text-amber-500" /> Annual Income
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.annualIncome}</strong>
                                </div>

                                <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80 flex flex-col gap-1 sm:col-span-2">
                                    <span className="text-neutral-500 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                                        <DollarSign size={12} className="text-amber-500" /> Benefits
                                    </span>
                                    <strong className="text-white text-sm wrap-break-word">{soldier.totalBenefits}</strong>
                                </div>
                            </div>

                            {/* Awards & Decorations */}
                            {soldier.awards && soldier.awards.length > 0 && (
                                <div className="pt-2">
                                    <span className="text-neutral-400 flex items-center gap-1.5 text-xs uppercase font-bold mb-2.5">
                                        <Award size={14} className="text-amber-500" /> Decorations & Honors
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {soldier.awards.map((award: string, index: number) => (
                                            <motion.span 
                                                key={index} 
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-[#2a2419] text-amber-300 text-[11px] px-3 py-1.5 rounded-lg border border-amber-600/30 shadow-sm"
                                            >
                                                ★ {award}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certificate Trigger Button */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setShowCertificate(true)}
                                    className="w-full bg-[#2a2419] hover:bg-[#382f21] text-amber-400 border border-amber-600/40 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow"
                                >
                                    <FileBadge size={16} /> Commanding Officer Certificate
                                </button>
                            </div>

                            {/* Logout / Reset Button */}
                            <button 
                                onClick={handleLogout} 
                                className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors border border-neutral-700 mt-2"
                            >
                                Lock & Exit Session
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Certificate Modal Overlay Component */}
            {showCertificate && soldier && (
                <CertificateModal soldier={soldier} onClose={() => setShowCertificate(false)} />
            )}
        </div>
    );
}