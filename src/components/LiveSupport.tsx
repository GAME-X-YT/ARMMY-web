// import React, { useState } from 'react';
// import { MessageSquare, X, Send } from 'lucide-react';

// export default function LiveSupport() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [messages, setMessages] = useState([
//         { sender: 'support', text: 'Secure U.S. Army Support line active. How can we assist your verification inquiry?' }
//     ]);
//     const [input, setInput] = useState('');

//     const handleSend = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!input.trim()) return;

//         const userMsg = input;
//         setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
//         setInput('');

//         // Simulated automated secure response matching military protocol
//         setTimeout(() => {
//             setMessages(prev => [
//                 ...prev, 
//                 { sender: 'support', text: 'Transmission received. An active duty command representative or administrator will review your query shortly.' }
//             ]);
//         }, 1000);
//     };

//     return (
//         <div className="fixed bottom-6 right-6 z-50 font-mono">
//             {!isOpen ? (
//                 <button
//                     onClick={() => setIsOpen(true)}
//                     className="bg-amber-500 hover:bg-amber-400 text-black p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold transition transform hover:scale-105 border border-amber-300"
//                 >
//                     <MessageSquare size={20} />
//                     <span className="text-xs uppercase tracking-wider hidden md:inline">Live Support</span>
//                 </button>
//             ) : (
//                 <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl w-80 md:w-96 shadow-2xl flex flex-col overflow-hidden">
//                     {/* Header */}
//                     <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex justify-between items-center">
//                         <div className="flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                             <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Secure Dispatch Support</span>
//                         </div>
//                         <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
//                             <X size={18} />
//                         </button>
//                     </div>

//                     {/* Messages Body */}
//                     <div className="p-4 h-72 overflow-y-auto space-y-3 bg-neutral-900/50 text-xs">
//                         {messages.map((msg, idx) => (
//                             <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
//                                     msg.sender === 'user' 
//                                         ? 'bg-amber-500 text-black font-medium' 
//                                         : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
//                                 }`}>
//                                     {msg.text}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Input Footer */}
//                     <form onSubmit={handleSend} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
//                         <input
//                             type="text"
//                             value={input}
//                             onChange={(e) => setInput(e.target.value)}
//                             placeholder="Type secure message..."
//                             className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
//                         />
//                         <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black p-2 rounded-xl transition">
//                             <Send size={16} />
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, Mail, ChevronDown, HelpCircle, CheckCircle, MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveSupport() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
   const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';
  
    // Chat state
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Secure U.S. Army Support line active. How can we assist your verification inquiry?' }
    ]);
    const [input, setInput] = useState('');
    const [ticketId, setTicketId] = useState<string | null>(() => {
        return localStorage.getItem('supportTicketId');
    });
    const [isTyping, setIsTyping] = useState(false);

    // Load existing ticket session if available
    useEffect(() => {
        const savedTicketId = localStorage.getItem('supportTicketId');
        if (savedTicketId) {
            setTicketId(savedTicketId);
        }
    }, []);

    const faqs = [
        {
            q: "How do I verify a soldier's profile authenticity?",
            a: "Navigate to the 'Verify Status' portal from the navigation bar, input the official assigned Soldier ID (e.g., USA-9942-SV), and cross-reference the cryptographic clearance hash."
        },
        {
            q: "What should I do if I suspect an impersonation attempt?",
            a: "Immediately disconnect communication with the fraudulent account, report the username or serial number via this secure support channel, and submit the evidence logs for review."
        },
        {
            q: "How long does manual clearance validation take?",
            a: "Automated lookups are instant. Manual command validation requests submitted through your profile dashboard are typically processed within 2 to 4 operational hours."
        },
        {
            q: "Are service records and benefits data publicly visible?",
            a: "No. Sensitive personal files, ranks, locations, and financial records are strictly protected under military privacy protocols and require authorized clearance credentials to view."
        }
    ];

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setInput('');
        
        // Optimistically add user message to UI
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            const currentUser = localStorage.getItem('militaryUser');
            const parsedUser = currentUser ? JSON.parse(currentUser) : null;

            const response = await fetch(`${API_URL}/api/support/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticketId: ticketId,
                    soldierId: parsedUser?.soldierId || 'N/A',
                    message: userMsg
                })
            });

            const data = await response.json();

            if (data.success) {
                if (!ticketId) {
                    setTicketId(data.ticketId);
                    localStorage.setItem('supportTicketId', data.ticketId);
                }
                // Sync complete message history from backend response
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: `Debug Error: ${error instanceof Error ? error.message : 'Unknown network failure'}` }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#12161C] text-white pt-28 pb-24 px-4 md:px-8 font-mono relative">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Hero Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Command Dispatch Online
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider">
                        Secure <span className="text-amber-400">Live Support</span> & Help Hub
                    </h1>
                    <p className="text-neutral-400 text-xs md:text-sm max-w-2xl mx-auto">
                        Connect directly with active verification duty officers or browse our intelligence database for immediate guidance.
                    </p>
                </motion.div>

                {/* Info & Direct Contact Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="bg-[#1E2229]/80 border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                            <ShieldAlert size={18} /> Direct Assistance Lines
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            For urgent impersonation emergencies or breached credentials, contact direct command hotlines or launch the secure floating chat widget at the bottom right.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 p-3.5 bg-neutral-950/60 rounded-2xl border border-neutral-800 text-xs">
                                <PhoneCall size={18} className="text-amber-500" />
                                <div>
                                    <div className="text-neutral-400 text-[10px] uppercase">Secure Command Hotline</div>
                                    <div className="font-bold text-white">+1 (800) 555-ARMY</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3.5 bg-neutral-950/60 rounded-2xl border border-neutral-800 text-xs">
                                <Mail size={18} className="text-amber-500" />
                                <div>
                                    <div className="text-neutral-400 text-[10px] uppercase">Operations Dispatch Email</div>
                                    <div className="font-bold text-white">support@army-verify.mil</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-emerald-950/40 to-[#1E2229] border border-emerald-500/20 rounded-3xl p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle size={18} /> Protocol Guarantee
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                            All chat sessions and transmitted evidence logs are encrypted under military-grade privacy frameworks. Your details are never shared with third-party vendors. Use the floating chat assistant at any time for quick AI triage and dispatch.
                        </p>
                    </div>
                </div>

                {/* FAQ SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6 pt-6"
                >
                    <div className="text-center space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                            Knowledge Base
                        </span>
                        <h2 className="text-2xl font-black uppercase tracking-wider">
                            Frequently Asked <span className="text-amber-400">Questions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="bg-[#1E2229] border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-5 cursor-pointer transition space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-xs md:text-sm uppercase tracking-wider text-white flex items-center gap-2">
                                        <HelpCircle size={16} className="text-amber-500" />
                                        {faq.q}
                                    </h4>
                                    <ChevronDown size={18} className={`text-neutral-400 transition-transform ${openFaq === index ? 'rotate-180 text-amber-400' : ''}`} />
                                </div>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.p 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-xs text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800"
                                        >
                                            {faq.a}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* FLOATING AI / LIVE SUPPORT CHAT WIDGET */}
            <div className="fixed bottom-6 right-6 z-50 font-mono">
                {!isChatOpen ? (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="bg-amber-500 hover:bg-amber-400 text-black p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold transition transform hover:scale-105 border border-amber-300"
                    >
                        <MessageSquare size={20} />
                        <span className="text-xs uppercase tracking-wider hidden md:inline">Live Support</span>
                    </button>
                ) : (
                    <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl w-80 md:w-96 shadow-2xl flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Secure Dispatch Support</span>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div className="p-4 h-72 overflow-y-auto space-y-3 bg-neutral-900/50 text-xs">
                            {messages.map((msg: any, idx: number) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                                        msg.sender === 'user' 
                                            ? 'bg-amber-500 text-black font-medium' 
                                            : msg.sender === 'admin'
                                            ? 'bg-emerald-950 text-emerald-200 border border-emerald-700 font-semibold'
                                            : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                                    }`}>
                                        <div className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">
                                            {msg.sender === 'user' ? 'You' : msg.sender === 'admin' ? 'Duty Officer' : 'AI Assistant'}
                                        </div>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-neutral-800 text-neutral-400 rounded-xl p-3 text-xs animate-pulse">
                                        AI is analyzing protocols...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <form onSubmit={handleSend} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type secure message..."
                                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                            />
                            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black p-2 rounded-xl transition">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}