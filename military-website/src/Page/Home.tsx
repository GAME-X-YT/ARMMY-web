// // import { Link } from 'react-router-dom';
// // import Navbar from '../components/Navbar';
// // import Footer from '../components/Footer';
// // import { ShieldExclamationIcon, CheckBadgeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// // export default function Home() {
// //     return (
// //         <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
// //             {/* Header / Navbar */}
// //             <Navbar />

// //             {/* Hero Section */}
// //             <main className="grow">
// //                 <div className="bg-linear-to-b from-green-950 to-green-900 text-white py-20 px-4 text-center">
// //                     <div className="max-w-3xl mx-auto space-y-6">
// //                         <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full uppercase font-bold tracking-widest inline-block">
// //                             Official Verification Gateway
// //                         </span>
// //                         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
// //                             Military Status & Clearance Verification
// //                         </h1>
// //                         <p className="text-lg text-zinc-300">
// //                             Secure, real-time authentication portal for active duty, reserve, and veteran records verification.
// //                         </p>
// //                         <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
// //                             <Link 
// //                                 to="/verify" 
// //                                 className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition"
// //                             >
// //                                 Start Verification
// //                             </Link>
// //                             <Link 
// //                                 to="/about" 
// //                                 className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold px-8 py-3 rounded-lg transition"
// //                             >
// //                                 Learn More
// //                             </Link>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Features / Security Section */}
// //                 <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
// //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 text-center space-y-3">
// //                         <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-green-800">
// //                             <CheckBadgeIcon className="w-6 h-6" />
// //                         </div>
// //                         <h3 className="font-bold text-lg">Instant Credentials</h3>
// //                         <p className="text-sm text-zinc-600">Retrieve authenticated digital certificates instantly upon successful record matching.</p>
// //                     </div>

// //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 text-center space-y-3">
// //                         <div className="bg-amber-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-amber-800">
// //                             <LockClosedIcon className="w-6 h-6" />
// //                         </div>
// //                         <h3 className="font-bold text-lg">End-to-End Encryption</h3>
// //                         <p className="text-sm text-zinc-600">Built with maximum security protocols to safeguard sensitive Department of Defense data.</p>
// //                     </div>

// //                     <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 text-center space-y-3">
// //                         <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-blue-800">
// //                             <ShieldExclamationIcon className="w-6 h-6" />
// //                         </div>
// //                         <h3 className="font-bold text-lg">Multi-Factor Auth</h3>
// //                         <p className="text-sm text-zinc-600">Strict OTP verification steps ensure unauthorized parties cannot access profile histories.</p>
// //                     </div>
// //                 </div>
// //             </main>

// //             {/* Footer */}
// //             <Footer />
// //         </div>
// //     );
// // }

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const militaryStatements = [
//     { 
//         main: "WE FIGHT. TILL DEATH", 
//         sub: "Unwavering commitment and supreme dedication to defending our sovereign territory." 
//     },
//     { 
//         main: "WE GIVE OUR LIFE TO PROTECT OUR PEOPLE", 
//         sub: "Bound by honor to stand as an impenetrable shield for every citizen." 
//     },
//     { 
//         main: "THE PEACE OF OUR COUNTY IS OUR ONLY JOY", 
//         sub: "Securing national stability and freedom through absolute vigilance." 
//     },
// ];

// const soldierFeatures = [
//     {
//         title: "Standard Combat Uniform",
//         category: "Uniform Designation",
//         name: "OCP (Operational Camouflage Pattern)",
//         description: "Scorpion W2 camouflage engineered for multi-environment concealment and tactical performance.",
//         icon: <Award className="w-5 h-5 text-amber-400" />
//     },
//     {
//         title: "Primary Infantry Rifle",
//         category: "Weaponry System",
//         name: "M4A1 Carbine 5.56mm",
//         description: "Lightweight, gas-operated, air-cooled, magazine-fed shoulder weapon built for close quarters and medium-range supremacy.",
//         icon: <Crosshair className="w-5 h-5 text-amber-400" />
//     },
// ];

// const announcements = [
//     {
//         date: "JULY 2026",
//         title: "Global Defense Readiness Drill",
//         summary: "Mandatory tactical evaluations scheduled for all active-duty battalions starting next week."
//     },
//     {
//         date: "SEC-OPS",
//         title: "Biometric Clearance Update",
//         summary: "New encrypted multi-factor authentication protocols are now live across all secure personnel terminals."
//     }
// ];

// export default function Home() {
//     const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

//     // Header Text Rotation Logic (Changes every 4.5 seconds)
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentStatementIndex((prev) => (prev + 1) % militaryStatements.length);
//         }, 4500);
//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
//             {/* Navbar */}
//             <Navbar />

//             <main className="grow">
//                 {/* Hero Section with Background Image & Rotating Statements */}
//                 <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
                    
//                     {/* Background Image with Dark Overlay */}
//                     <div className="absolute inset-0 z-0">
//                         <img 
//                             src="https://i.pinimg.com/1200x/3b/bc/b3/3bbcb3ffb207b4c8360f80422d8a6f3c.jpg" 
//                             alt="Military Background" 
//                             className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
//                         />
//                         <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
//                     </div>

//                     <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
//                         {/* Left Side: Rotating Statements (Centered on mobile, Left-aligned on large screens) */}
//                         <div className="lg:col-span-7 text-center lg:text-left space-y-6">
//                             <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full uppercase font-extrabold tracking-[0.3em] inline-block">
//                                 Official Defense Portal
//                             </span>

//                             <div className="min-h-40 sm:min-h-45 flex flex-col justify-center">
//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={currentStatementIndex}
//                                         initial={{ opacity: 0, y: 30 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -30 }}
//                                         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                                     >
//                                         <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-white drop-shadow-md">
//                                             {militaryStatements[currentStatementIndex].main}
//                                         </h1>
//                                         <p className="text-zinc-300 text-base sm:text-lg font-light tracking-wide max-w-xl mx-auto lg:mx-0">
//                                             {militaryStatements[currentStatementIndex].sub}
//                                         </p>
//                                     </motion.div>
//                                 </AnimatePresence>
//                             </div>

//                             <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//                                 <Link 
//                                     to="/verify" 
//                                     className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
//                                 >
//                                     Verify Status <ArrowRight size={18} />
//                                 </Link>
//                                 <Link 
//                                     to="/login" 
//                                     className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center uppercase tracking-wider text-sm backdrop-blur-md"
//                                 >
//                                     Secure Access
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Right Side: Something Nice (Tactical Status Card Widget) */}
//                         <div className="lg:col-span-5 flex justify-center">
//                             <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
//                                 <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                                
//                                 <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
//                                     <div className="flex items-center space-x-3">
//                                         <div className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-500/50 flex items-center justify-center">
//                                             <ShieldCheck className="text-amber-400 w-5 h-5" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-sm tracking-wide">SECURE GATEWAY</h3>
//                                             <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">● System Active</span>
//                                         </div>
//                                     </div>
//                                     <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md font-mono">DEFCON 4</span>
//                                 </div>

//                                 <div className="py-6 space-y-4">
//                                     <div className="flex items-start space-x-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
//                                         <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
//                                         <div>
//                                             <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Real-Time Authentication</h4>
//                                             <p className="text-xs text-zinc-400 mt-1">Instant validation protocols for active duty records and service credentials.</p>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-start space-x-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
//                                         <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
//                                         <div>
//                                             <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Enforced Multi-Factor Security</h4>
//                                             <p className="text-xs text-zinc-400 mt-1">Protected by rigorous 60-second OTP validation to eliminate unauthorized entries.</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <Link 
//                                     to="/verify" 
//                                     className="block text-center w-full py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg transition"
//                                 >
//                                     Access Clearance Portal
//                                 </Link>
//                             </div>
//                         </div>

//                     </div>
//                 </section>
//                 {/* Showroom Section: Announcements & Soldier Features (Uniform & Weaponry) */}
//                 <section className="py-20 bg-zinc-900/40 border-t border-zinc-800/80 relative">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
//                         <div className="text-center max-w-2xl mx-auto mb-16">
//                             <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
//                                 Tactical Showroom
//                             </span>
//                             <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-4 text-white">
//                                 Intelligence & Gear Manifest
//                             </h2>
//                             <p className="text-zinc-400 text-sm mt-2">
//                                 Official command dispatches alongside standard issue equipment specification registers.
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
//                             {/* Left Side: Official Announcements */}
//                             <div className="lg:col-span-5 bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
//                                 <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-800">
//                                     <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
//                                         <Megaphone size={20} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Official Announcements</h3>
//                                         <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">High Command Broadcasts</span>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-6">
//                                     {announcements.map((item, idx) => (
//                                         <div key={idx} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition">
//                                             <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
//                                                 {item.date}
//                                             </span>
//                                             <h4 className="font-bold text-sm uppercase tracking-wide mt-2 text-zinc-100">{item.title}</h4>
//                                             <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.summary}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-8 pt-4 border-t border-zinc-800/80 text-center">
//                                     <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 transition flex items-center justify-center gap-1">
//                                         View All Dispatches <ArrowRight size={14} />
//                                     </Link>
//                                 </div>
//                             </div>

//                             {/* Right Side: Soldier Features & Services (Uniform Names & Weapon) */}
//                             <div className="lg:col-span-7 bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
//                                 <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-800">
//                                     <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
//                                         <ShieldCheck size={20} />
//                                     </div>
//                                     <div>
//                                         <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Soldier Features & Equipment</h3>
//                                         <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Standard Issue Manifest</span>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {soldierFeatures.map((feat, idx) => (
//                                         <div key={idx} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition">
//                                             <div>
//                                                 <div className="flex items-center justify-between mb-3">
//                                                     <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
//                                                         {feat.category}
//                                                     </span>
//                                                     <div className="p-2 rounded-lg bg-zinc-800">
//                                                         {feat.icon}
//                                                     </div>
//                                                 </div>
//                                                 <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-1">{feat.title}</h4>
//                                                 <h5 className="font-bold text-sm text-white">{feat.name}</h5>
//                                                 <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{feat.description}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="mt-8 bg-gradient-to-r from-amber-950/30 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
//                                     <div>
//                                         <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-200">Need Complete Registry Specifications?</h4>
//                                         <p className="text-xs text-zinc-400 mt-0.5">Explore full tactical databases and service guidelines.</p>
//                                     </div>
//                                     <Link 
//                                         to="/wardrobe" 
//                                         className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition shrink-0"
//                                     >
//                                         Explore Gear
//                                     </Link>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </section>
//             </main>

//             {/* Footer */}
//             <Footer />
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Megaphone, Crosshair, Award, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const militaryStatements = [
    { 
        main: "WE FIGHT. TILL DEATH", 
        sub: "Unwavering commitment and supreme dedication to defending our sovereign territory." 
    },
    { 
        main: "WE GIVE OUR LIFE TO PROTECT OUR PEOPLE", 
        sub: "Bound by honor to stand as an impenetrable shield for every citizen." 
    },
    { 
        main: "THE PEACE OF OUR COUNTY IS OUR ONLY JOY", 
        sub: "Securing national stability and freedom through absolute vigilance." 
    },
];

const soldierFeatures = [
    {
        title: "Standard Combat Uniform",
        category: "Uniform Designation",
        name: "OCP (Operational Camouflage Pattern)",
        description: "Scorpion W2 camouflage engineered for multi-environment concealment and tactical performance.",
        icon: <Award className="w-5 h-5 text-amber-400" />
    },
    {
        title: "Primary Infantry Rifle",
        category: "Weaponry System",
        name: "M4A1 Carbine 5.56mm",
        description: "Lightweight, gas-operated, air-cooled, magazine-fed shoulder weapon built for close quarters and medium-range supremacy.",
        icon: <Crosshair className="w-5 h-5 text-amber-400" />
    },
];

const announcements = [
    {
        date: "JULY 2026",
        title: "Global Defense Readiness Drill",
        summary: "Mandatory tactical evaluations scheduled for all active-duty battalions starting next week."
    },
    {
        date: "SEC-OPS",
        title: "Biometric Clearance Update",
        summary: "New encrypted multi-factor authentication protocols are now live across all secure personnel terminals."
    }
];

const pastHeroes = [
    {
        name: "George Washington",
        role: "General of the Armies",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn4lQWJI5Si3utpDA2iPoRo9YghKNBfEX1zgLRKuWEs7p79XoWTWYPqopriNO__A4GRc8otEat0rtFs5p_rUNc4mnJadh1n-YA2qDl4SxP&s=10",
        story: "Led the Continental Army to victory in the Revolutionary War and established the foundation of our sovereign nation through unparalleled grit and strategic leadership.",
        tribute: "Saluting the Father of Our Defense Forces."
    },
    {
        name: "Audie Murphy",
        role: "WWII Combat Legend",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Audie_Murphy.jpg",
        story: "The most decorated American combat soldier of World War II, who single-handedly held off an entire company of German soldiers atop a burning tank destroyer.",
        tribute: "Your unmatched bravery echoes through eternity."
    },
    {
        name: "Alvin York",
        role: "WWI Medal of Honor Hero",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Alvin_C._York_1919.jpg",
        story: "Famously silenced 32 machine guns, killed 28 enemy soldiers, and captured 132 prisoners almost single-handedly in the Argonne Forest during World War I.",
        tribute: "A legendary testament to duty and supreme courage."
    },
    {
        name: "Desmond Doss",
        role: "WWII Combat Medic",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMszDwdYVB9NfS2IC6oJx694F9qGuTaKu6wSGxWq5En3BYFQMe78WCCu7M&s=10",
        story: "A conscientious objector and combat medic who saved 75 wounded soldiers under heavy fire at Hacksaw Ridge in WWII without ever carrying a weapon.",
        tribute: "Honoring a hero who fought to save lives, not take them."
    },
    {
        name: "Douglas MacArthur",
        role: "General of the Army",
        image: "https://cdn.britannica.com/35/2235-050-EB9BD73A/Douglas-MacArthur-1945.jpg",
        story: "Supreme Allied Commander in the Pacific during WWII who oversaw the strategic liberation of the Philippines and the post-war reconstruction of Japan.",
        tribute: "Remembering a brilliant mind of military strategy."
    },
    {
        name: "Henry Johnson",
        role: "Harlem Hellfighter",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJ_-DbFhKminKWhKAxK-55cU6YEB4jjjX_PTFtpxI9Q&s=10",
        story: "Fought off a 24-man German raiding party during WWI using only a bolo knife and rifle butts, saving a fellow soldier from certain capture and execution.",
        tribute: "Your sacrifice stands as an immortal badge of honor."
    }
];

export default function Home() {
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStatementIndex((prev) => (prev + 1) % militaryStatements.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
            {/* Navbar */}
            <Navbar />
            <main className="grow">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://i.pinimg.com/1200x/3b/bc/b3/3bbcb3ffb207b4c8360f80422d8a6f3c.jpg" 
                            alt="Military Background" 
                            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-950/70 to-transparent"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full uppercase font-extrabold tracking-[0.3em] inline-block">
                                Official Defense Portal
                            </span>

                            <div className="min-h-40 sm:min-h-45 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStatementIndex}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4 text-white drop-shadow-md">
                                            {militaryStatements[currentStatementIndex].main}
                                        </h1>
                                        <p className="text-zinc-300 text-base sm:text-lg font-light tracking-wide max-w-xl mx-auto lg:mx-0">
                                            {militaryStatements[currentStatementIndex].sub}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                <Link 
                                    to="/verify" 
                                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                                >
                                    Verify Status <ArrowRight size={18} />
                                </Link>
                                <Link 
                                    to="/terms" 
                                    className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center uppercase tracking-wider text-sm backdrop-blur-md"
                                >
                                    access terms
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex justify-center">
                            <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                                
                                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-950 border border-amber-500/50 flex items-center justify-center">
                                            <ShieldCheck className="text-amber-400 w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm tracking-wide">SECURE GATEWAY</h3>
                                            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">● System Active</span>
                                        </div>
                                    </div>
                                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md font-mono">DEFCON 4</span>
                                </div>

                                <div className="py-6 space-y-4">
                                    <div className="flex items-start space-x-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Real-Time Authentication</h4>
                                            <p className="text-xs text-zinc-400 mt-1">Instant validation protocols for active duty records and service credentials.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                                        <Lock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Enforced Multi-Factor Security</h4>
                                            <p className="text-xs text-zinc-400 mt-1">Protected by rigorous 60-second OTP validation to eliminate unauthorized entries.</p>
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    to="/verify" 
                                    className="block text-center w-full py-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg transition"
                                >
                                    Access Clearance Portal
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Showroom Section: Announcements & Soldier Features (Uniform & Weaponry) */}
                <section className="py-20 bg-[#1E2229]/60 border-t border-[#738A79]/80relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-white font-mono text-xs uppercase tracking-[0.3em] bg-[#C2A676]/80 px-3 py-1 rounded-full border border-amber-500/20">
                                Tactical Showroom
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-4 text-white">
                                Intelligence & Gear Manifest
                            </h2>
                            <p className="text-zinc-400 text-sm mt-2">
                                Official command dispatches alongside standard issue equipment specification registers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Side: Official Announcements */}
                            <div className="lg:col-span-5  bg-[#3B4D3C]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-800">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                        <Megaphone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Official Announcements</h3>
                                        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">High Command Broadcasts</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {announcements.map((item, idx) => (
                                        <div key={idx} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition">
                                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                                                {item.date}
                                            </span>
                                            <h4 className="font-bold text-sm uppercase tracking-wide mt-2 text-zinc-100">{item.title}</h4>
                                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.summary}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-4 border-t border-zinc-800/80 text-center">
                                    <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 transition flex items-center justify-center gap-1">
                                        View All Dispatches <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side: Soldier Features & Services (Uniform Names & Weapon) */}
                            <div className="lg:col-span-7 bg-[#3B4D3C]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-800">
                                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Soldier Features & Equipment</h3>
                                        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Standard Issue Manifest</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {soldierFeatures.map((feat, idx) => (
                                        <div key={idx} className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition">
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                                        {feat.category}
                                                    </span>
                                                    <div className="p-2 rounded-lg bg-zinc-800">
                                                        {feat.icon}
                                                    </div>
                                                </div>
                                                <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-1">{feat.title}</h4>
                                                <h5 className="font-bold text-sm text-white">{feat.name}</h5>
                                                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{feat.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-linear-to-r from-amber-950/30 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-200">Need Complete Registry Specifications?</h4>
                                        <p className="text-xs text-zinc-400 mt-0.5">Explore full tactical databases and service guidelines.</p>
                                    </div>
                                    <Link 
                                        to="/wardrobe" 
                                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition shrink-0"
                                    >
                                        Explore Gear
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Honoring Past Heroes Section with Images & Tributes */}
                <section className="py-20 bg-[#C2A676]/50 border-t border-[#C2A676]/50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                Hall of Valor
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-4 text-white">
                                Honoring Our Past Heroes
                            </h2>
                            <p className="text-zinc-400 text-sm mt-2">
                                Remembering the legendary figures whose ultimate valor, sacrifice, and unbreakable resolve shaped the freedom of our nation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastHeroes.map((hero, idx) => (
                                <div 
                                    key={idx} 
                                    className="bg-[#1E1715]/80 border border-[#4A3B32] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl group"
                                >
                                    <div>
                                        {/* Hero Image Container */}
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <img 
                                                src={hero.image} 
                                                alt={hero.name} 
                                                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 filter brightness-[0.85]"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-[#1E1715] via-transparent to-transparent"></div>
                                            <span className="absolute top-4 left-4 text-[10px] font-mono text-amber-300 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/30">
                                                {hero.role}
                                            </span>
                                        </div>

                                        {/* Hero Details */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-black uppercase tracking-wide text-white mb-2">{hero.name}</h3>
                                            <p className="text-xs text-zinc-300 leading-relaxed">{hero.story}</p>
                                        </div>
                                    </div>

                                    {/* Sign of Respect & Tribute */}
                                    <div className="p-6 pt-0">
                                        <div className="bg-[#2C221E]/60 border border-[#4A3B32]/60 rounded-2xl p-4 flex items-start space-x-3">
                                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                                                <Heart size={14} className="fill-amber-400" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400/80 block">Sign of Respect</span>
                                                <p className="text-[11px] text-zinc-200 font-medium italic mt-0.5">"{hero.tribute}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}