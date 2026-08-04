// import React, { useState, useEffect } from 'react';

// export default function LiveSupportAdminModule() {
//     const [tickets, setTickets] = useState<any[]>([]);
//     const [] = useState('');
//     const [replyText, setReplyText] = useState('');
//     const [statusMessage, setStatusMessage] = useState('');

//     // Fetch incoming user support tickets
//     const fetchTickets = async () => {
//         try {
//             const res = await fetch('http://localhost:5000/api/support/admin/tickets');
//             const data = await res.json();
//             if (data.success) {
//                 setTickets(data.tickets);
//             }
//         } catch (err) {
//             console.error('Error loading tickets:', err);
//         }
//     };

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     // Send admin reply
//     const handleSendReply = async (e: React.FormEvent, ticketId: string) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:5000/api/support/admin/reply', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ticketId, replyText })
//             });
//             const data = await res.json();
//             if (data.success) {
//                 setStatusMessage('Reply sent successfully!');
//                 setReplyText('');
//                 fetchTickets();
//             } else {
//                 setStatusMessage('Failed to send reply.');
//             }
//         } catch (err) {
//             setStatusMessage('Error submitting reply.');
//         }
//     };

//     return (
//         <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg text-white">
//             <h2 className="text-xl font-bold text-amber-500 mb-4 uppercase tracking-wider">2. Live Support Messages Queue</h2>
//             {tickets.length === 0 ? (
//                 <p className="text-neutral-500">No incoming messages found.</p>
//             ) : (
//                 <div className="space-y-4 max-h-100 overflow-y-auto">
//                     {tickets.map(ticket => (
//                         <div key={ticket._id} className="bg-neutral-800 p-4 rounded border border-neutral-700">
//                             <p className="text-xs text-amber-400 mb-2">Soldier ID: {ticket.soldierId} | Status: {ticket.status}</p>
//                             <div className="space-y-2 mb-3 max-h-32 overflow-y-auto bg-neutral-900 p-2 rounded">
//                                 {ticket.messages?.map((msg: any, idx: number) => (
//                                     <div key={idx} className={`text-sm ${msg.sender === 'admin' ? 'text-amber-300 text-right' : 'text-neutral-300'}`}>
//                                         <span className="font-semibold text-xs text-neutral-500 block">[{msg.sender}]</span>
//                                         {msg.text}
//                                     </div>
//                                 ))}
//                             </div>
//                             <form onSubmit={(e) => handleSendReply(e, ticket._id)} className="flex gap-2">
//                                 <input 
//                                     type="text" 
//                                     placeholder="Type official reply..." 
//                                     value={replyText} 
//                                     onChange={(e) => setReplyText(e.target.value)}
//                                     className="flex-1 bg-neutral-900 border border-neutral-700 p-2 rounded text-sm text-white"
//                                     required
//                                 />
//                                 <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm rounded font-bold">Reply</button>
//                             </form>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {statusMessage && <p className="text-xs mt-2 text-green-400">{statusMessage}</p>}
//         </div>
//     );
// }



import React, { useState, useEffect } from 'react';

export default function LiveSupportAdminModule() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
    const [statusMessage, setStatusMessage] = useState('');
    const API_URL = import.meta.env.PROD 
  ? 'https://arrmy-backend.onrender.com' 
  : 'http://localhost:5000';

    // Fetch incoming user support tickets
    const fetchTickets = async () => {
        try {
            const res = await fetch(`${API_URL}/api/support/admin/tickets`);
            const data = await res.json();
            if (data.success) {
                setTickets(data.tickets);
            }
        } catch (err) {
            console.error('Error loading tickets:', err);
        }
    };

    useEffect(() => {
        fetchTickets();
        // Optional: auto-refresh queue every 10 seconds
        const interval = setInterval(fetchTickets, 10000);
        return () => clearInterval(interval);
    }, []);

    // Handle typing inside a specific ticket's reply box
    const handleInputChange = (ticketId: string, value: string) => {
        setReplyInputs(prev => ({ ...prev, [ticketId]: value }));
    };

    // Send admin reply
    const handleSendReply = async (e: React.FormEvent, ticketId: string) => {
        e.preventDefault();
        const replyText = replyInputs[ticketId];
        if (!replyText || !replyText.trim()) return;

        try {
            const res = await fetch(`${API_URL}/api/support/admin/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticketId, replyText })
            });
            const data = await res.json();
            if (data.success) {
                setStatusMessage('Reply sent successfully!');
                setReplyInputs(prev => ({ ...prev, [ticketId]: '' })); // Clear input
                fetchTickets(); // Refresh queue to show new message
            } else {
                setStatusMessage('Failed to send reply.');
            }
        } catch (err) {
            setStatusMessage('Error submitting reply.');
        }
    };

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-white flex flex-col h-full">
            <h2 className="text-xl font-bold text-amber-500 mb-4 tracking-wider">2. LIVE SUPPORT MESSAGES QUEUE</h2>
            
            {statusMessage && (
                <div className="mb-4 text-xs text-amber-400 bg-neutral-950 p-2 border border-neutral-800 rounded">
                    {statusMessage}
                </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-4 max-h-150 pr-2">
                {tickets.length === 0 ? (
                    <p className="text-neutral-500 text-sm italic">No incoming messages found.</p>
                ) : (
                    tickets.map(ticket => (
                        <div key={ticket.ticketId} className="bg-neutral-950 border border-neutral-800 rounded-md p-4 space-y-3">
                            <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-neutral-900 pb-2">
                                <span className="text-amber-400 font-mono">Ticket: {ticket.ticketId}</span>
                                <span className="font-mono">Soldier ID: {ticket.soldierId}</span>
                            </div>

                            {/* Message Thread History */}
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-sm font-mono">
                                {ticket.messages?.map((msg: any, idx: number) => (
                                    <div 
                                        key={idx} 
                                        className={`p-2 rounded text-xs ${
                                            msg.sender === 'admin' 
                                                ? 'bg-amber-950/40 border border-amber-900/50 text-amber-200 ml-4' 
                                                : 'bg-neutral-900 text-neutral-300 mr-4'
                                        }`}
                                    >
                                        <span className="font-bold uppercase tracking-wide opacity-70 block mb-1">
                                            {msg.sender}:
                                        </span>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>

                            {/* Reply Input Bar Form */}
                            <form onSubmit={(e) => handleSendReply(e, ticket.ticketId)} className="flex gap-2 pt-2">
                                <input 
                                    type="text"
                                    placeholder="Type admin response..."
                                    value={replyInputs[ticket.ticketId] || ''}
                                    onChange={(e) => handleInputChange(ticket.ticketId, e.target.value)}
                                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                                />
                                <button 
                                    type="submit"
                                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded text-xs tracking-wider transition-colors"
                                >
                                    SEND
                                </button>
                            </form>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}