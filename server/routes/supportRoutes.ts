import express, { type Request, type Response } from 'express';
import SupportTicket from '../models/SupportTicket.ts';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Initialize Google GenAI with your API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 1. User sends a message
router.post('/message', async (req: Request, res: Response): Promise<void> => {
    try {
        const { ticketId, soldierId, message } = req.body;
        let ticket;

        if (ticketId) {
            ticket = await SupportTicket.findById(ticketId);
        }

        // If no active ticket, create a new one
        if (!ticket) {
            ticket = new SupportTicket({
                soldierId: soldierId || 'N/A',
                messages: [{ sender: 'user', text: message, timestamp: new Date() }]
            });
        } else {
            ticket.messages.push({ sender: 'user', text: message, timestamp: new Date() } as any);
        }

        await ticket.save();

        let responseText = "Transmission received. An active duty command representative will review your query shortly.";

        // Check if admin has taken over. If NOT, let AI handle the reply instantly.
        if (ticket.status !== 'admin_active') {
            try {
                const aiPrompt = `You are a secure U.S. Army verification support AI assistant. Answer the user's question clearly, professionally, and concisely based on standard military protocol and verification help.
User Question: "${message}"`;

                const aiResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: aiPrompt,
                });

                if (aiResponse && aiResponse.text) {
                    responseText = aiResponse.text;
                }
            } catch (aiError) {
                console.error("AI Generation Error:", aiError);
                // Keeps default professional text if AI call fails
            }

            // Save AI response to ticket
            ticket.messages.push({ sender: 'ai', text: responseText, timestamp: new Date() } as any);
            await ticket.save();
        }

        res.status(200).json({
            success: true,
            ticketId: ticket._id,
            messages: ticket.messages,
            status: ticket.status
        });

    } catch (error) {
        console.error("Support message error:", error);
        res.status(500).json({ success: false, message: 'Server error processing message.' });
    }
});

// 2. Admin fetches all pending support tickets
router.get('/admin/tickets', async (req: Request, res: Response) => {
    try {
        const tickets = await SupportTicket.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, tickets });
    } catch (error) {
        console.error("Fetch tickets error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch tickets.' });
    }
});

// 3. Admin replies to a specific ticket
router.post('/admin/reply', async (req: Request, res: Response): Promise<any> => {
    try {
        const { ticketId, replyText } = req.body;
        const ticket = await SupportTicket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found.' });
        }

        ticket.status = 'admin_active';
        ticket.messages.push({
            sender: 'admin',
            text: replyText,
            timestamp: new Date()
        } as any);

        await ticket.save();
        res.status(200).json({ success: true, ticket });
    } catch (error) {
        console.error("Admin reply error:", error);
        res.status(500).json({ success: false, message: 'Failed to send admin reply.' });
    }
});

// router.post('/api/soldiers/dispatch-key', async (req: Request, res: Response): Promise<any> => {
//     try {
//         const { soldierId } = req.body;

//         if (!soldierId) {
//             return res.status(400).json({ success: false, message: 'Soldier ID is required.' });
//         }

//         // Find the soldier by ID only
//         const soldier = await Soldier.findbyid({ soldierId: soldierId.trim() });

//         if (!soldier) {
//             return res.status(404).json({ success: false, message: 'Target soldier ID not found.' });
//         }

//         // REMOVE OR BYPASS THE EMAIL CHECK:
//         // Instead of returning an error if email is missing, we generate the code directly.
//         const clearanceKey = soldier.accessCode || Math.floor(100000 + Math.random() * 900000).toString();

//         // Optional: Save the access code back to the soldier record if it wasn't there
//         soldier.accessCode = clearanceKey;
//         await soldier.save();

//         return res.status(200).json({
//             success: true,
//             message: 'Clearance key generated successfully.',
//             accessCode: clearanceKey,
//             soldierName: soldier.name
//         });

//     } catch (error: any) {
//         console.error("Dispatch error:", error);
//         return res.status(500).json({ success: false, message: 'Server error generating key.' });
//     }
// });


export default router;