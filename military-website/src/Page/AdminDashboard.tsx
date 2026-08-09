// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageSquare, Users, Send, UserCheck, Clock, Edit3 } from 'lucide-react';
// import EditUserModal from '../components/EditUserModal';

// interface Soldier {
//     _id: string;
//     soldierId: string;
//     name: string;
//     email: string;
//     role: string;
//     rank: string;
//     unit: string;
//     status: string;
//     clearanceLevel: string;
//     image: string;
//     enlistmentDate: string;
//     location: string;
//     awards: string[];
// }

// export default function AdminDashboard() {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [adminKey, setAdminKey] = useState('');
//     const [authError, setAuthError] = useState('');

//     // Dashboard Tabs: 'personnel' | 'support'
//     const [activeTab, setActiveTab] = useState<'personnel' | 'support'>('personnel');

//     // Soldier State
//     const [soldiers, setSoldiers] = useState<Soldier[]>([]);
//     const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);
//     const [soldiersLoading, setSoldiersLoading] = useState(true);
//     const [clientEmail, setClientEmail] = useState('');

//     // Edit Modal State
//     const [editingUser, setEditingUser] = useState<Soldier | null>(null);

//     // Live Support State
//     const [tickets, setTickets] = useState<any[]>([]);
//     const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
//     const [adminReplyText, setAdminReplyText] = useState('');
//     const [supportLoading, setSupportLoading] = useState(false);

//     const fetchSoldiers = async () => {
//         setSoldiersLoading(true);
//         try {
//             const res = await fetch('http://localhost:5000/api/soldiers');
//             const data = await res.json();
//             if (data.success) {
//                 const formattedData = data.data.map((s: any) => ({
//                     ...s,
//                     _id: s._id || s.soldierId,
//                     email: s.email || '',
//                     role: s.role || 'soldier'
//                 }));
//                 setSoldiers(formattedData);
//                 if (formattedData.length > 0 && !selectedSoldier) {
//                     setSelectedSoldier(formattedData[0]);
//                 }
//             }
//         } catch (err) {
//             console.error('Failed to load soldier records.');
//         } finally {
//             setSoldiersLoading(false);
//         }
//     };

//     // Check auth session
//     useEffect(() => {
//         const localUser = localStorage.getItem('militaryUser');
//         if (localUser) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchSoldiers();
//             fetchTickets();
//             const interval = setInterval(fetchTickets, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);

//     const fetchTickets = async () => {
//         try {
//             const res = await fetch('http://localhost:5000/api/support/admin/tickets');
//             const data = await res.json();
//             if (data.success) {
//                 setTickets(data.tickets);
//                 if (selectedTicket) {
//                     const updatedCurrent = data.tickets.find((t: any) => t._id === selectedTicket._id);
//                     if (updatedCurrent) setSelectedTicket(updatedCurrent);
//                 }
//             }
//         } catch (err) {
//             console.error("Failed to fetch admin tickets:", err);
//         }
//     };

//     const handleLogin = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (adminKey === 'COMMAND-999') {
//             setIsAuthenticated(true);
//             setAuthError('');
//         } else {
//             setAuthError('Access Denied: Invalid Passcode.');
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('militaryUser');
//         setIsAuthenticated(false);
//         navigate('/');
//     };

//     const handleAdminReply = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!adminReplyText.trim() || !selectedTicket) return;

//         setSupportLoading(true);
//         try {
//             const res = await fetch('http://localhost:5000/api/support/admin/reply', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     ticketId: selectedTicket._id,
//                     replyText: adminReplyText
//                 })
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setSelectedTicket(data.ticket);
//                 setAdminReplyText('');
//                 fetchTickets();
//             }
//         } catch (err) {
//             console.error("Admin reply error:", err);
//         } finally {
//             setSupportLoading(false);
//         }
//     };
 
//     const handleGenerateAndSendSpecific = async (targetSoldierId: string, emailToUse: string) => {
//         if (!emailToUse) {
//             alert('Please enter a recipient email address.');
//             return;
//         }
//         try {
//             const response = await fetch('http://localhost:5000/api/generate-code', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ soldierId: targetSoldierId, email: emailToUse })
//             });
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || 'Failed to dispatch code');
//             alert(`Access code successfully dispatched for ${targetSoldierId}!`);
//         } catch (err: any) {
//             alert(`Error: ${err.message}`);
//         }
//     };

//     const handleSaveEdit = async (e: React.FormEvent | Soldier) => {
//         if ('preventDefault' in e) {
//             e.preventDefault();
//             if (!editingUser) return;
//             try {
//                 const response = await fetch(`http://localhost:5000/api/soldiers/${editingUser.soldierId}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(editingUser)
//                 });
//                 const data = await response.json();
//                 if (!response.ok) throw new Error(data.message || 'Failed to update soldier details');
                
//                 alert('Soldier record successfully updated!');
//                 setEditingUser(null);
//                 fetchSoldiers();
//             } catch (err: any) {
//                 alert(`Error updating profile: ${err.message}`);
//             }
//             return;
//         }

//         const updatedSoldier = e as Soldier;
//         try {
//             const response = await fetch(`http://localhost:5000/api/soldiers/${updatedSoldier.soldierId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedSoldier)
//             });
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || 'Failed to update soldier details');
            
//             alert('Soldier record successfully updated!');
//             setEditingUser(null);
//             fetchSoldiers();
//         } catch (err: any) {
//             alert(`Error updating profile: ${err.message}`);
//         }
//     };

//     if (!isAuthenticated) {
//         return (
//             <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 pt-28 font-mono">
//                 <div className="max-w-md w-full bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
//                     <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-600 via-amber-400 to-amber-600"></div>
//                     <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-block mb-3">
//                         Restricted Access
//                     </span>
//                     <h1 className="text-2xl font-black tracking-wider uppercase mb-2 text-white">Military Profile & Admin Portal</h1>
//                     <p className="text-xs text-neutral-400 mb-6">Enter master command passcode (`COMMAND-999`) or sign in via profile.</p>
                    
//                     <form onSubmit={handleLogin} className="space-y-4">
//                         <input
//                             type="password"
//                             value={adminKey}
//                             onChange={(e) => setAdminKey(e.target.value)}
//                             placeholder="ENTER PASSCODE (COMMAND-999)"
//                             required
//                             className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3.5 text-white text-center font-mono tracking-widest text-sm focus:outline-none focus:border-amber-500 transition shadow-inner"
//                         />
//                         <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20">
//                             Authorize Access
//                         </button>
//                     </form>
//                     {authError && <div className="mt-4 p-3 bg-red-950/50 border border-red-800/60 rounded-lg text-red-400 text-xs">{authError}</div>}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8 max-w-7xl mx-auto pt-28 font-mono">
//             {/* Header with Logout & Title */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-neutral-900/80 border border-amber-500/30 p-6 rounded-2xl shadow-xl">
//                 <div>
//                     <div className="flex items-center gap-2 mb-1">
//                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                         <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Authorized Command Node Active</span>
//                     </div>
//                     <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">Command & Personnel Dashboard</h1>
//                 </div>
//                 <button 
//                     onClick={handleLogout} 
//                     className="text-xs uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-5 py-2.5 rounded-xl transition"
//                 >
//                     Sign Out / Lock Session
//                 </button>
//             </div>

//             {/* TAB NAVIGATION BUTTONS */}
//             <div className="flex gap-4 mb-8 border-b border-neutral-800 pb-4">
//                 <button
//                     onClick={() => setActiveTab('personnel')}
//                     className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition border ${
//                         activeTab === 'personnel'
//                             ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
//                             : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
//                     }`}
//                 >
//                     <Users size={16} /> Personnel & Dispatch Records
//                 </button>
//                 <button
//                     onClick={() => setActiveTab('support')}
//                     className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition border relative ${
//                         activeTab === 'support'
//                             ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
//                             : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
//                     }`}
//                 >
//                     <MessageSquare size={16} /> Live Support Queue
//                     {tickets.length > 0 && (
//                         <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
//                             {tickets.length}
//                         </span>
//                     )}
//                 </button>
//             </div>

//             {/* TAB 1: PERSONNEL & DISPATCH RECORDS */}
//             {activeTab === 'personnel' && (
//                 <div className="max-w-5xl mx-auto pb-16">
//                     <div className="mb-6 flex justify-between items-center">
//                         <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400">Database Personnel Registry</h2>
//                         <span className="text-xs text-neutral-500">Select a profile to edit or dispatch access codes</span>
//                     </div>

//                     {soldiersLoading ? (
//                         <div className="text-neutral-500 text-xs py-12 text-center animate-pulse">Loading database personnel...</div>
//                     ) : soldiers.length === 0 ? (
//                         <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center text-neutral-400 text-xs">
//                             No soldier records found in the database.
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {soldiers.map((s) => (
//                                 <div key={s.soldierId} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
//                                     <div>
//                                         <div className="flex justify-between items-start mb-4">
//                                             <div>
//                                                 <span className="text-[10px] bg-neutral-950 text-amber-500 border border-neutral-800 px-2.5 py-1 rounded-md font-mono">{s.soldierId}</span>
//                                                 <h3 className="text-base font-bold text-white mt-2">{s.name}</h3>
//                                             </div>
//                                             <span className="text-xs text-emerald-400 font-semibold">{s.rank}</span>
//                                         </div>
//                                         <p className="text-xs text-neutral-400 mb-4">Unit: {s.unit} | Status: {s.status}</p>
//                                     </div>

//                                     <div className="space-y-3 pt-4 border-t border-neutral-800">
//                                         <div className="grid grid-cols-2 gap-2">
//                                             <button
//                                                 onClick={() => navigate(`/soldier-portal/${s.soldierId}`)}
//                                                 className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition text-center"
//                                             >
//                                                 View Dossier
//                                             </button>
//                                             <button
//                                                 onClick={() => setEditingUser(s)}
//                                                 className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
//                                             >
//                                                 <Edit3 size={14} /> Edit Details
//                                             </button>
//                                         </div>

//                                         <div className="pt-2">
//                                             <input
//                                                 type="email"
//                                                 placeholder="Recipient email..."
//                                                 value={clientEmail}
//                                                 onChange={(e) => setClientEmail(e.target.value)}
//                                                 className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white mb-2 focus:outline-none focus:border-amber-500"
//                                             />
//                                             <button
//                                                 onClick={() => handleGenerateAndSendSpecific(s.soldierId, clientEmail)}
//                                                 className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
//                                             >
//                                                 Generate & Send Code for {s.soldierId}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* TAB 2: LIVE SUPPORT CHAT QUEUE */}
//             {activeTab === 'support' && (
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16">
//                     {/* Tickets Sidebar (5 Cols) */}
//                     <div className="lg:col-span-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 h-150 flex flex-col shadow-xl">
//                         <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
//                             <h3 className="font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
//                                 <MessageSquare size={16} /> Live Support Queue
//                             </h3>
//                             <span className="text-[10px] bg-neutral-950 px-2.5 py-1 rounded-full text-neutral-400">
//                                 {tickets.length} Total
//                             </span>
//                         </div>

//                         <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
//                             {tickets.length === 0 ? (
//                                 <div className="text-center text-neutral-500 py-20 text-xs uppercase">No active chat sessions</div>
//                             ) : (
//                                 tickets.map((ticket) => (
//                                     <div
//                                         key={ticket._id}
//                                         onClick={() => setSelectedTicket(ticket)}
//                                         className={`p-4 rounded-xl border cursor-pointer transition space-y-2 ${
//                                             selectedTicket?._id === ticket._id 
//                                                 ? 'bg-amber-500/10 border-amber-500/60' 
//                                                 : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
//                                         }`}
//                                     >
//                                         <div className="flex justify-between items-center text-xs">
//                                             <span className="font-bold text-white">Soldier: {ticket.soldierId}</span>
//                                             <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-semibold ${
//                                                 ticket.status === 'admin_active' 
//                                                     ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
//                                                     : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
//                                             }`}>
//                                                 {ticket.status === 'admin_active' ? 'Human Active' : 'AI Triaged'}
//                                             </span>
//                                         </div>
//                                         <p className="text-[11px] text-neutral-400 truncate">
//                                             {ticket.messages[ticket.messages.length - 1]?.text || 'No messages yet'}
//                                         </p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>

//                     {/* Active Chat Panel (7 Cols) */}
//                     <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 h-150 flex flex-col shadow-xl">
//                         {selectedTicket ? (
//                             <>
//                                 <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
//                                     <div>
//                                         <span className="font-bold text-white uppercase">Ticket ID: {selectedTicket._id}</span>
//                                         <div className="text-neutral-400 text-[10px]">Assigned Soldier: {selectedTicket.soldierId}</div>
//                                     </div>
//                                     <div className="flex items-center gap-1 text-amber-400">
//                                         <UserCheck size={14} />
//                                         <span className="uppercase text-[10px]">
//                                             {selectedTicket.status === 'admin_active' ? 'Admin Managing' : 'AI Assisting'}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2 text-xs">
//                                     {selectedTicket.messages.map((m: any, idx: number) => (
//                                         <div key={idx} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
//                                             <div className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
//                                                 m.sender === 'admin' 
//                                                     ? 'bg-amber-500 text-black font-medium' 
//                                                     : m.sender === 'user'
//                                                     ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
//                                                     : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
//                                             }`}>
//                                                 <div className="text-[9px] uppercase tracking-widest opacity-60 mb-0.5">
//                                                     {m.sender === 'admin' ? 'You (Admin)' : m.sender === 'user' ? 'User' : 'AI Assistant'}
//                                                 </div>
//                                                 {m.text}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <form onSubmit={handleAdminReply} className="pt-3 border-t border-neutral-800 flex gap-2">
//                                     <input 
//                                         type="text"
//                                         value={adminReplyText}
//                                         onChange={(e) => setAdminReplyText(e.target.value)}
//                                         placeholder="Type admin reply (AI will halt for this ticket)..."
//                                         className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
//                                     />
//                                     <button 
//                                         type="submit"
//                                         disabled={supportLoading}
//                                         className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-3 rounded-xl font-bold transition flex items-center justify-center shadow-md"
//                                     >
//                                         <Send size={16} />
//                                     </button>
//                                 </form>
//                             </>
//                         ) : (
//                             <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-500 space-y-2">
//                                 <Clock size={32} className="text-neutral-600" />
//                                 <p className="text-xs uppercase tracking-wider">Select a support ticket from the queue to review conversation and take over.</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* IMPORTED EDIT MODAL COMPONENT */}
//             {editingUser && (
//                 <EditUserModal 
//                     editingUser={editingUser as any} 
//                     setEditingUser={setEditingUser as any} 
//                     onSave={handleSaveEdit as any} 
//                 />
//             )}
//         </div>
//     );
// }



// import SoldierEditModule from '../components/SoldierEditModule';
// import LiveSupportAdminModule from '../components/LiveSupportAdminModule';
// import BlogBroadcastModule from '../components/BlogBroadcastModule';
// import AdminCodeGeneratorModule from '../components/AdminCodeGeneratorModule';

// export default function AdminDashboard() {
//     return (
//         <div className="min-h-screen bg-black text-white p-8">
//             <header className="mb-8 border-b border-neutral-800 pb-4">
//                 <h1 className="text-3xl font-extrabold text-amber-500 tracking-wider">COMMAND ADMIN DASHBOARD</h1>
//                 <p className="text-sm text-neutral-400">Secure Central Operations & Management Console</p>
//             </header>

//             {/* Grid layout containing your 3 independent functional modules */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <SoldierEditModule />
//                 <LiveSupportAdminModule />
//                 <BlogBroadcastModule />
//                 <AdminCodeGeneratorModule />
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import SoldierEditModule from '../components/SoldierEditModule';
import LiveSupportAdminModule from '../components/LiveSupportAdminModule';
import BlogBroadcastModule from '../components/BlogBroadcastModule';
import AdminCodeGeneratorModule from '../components/AdminCodeGeneratorModule';
import EditCertificateModal from '../Page/EditCertificateModal'; // Import the modal

export default function AdminDashboard() {
    // State to track which soldier's certificate is currently being edited
    const [selectedSoldierForCert, setSelectedSoldierForCert] = useState<any | null>(null);

    const handleRefresh = () => {
        // Optional: Trigger a list refresh or refetch data if needed
        window.location.reload(); 
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="mb-8 border-b border-neutral-800 pb-4">
                <h1 className="text-3xl font-extrabold text-amber-500 tracking-wider">COMMAND ADMIN DASHBOARD</h1>
                <p className="text-sm text-neutral-400">Secure Central Operations & Management Console</p>
            </header>

            {/* Grid layout containing your functional modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pass a callback function if your SoldierEditModule supports selecting a soldier for certificate updates */}
                <SoldierEditModule onEditCertificate={(soldier: any) => setSelectedSoldierForCert(soldier)} />
                <LiveSupportAdminModule />
                <BlogBroadcastModule />
                <AdminCodeGeneratorModule />
            </div>

            {/* Modal pops up when an admin triggers certificate editing for a specific soldier */}
            {selectedSoldierForCert && (
                <EditCertificateModal 
                    soldier={selectedSoldierForCert} 
                    onClose={() => setSelectedSoldierForCert(null)} 
                    onUpdate={handleRefresh} 
                />
            )}
        </div>
    );
}