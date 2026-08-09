


// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Home, ShieldCheck, FileText, LogIn, User, Search, Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showSearch, setShowSearch] = useState(false);
//     const [showNavbar, setShowNavbar] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);
//     const navRef = useRef<HTMLDivElement>(null);

//     // Auth Modal states
//     const [showAuthModal, setShowAuthModal] = useState(false);
//     const [soldierId, setSoldierId] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const navigate = useNavigate();
//     const location = useLocation();
//     const currentUser = localStorage.getItem('militaryUser');

//     // Hide/Show navbar on scroll direction
//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;
//             if (currentScrollY > lastScrollY && currentScrollY > 100) {
//                 setShowNavbar(false);
//             } else {
//                 setShowNavbar(true);
//             }
//             setLastScrollY(currentScrollY);
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [lastScrollY]);

//     const navLinks = [
//         { name: "Home", path: "/", icon: <Home size={16} /> },
//         { name: "Verify Status", path: "/verify", icon: <ShieldCheck size={16} /> },
//         { name: "About", path: "/about", icon: <FileText size={16} /> },
//         { name: "Sign In", path: "/login", icon: <LogIn size={16} /> },
//         { name: "Profile", path: "/AdminDashboard", icon: <User size={16} /> },
//     ];

//     const handleNavClick = (e: React.MouseEvent, path: string) => {
//         if (path === '/AdminDashboard') {
//             e.preventDefault();
//             if (currentUser) {
//                 navigate('/AdminDashboard');
//             } else {
//                 setShowAuthModal(true);
//             }
//         }
//     };

//     const handleAuthSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const res = await fetch('http://localhost:5000/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ soldierId, password })
//             });
//             const data = await res.json();

//             if (!res.ok || !data.success) {
//                 throw new Error(data.message || 'Invalid credentials');
//             }

//             localStorage.setItem('militaryUser', JSON.stringify(data.user));
//             setShowAuthModal(false);
//             navigate('/AdminDashboard');
//         } catch (err: any) {
//             setError(err.message || 'Authentication error.');
//         }
//     };

//     return (
//         <>
//             <motion.nav
//                 ref={navRef}
//                 initial={{ y: -100, x: "-50%" }}
//                 animate={{ y: showNavbar ? 0 : -120, x: "-50%" }}
//                 transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//                 className="fixed left-1/2 z-50 w-[94%] max-w-7xl mt-4"
//             >
//                 <div className="backdrop-blur-2xl bg-[#1E2229] border border-amber-600/30 shadow-2xl rounded-[2.5rem] text-white">
//                     <div className="px-6 py-3 flex justify-between items-center">
                    
//                         {/* Military Logo Section */}
//                         <Link to="/" className="flex items-center space-x-3 group">
//                             <motion.div
//                                 animate={{ rotate: [0, 10, -10, 0] }}
//                                 transition={{ duration: 5, repeat: Infinity }}
//                                 className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-500/50 flex items-center justify-center shadow-inner"
//                             >
//                                 <span className="text-amber-400 font-bold text-base">★</span>
//                             </motion.div>
//                             <div>
//                                 <span className="font-extrabold tracking-widest text-sm block uppercase text-zinc-100">U.S. Army</span>
//                                 <span className="text-[9px] text-amber-400 font-semibold tracking-[0.2em] uppercase block">Verification</span>
//                             </div>
//                         </Link>

//                         {/* Desktop Menu */}
//                         <ul className="hidden lg:flex items-center space-x-2">
//                             {navLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <Link
//                                         to={link.path}
//                                         onClick={(e) => handleNavClick(e, link.path)}
//                                         className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider transition-all duration-300
//                                             ${location.pathname === link.path 
//                                                 ? "text-amber-400 bg-emerald-900/40 border border-amber-500/30 shadow-sm" 
//                                                 : "text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60"}`}
//                                     >
//                                         <span className="text-amber-500">{link.icon}</span>
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>

//                         {/* Action Area */}
//                         <div className="flex items-center space-x-2">
//                             <button 
//                                 onClick={() => setShowSearch(!showSearch)}
//                                 className="p-2.5 text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all"
//                             >
//                                 <Search size={20} />
//                             </button>
                            
//                             <button
//                                 onClick={() => setIsOpen(!isOpen)}
//                                 className="lg:hidden p-2.5 text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all"
//                             >
//                                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Dynamic Search Bar Drawer */}
//                     <AnimatePresence>
//                         {showSearch && (
//                             <motion.div 
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="px-6 pb-4 border-t border-amber-600/20 pt-4"
//                             >
//                                 <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-2">
//                                     <Search size={18} className="text-zinc-400 mr-2" />
//                                     <input 
//                                         type="text" 
//                                         placeholder="Search records, serial numbers, or clearance status..." 
//                                         className="bg-transparent w-full text-sm text-white focus:outline-none placeholder-zinc-500"
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     {/* Mobile Slide-down Menu */}
//                     <AnimatePresence>
//                         {isOpen && (
//                             <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="lg:hidden bg-zinc-900/90 border-t border-amber-600/20 overflow-hidden rounded-b-[2.5rem]"
//                             >
//                                 <div className="grid grid-cols-2 gap-3 p-6">
//                                     {navLinks.map((link) => (
//                                         <Link
//                                             key={link.name}
//                                             to={link.path}
//                                             onClick={(e) => {
//                                                 setIsOpen(false);
//                                                 handleNavClick(e, link.path);
//                                             }}
//                                             className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-zinc-950/60 backdrop-blur-md shadow-sm border border-zinc-800 text-zinc-200 hover:border-amber-500/40 transition-all"
//                                         >
//                                             <span className="text-amber-500">{link.icon}</span>
//                                             <span className="text-[10px] font-bold uppercase tracking-widest text-center">{link.name}</span>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </motion.nav>

//             {/* POPUP MODAL FOR MILITARY LOGIN */}
//             {showAuthModal && (
//                 <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
//                     <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 md:p-8 relative shadow-2xl">
//                         <button 
//                             onClick={() => setShowAuthModal(false)}
//                             className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm"
//                         >
//                             ✕
//                         </button>

//                         <div className="text-center mb-6">
//                             <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
//                                 Restricted Portal
//                             </span>
//                             <h2 className="text-xl font-black uppercase tracking-wider text-white mt-2">
//                                 Military Personnel Only
//                             </h2>
//                             <p className="text-xs text-neutral-400 mt-1">
//                                 Enter your assigned Soldier ID to access the dashboard/profile.
//                             </p>
//                         </div>

//                         <form onSubmit={handleAuthSubmit} className="space-y-4"  autoComplete="off">
//                             <div>
//                                 <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Soldier ID</label>
//                                 <input
//                                     type="text"
//                                     value={soldierId}
//                                     onChange={(e) => setSoldierId(e.target.value)}
//                                     placeholder="Enter Soldier ID"
//                                     required
//                                     autoComplete="off"
//                                     name="random_soldier_id_field"
//                                     className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500 uppercase"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Passcode / Password</label>
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="••••••••"
//                                     required
//                                     autoComplete="new-password" // Stops browsers from auto-populating saved passwords
//                                     name="random_password_field"
//                                     className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-amber-500"
//                                 />
//                             </div>

//                             <button 
//                                 type="submit"
//                                 className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20 mt-2"
//                             >
//                                 Authorize Access
//                             </button>

//                             {error && <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-[11px] text-center">{error}</div>}
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, ShieldCheck, FileText, LogIn, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileModal from '../Page/ProfileModal';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);

    // Auth Modal state
    const [showAuthModal, setShowAuthModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = localStorage.getItem('militaryUser');

    // Hide/Show navbar on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "Home", path: "/", icon: <Home size={16} /> },
        { name: "Verify Status", path: "/verify", icon: <ShieldCheck size={16} /> },
        { name: "About", path: "/about", icon: <FileText size={16} /> },
        { name: "Sign In", path: "/login", icon: <LogIn size={16} /> },
        { name: "Profile", path: "/AdminDashboard", icon: <User size={16} /> },
    ];

    // Handles clicking both "Sign In" and "Profile"
    const handleNavClick = (e: React.MouseEvent, path: string) => {
        if (path === '/AdminDashboard' || path === '/login') {
            e.preventDefault();
            if (currentUser) {
                navigate('/AdminDashboard'); // Already logged in, go straight to profile
            } else {
                setShowAuthModal(true); // Pop up the secure login container via ProfileModal
            }
        }
    };

    return (
        <>
            <motion.nav
                ref={navRef}
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: showNavbar ? 0 : -120, x: "-50%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 z-50 w-[94%] max-w-7xl mt-4"
            >
                <div className="backdrop-blur-2xl bg-[#1E2229] border border-amber-600/30 shadow-2xl rounded-[2.5rem] text-white">
                    <div className="px-6 py-3 flex justify-between items-center">
                    
                        {/* Military Logo Section */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-500/50 flex items-center justify-center shadow-inner"
                            >
                                <span className="text-amber-400 font-bold text-base">★</span>
                            </motion.div>
                            <div>
                                <span className="font-extrabold tracking-widest text-sm block uppercase text-zinc-100">U.S. Army</span>
                                <span className="text-[9px] text-amber-400 font-semibold tracking-[0.2em] uppercase block">Verification</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={(e) => handleNavClick(e, link.path)}
                                        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider transition-all duration-300
                                            ${location.pathname === link.path 
                                                ? "text-amber-400 bg-emerald-900/40 border border-amber-500/30 shadow-sm" 
                                                : "text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60"}`}
                                    >
                                        <span className="text-amber-500">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Action Area */}
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2.5 text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all"
                            >
                                <Search size={20} />
                            </button>
                            
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2.5 text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Search Bar Drawer */}
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-4 border-t border-amber-600/20 pt-4"
                            >
                                <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-2">
                                    <Search size={18} className="text-zinc-400 mr-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Search records, serial numbers, or clearance status..." 
                                        className="bg-transparent w-full text-sm text-white focus:outline-none placeholder-zinc-500"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Slide-down Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="lg:hidden bg-zinc-900/90 border-t border-amber-600/20 overflow-hidden rounded-b-[2.5rem]"
                            >
                                <div className="grid grid-cols-2 gap-3 p-6">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={(e) => {
                                                setIsOpen(false);
                                                handleNavClick(e, link.path);
                                            }}
                                            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-zinc-950/60 backdrop-blur-md shadow-sm border border-zinc-800 text-zinc-200 hover:border-amber-500/40 transition-all"
                                        >
                                            <span className="text-amber-500">{link.icon}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">{link.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* EXTERNAL PROFILE MODAL COMPONENT */}
            <ProfileModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginSuccess={(user) => {
                    localStorage.setItem('militaryUser', JSON.stringify(user));
                    setShowAuthModal(false);
                    navigate('/AdminDashboard');
                }}
            />
        </>
    );
}