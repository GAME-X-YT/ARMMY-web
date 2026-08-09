// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Award, Printer, X, Edit3, Save, ShieldCheck } from 'lucide-react';

// interface CertificateModalProps {
//     soldier: {
//         name: string;
//         rank: string;
//         unit: string;
//         soldierId: string;
//         location?: string;
//         originalAddress?: string;
//         certificate?: {
//             title?: string;
//             description?: string;
//             issueDate?: string;
//             signedBy?: string;
//         };
//     };
//     onClose: () => void;
// }

// export default function CertificateModal({ soldier, onClose }: CertificateModalProps) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [title, setTitle] = useState(soldier.certificate?.title || 'Certificate of Special Commendation');
//     const [description, setDescription] = useState(
//         soldier.certificate?.description || 
//         'In recognition of exceptional valor, distinguished service, and unwavering commitment to operational security. Having proudly completed active deployment in Iraq and currently serving at the branch office in Boston, MA.'
//     );
//     const [signedBy, setSignedBy] = useState(soldier.certificate?.signedBy || 'Commanding Officer');
//     const [issueDate, setIssueDate] = useState(soldier.certificate?.issueDate || new Date().toLocaleDateString());

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto font-mono">
//             <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="relative max-w-3xl w-full bg-[#1b1812] border-2 border-amber-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(217,119,6,0.3)] text-white"
//             >
//                 {/* Modal Controls / Header */}
//                 <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40">
//                     <span className="flex items-center gap-2 text-amber-400 text-xs tracking-wider uppercase font-bold">
//                         <Award size={16} /> Official Document & ID Generator
//                     </span>
//                     <div className="flex items-center gap-2">
//                         <button
//                             onClick={() => setIsEditing(!isEditing)}
//                             className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-600/40 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
//                         >
//                             {isEditing ? <><Save size={14} /> Preview Mode</> : <><Edit3 size={14} /> Edit Document</>}
//                         </button>
//                         <button
//                             onClick={handlePrint}
//                             className="bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
//                         >
//                             <Printer size={14} /> Print / PDF
//                         </button>
//                         <button 
//                             onClick={onClose}
//                             className="text-neutral-400 hover:text-white p-1 rounded-lg transition"
//                         >
//                             <X size={20} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Printable Certificate & Attached ID Section */}
//                 <div id="printable-certificate" className="bg-[#fcf8f2] text-neutral-900 border-8 border-double border-amber-700 p-8 rounded-xl shadow-2xl relative overflow-hidden space-y-6">
                    
//                     {/* Watermark Logo/Shield */}
//                     <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
//                         <ShieldCheck size={350} className="text-amber-900" />
//                     </div>

//                     <div className="relative z-10 text-center space-y-5">
//                         {/* Header */}
//                         <div className="space-y-1">
//                             <span className="text-[10px] tracking-[0.3em] uppercase text-amber-800 font-bold block">United States Department of the Army</span>
//                             <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 uppercase tracking-wide">
//                                 {isEditing ? (
//                                     <input 
//                                         type="text" 
//                                         value={title} 
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         className="w-full bg-white/80 border border-amber-700/50 text-center text-xl font-serif py-1 rounded"
//                                     />
//                                 ) : title}
//                             </h2>
//                             <div className="w-32 h-0.5 bg-amber-700 mx-auto mt-2"></div>
//                         </div>

//                         {/* Recipient Statement */}
//                         <div className="space-y-2">
//                             <p className="text-xs italic text-neutral-600">This official document is proudly presented to</p>
//                             <h3 className="text-3xl font-serif font-black text-amber-950 tracking-wide underline decoration-amber-600/40 decoration-1 underline-offset-8">
//                                 {soldier.name}
//                             </h3>
//                             <p className="text-xs font-bold text-neutral-700 uppercase tracking-widest">
//                                 {soldier.rank} — {soldier.unit} | ID: {soldier.soldierId}
//                             </p>
//                         </div>

//                         {/* Description / Custom Text */}
//                         <div className="max-w-xl mx-auto px-4">
//                             {isEditing ? (
//                                 <textarea 
//                                     value={description} 
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     rows={3}
//                                     className="w-full bg-white/80 border border-amber-700/50 text-xs p-2 rounded text-neutral-800 font-sans"
//                                 />
//                             ) : (
//                                 <p className="text-xs md:text-sm font-serif leading-relaxed text-neutral-800">
//                                     {description}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Duty Posts & Records Stamp */}
//                         <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2 text-[11px] border-t border-amber-900/20 text-neutral-700">
//                             <div>
//                                 <span className="font-bold block text-amber-900">Current Duty Post (Boston):</span>
//                                 <span>{soldier.location || 'Boston, MA'}</span>
//                             </div>
//                             <div>
//                                 <span className="font-bold block text-amber-900">Active Deployment:</span>
//                                 <span>Iraq</span>
//                             </div>
//                         </div>

//                         {/* Signatures & Date Footer */}
//                         <div className="flex justify-between items-end pt-4 px-6 text-xs border-t border-amber-900/10">
//                             <div className="text-left space-y-1">
//                                 <span className="text-[10px] text-neutral-500 uppercase block">Date Issued</span>
//                                 {isEditing ? (
//                                     <input 
//                                         type="text" 
//                                         value={issueDate} 
//                                         onChange={(e) => setIssueDate(e.target.value)}
//                                         className="bg-white border border-amber-700/40 px-2 py-1 text-xs rounded"
//                                     />
//                                 ) : (
//                                     <strong className="font-serif text-neutral-900">{issueDate}</strong>
//                                 )}
//                             </div>

//                             <div className="text-center space-y-1">
//                                 <div className="font-serif italic text-base text-amber-950 font-bold">Col. J. Harrison</div>
//                                 <div className="w-40 h-0.5 bg-neutral-900"></div>
//                                 {isEditing ? (
//                                     <input 
//                                         type="text" 
//                                         value={signedBy} 
//                                         onChange={(e) => setSignedBy(e.target.value)}
//                                         className="bg-white border border-amber-700/40 px-2 py-0.5 text-[10px] rounded text-center w-full"
//                                     />
//                                 ) : (
//                                     <span className="text-[10px] text-neutral-600 uppercase tracking-wider block">{signedBy}</span>
//                                 )}
//                             </div>
//                         </div>

//                         {/* BOTTOM ATTACHED ID & US ARMY SEAL SECTION */}
//                         <div className="mt-8 pt-4 border-t-2 border-dashed border-amber-800/40 flex flex-col sm:flex-row items-center justify-between bg-[#f4ece1] p-4 rounded-lg">
//                             <div className="flex items-center gap-3">
//                                 {/* U.S. Army Emblem / Logo Representation */}
//                                 <div className="w-12 h-12 bg-amber-900 text-amber-200 rounded-full flex items-center justify-center font-black text-xs border-2 border-amber-600 shadow-inner shrink-0">
//                                     USA
//                                 </div>
//                                 <div className="text-left">
//                                     <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900 block">U.S. Army Official Credential</span>
//                                     <span className="text-[11px] text-neutral-600 font-sans">Verified Security Clearance Record</span>
//                                 </div>
//                             </div>

//                             <div className="text-right mt-3 sm:mt-0">
//                                 <span className="text-[10px] text-neutral-500 block uppercase">Authenticated By</span>
//                                 <span className="font-serif font-bold text-amber-950 text-xs tracking-wider">U.S. Army Command</span>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* Footer close button */}
//                 <div className="mt-6 flex justify-end">
//                     <button
//                         onClick={onClose}
//                         className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition border border-neutral-700"
//                     >
//                         Close Document Viewer
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }


import { motion } from 'framer-motion';
import { Award, Printer, X, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
    soldier: {
        name: string;
        rank: string;
        unit: string;
        soldierId: string;
        location?: string;
        originalAddress?: string;
        certificate?: {
            title?: string;
            description?: string;
            issueDate?: string;
            signedBy?: string;
            logo?: string;
        };
    };
    onClose: () => void;
}

export default function CertificateModal({ soldier, onClose }: CertificateModalProps) {
    // Default fallback values (controlled from the database / admin dashboard)
    const title = soldier.certificate?.title || 'Certificate of Special Commendation';
    const description = soldier.certificate?.description || 
        'In recognition of exceptional valor, distinguished service, and unwavering commitment to operational security. Having proudly completed active deployment in Iraq and currently serving at the branch office in Boston, MA.';
    const signedBy = soldier.certificate?.signedBy || 'Major Gen. Jeff M. Farris';
    const issueDate = soldier.certificate?.issueDate || new Date().toLocaleDateString();

    

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto font-mono">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-3xl w-full bg-[#1b1812] border-2 border-amber-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(217,119,6,0.3)] text-white"
            >
                {/* Modal Controls / Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-900/40">
                    <span className="flex items-center gap-2 text-amber-400 text-xs tracking-wider uppercase font-bold">
                        <Award size={16} /> Official Document Record
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
                        >
                            <Printer size={14} /> Print / PDF
                        </button>
                        <button 
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white p-1 rounded-lg transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Printable Certificate & Attached ID Section */}
                <div id="printable-certificate" className="bg-[#fcf8f2] text-neutral-900 border-8 border-double border-amber-700 p-8 rounded-xl shadow-2xl relative overflow-hidden space-y-6">
                    
                    {/* Watermark Logo/Shield */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <ShieldCheck size={350} className="text-amber-900" />
                    </div>

                    {/* OFFICIAL STAMP WATERMARK OVERLAY */}
                    <div className="absolute right-12 bottom-36 md:bottom-28 z-20 pointer-events-none -rotate-12 opacity-85">
                        <div className="border-4 border-red-700/80 rounded-xl px-4 py-2 text-red-700/80 font-black tracking-widest text-center shadow-sm bg-red-500/5 backdrop-blur-[1px]">
                            <div className="text-[10px] uppercase font-sans">U.S. Department of the Army</div>
                            <div className="text-sm md:text-base font-serif uppercase">APPROVED & STAMPED</div>
                            <div className="text-[9px] tracking-normal font-mono">SEC-CLEARANCE VERIFIED</div>
                        </div>
                    </div>

                    <div className="relative z-10 text-center space-y-5">
                        {/* Header */}
                        <div className="space-y-1">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-800 font-bold block">United States Department of the Army</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 uppercase tracking-wide">
                                {title}
                            </h2>
                            <div className="w-32 h-0.5 bg-amber-700 mx-auto mt-2"></div>
                        </div>

                        {/* Recipient Statement */}
                        <div className="space-y-2">
                            <p className="text-xs italic text-neutral-600">This official document is proudly presented to</p>
                            <h3 className="text-3xl font-serif font-black text-amber-950 tracking-wide underline decoration-amber-600/40 decoration-1 underline-offset-8">
                                {soldier.name}
                            </h3>
                            <p className="text-xs font-bold text-neutral-700 uppercase tracking-widest">
                                {soldier.rank} — {soldier.unit} | ID: {soldier.soldierId}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="max-w-xl mx-auto px-4">
                            <p className="text-xs md:text-sm font-serif leading-relaxed text-neutral-800">
                                {description}
                            </p>
                        </div>

                        {/* Duty Posts & Records Stamp */}
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2 text-[11px] border-t border-amber-900/20 text-neutral-700">
                            <div>
                                <span className="font-bold block text-amber-900">Current Duty Post (Boston):</span>
                                <span>{soldier.location || 'Boston, MA'}</span>
                            </div>
                            <div>
                                <span className="font-bold block text-amber-900">Active Deployment:</span>
                                <span>Iraq</span>
                            </div>
                        </div>

                        {/* Signatures & Date Footer */}
                        <div className="flex justify-between items-end pt-4 px-6 text-xs border-t border-amber-900/10">
                            <div className="text-left space-y-1">
                                <span className="text-[10px] text-neutral-500 uppercase block">Date Issued</span>
                                <strong className="font-serif text-neutral-900">{issueDate}</strong>
                            </div>

                            <div className="text-center space-y-1">
                                <div className="font-serif italic text-base text-amber-950 font-bold">Col. J. Harrison</div>
                                <div className="w-40 h-0.5 bg-neutral-900"></div>
                                <span className="text-[10px] text-neutral-600 uppercase tracking-wider block">{signedBy}</span>
                            </div>
                        </div>

                        {/* BOTTOM ATTACHED ID & US ARMY EMBLEM SECTION */}
                        <div className="mt-8 pt-4 border-t-2 border-dashed border-amber-800/40 flex flex-col sm:flex-row items-center justify-between bg-[#f4ece1] p-4 rounded-lg relative z-10">
                            <div className="flex items-center gap-3">
                                {/* U.S. Army Official Logo Badge */}
                                <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center border-2 border-amber-600 shadow-inner shrink-0 overflow-hidden">
                                    <img 
                                        src="https://i.pinimg.com/236x/5c/6a/46/5c6a4645ac30f4d23ff4b5b396ae5bd2.jpg" 
                                        alt="U.S. Army Seal" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-900 block">U.S. Army Official Credential</span>
                                    <span className="text-[11px] text-neutral-600 font-sans">Verified Security Clearance Record</span>
                                </div>
                            </div>

                            <div className="text-right mt-3 sm:mt-0">
                                <span className="text-[10px] text-neutral-500 block uppercase">Authenticated By</span>
                                <span className="font-serif font-bold text-amber-950 text-xs tracking-wider">{signedBy}</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer close button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition border border-neutral-700"
                    >
                        Close Document Viewer
                    </button>
                </div>
            </motion.div>
        </div>
    );
}