import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import supportRouter from './routes/supportRoutes.ts';
dotenv.config();

const app = express();
app.use('/api/support', supportRouter);

app.use(cors());
app.use(express.json());

// 1. Define the Support Ticket Schema if you haven't already
interface ISupportMessage extends Document {
    ticketId: string;
    soldierId: string;
    messages: Array<{ sender: string; text: string; timestamp?: Date }>;
}

const SupportSchema = new Schema({
    ticketId: { type: String, required: true, unique: true },
    soldierId: { type: String, required: true },
    messages: [
        {
            sender: { type: String, required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SupportTicket = mongoose.models.SupportTicket || mongoose.model<ISupportMessage>('SupportTicket', SupportSchema);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/military_verification')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err: unknown) => console.error('MongoDB Connection Error:', err));

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Define the Blog Post Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'OPERATIONS', 'INTEL', 'ANNOUNCEMENT'
    content: { type: String, required: true },
    author: { type: String, default: 'COMMAND HQ' },
    date: { type: Date, default: Date.now },
    clearanceLevel: { type: String, default: 'RESTRICTED' }
});

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogSchema);
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure where and how files are saved
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Gives the file a unique name using the current time so names don't clash
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Make sure your backend can serve these uploaded images statically so the frontend can see them!
// Add this line near your other app.use() configurations:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Soldier Schema
const soldierSchema = new mongoose.Schema({
    soldierId: { type: String, required: true, unique: true },
    accessCode: { type: String, required: true },
    name: { type: String, required: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true },
    status: { type: String, default: 'Active Duty' },
    clearanceLevel: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    enlistmentDate: { type: String, required: true },
    location: { type: String, required: true },
    originalAddress: { type: String },
    age: { type: Number, default: 59 },
    bloodType: { type: String, default: 'O+' },
    mos: { type: String, default: '11B - Infantryman' },
    careerField: { type: String, default: 'Supply Operations & Resource Management' },
    // Add this inside your soldierSchema definition
    certificate: {
    title: { type: String, default: 'Certificate of Special Commendation' },
    description: { type: String, default: '...' },
    issueDate: { type: String, default: () => new Date().toLocaleDateString() },
    signedBy: { type: String, default: 'Major Gen. Jeff M. Farris' },
    logo: { type: String, default: '' } // Stores custom uploaded logo URL or path
},
    awards: [String],


    
    // New Fields requested
    maritalStatus: { type: String, default: 'Widow' },
    annualIncome: { type: String, default: '$90,000 to $120,000' },
    totalBenefits: { type: String, default: '$800,000' },


    // Single-use security fields
    activeAccessCode: { type: String, default: null },
    codeExpiresAt: { type: Date, default: null },
    isCodeUsed: { type: Boolean, default: false }
}, { timestamps: true });

const Soldier = mongoose.model('Soldier', soldierSchema);

// 1. SEED DATABASE ROUTE: Loads both soldiers into MongoDB Atlas
app.post('/api/soldiers/seed', async (req: Request, res: Response) => {
    try {
        await Soldier.deleteMany({}); // Clear old records

        const profiles = [
            {
                soldierId: 'USA-9942-SV',
                name: 'James Stewart',
                rank: 'Sergeant First Class (E-7)',
                unit: 'Infantry Unit',
                status: 'Active Duty',
                clearanceLevel: 'Secret',
                image: '/images/james-stewart.jpg',
                enlistmentDate: '14-JUL-2006',
                location: 'Iraq',
                age: 59,
                bloodType: 'O Positive',
                mos: '92A — Automated Logistical Specialist',
                careerField: 'Supply Operations & Resource Management',
                maritalStatus: 'Widow',
                annualIncome: '$90,000 to $120,000',
                totalBenefits: '$800,000',
                awards: ['Army Service Ribbon', 'Overseas Service Ribbon', 'National Defense Service Medal'],
                // accessCode: '123456' // <-- Add this line
            },
            {
                soldierId: 'USA-7628-LG',
                name: 'James Stewart',
                rank: 'Sergeant First Class (SFC) — E-7',
                unit: 'Sustainment Brigade / Logistics Support Battalion',
                status: 'Active Duty',
                clearanceLevel: 'Secret',
                image: '/images/james-stewart-2.jpg',
                enlistmentDate: '22-MAR-2006',
                location: 'Iraq',
                age: 59,
                bloodType: 'A Positive',
                mos: '92Y — Unit Supply Specialist',
                careerField: 'Logistics & Sustainment Operations',
                maritalStatus: 'Widow',
                annualIncome: '$90,000 to $120,000',
                totalBenefits: '$800,000',
                awards: [
                    'Army Good Conduct Medal',
                    'Army Achievement Medal',
                    'Army Commendation Medal',
                    'National Defense Service Medal'
                ],
                // accessCode: '654321' // <-- Add this line
            }
        ];

       await Soldier.insertMany(profiles);
        res.status(200).json({ success: true, message: 'Both James Stewart profiles successfully loaded into MongoDB with full details!' });
    } catch (error: any) {
        // --- LOG THE REAL ERROR TO YOUR TERMINAL ---
        console.error("DETAILED SEED ERROR:", error);
        res.status(500).json({ success: false, message: 'Error seeding database.', error: error.message });
    }
});
// 2. GET ALL SOLDIERS ROUTE: Fetches both profiles for the AdminDashboard tabs
app.get('/api/soldiers', async (req: Request, res: Response) => {
    try {
        const soldiers = await Soldier.find({});
        res.status(200).json({ success: true, data: soldiers });
    } catch (error: unknown) {
        res.status(500).json({ success: false, message: 'Error fetching soldier records.' });
    }
});

// 3. UPDATE SOLDIER RECORD ROUTE: Saves edits made from the AdminDashboard
// PUT: Update army personnel details by Admin using Army ID Switcher
app.put('/api/soldiers/:soldierId', async (req: Request, res: Response) => {
    try {
        const { soldierId } = req.params;
        const updateData = req.body;

        const updatedSoldier = await Soldier.findOneAndUpdate(
            { soldierId: soldierId }, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedSoldier) {
            return res.status(404).json({ success: false, message: 'Personnel record not found.' });
        }

        res.status(200).json({ success: true, message: 'Personnel details updated successfully!', data: updatedSoldier });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

app.get('/api/debug/users', async (req, res) => {
    try {
        // Access the native MongoDB collection directly to see all documents
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error("Database connection not established yet.");
        }
        
        // List collections or fetch directly from the 'users' or 'soldiers' collection
        // (Change 'users' below if your MongoDB collection has a different name)
        const allUsers = await db.collection('users').find({}).toArray();
        
        res.json({
            totalCount: allUsers.length,
            users: allUsers
        });
    } catch (err: unknown) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// 2. Add the generate-code route here with your other API routes
app.post('/api/soldiers/generate-code', async (req: Request, res: Response): Promise<any> => {
    try {
        const { soldierId } = req.body;

        if (!soldierId) {
            return res.status(400).json({ success: false, message: 'Soldier ID is required.' });
        }

        // Clean up the input string (removes accidental spaces)
        const cleanId = soldierId.trim();

        // Find the soldier in MongoDB by their soldierId field
        const soldier = await Soldier.findOne({ soldierId: cleanId });
        
        if (!soldier) {
            return res.status(404).json({ success: false, message: 'Target soldier ID not found.' });
        }

        // Generate a secure 6-character random access code
        const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Assign security fields
        soldier.activeAccessCode = accessCode;
        soldier.codeExpiresAt = new Date(Date.now() + 15 * 60000); // Expires in 15 mins
        soldier.isCodeUsed = false;

        // Fallback checks to prevent Mongoose validation errors on save if fields were omitted
        if (!soldier.careerField) soldier.careerField = 'Combat Operations';
        if (!soldier.mos) soldier.mos = '11B - Infantryman';
        if (!soldier.bloodType) soldier.bloodType = 'O+';
        if (!soldier.age) soldier.age = 59;

        // Save code details safely to the soldier's record
        await soldier.save();

        // Return the response directly to the admin interface
        return res.status(200).json({ 
            success: true, 
            code: accessCode, 
            message: 'Access code generated successfully.' 
        });
    } catch (error: unknown) {
        console.error('Code generation error:', error);
        return res.status(500).json({ success: false, message: 'Error generating clearance code.' });
    }
});

// 1. Strict Military Registration Route
app.post('/api/auth/register', async (req, res) => {
    try {
        const { soldierId, password, name, email } = req.body;

        // 1. Validate that the ID is one of the authorized admin IDs
        const allowedAdminIds = ['USA-7628-LG', 'USA-9942-SV'];
        if (!allowedAdminIds.includes(soldierId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Unauthorized ID. Registration is restricted to authorized personnel.' 
            });
        }

        // 2. Check if an account with this Soldier ID already exists
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not established.');
        }

        const existingUser = await db.collection('users').findOne({ soldierId });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'This Army ID has already been registered.' 
            });
        }

        // 3. Create the new admin user record
        const newUser = {
            soldierId,
            password, 
            name: name || 'Admin Officer',
            email: email || '',
            role: 'admin', 
            createdAt: new Date()
        };

        await db.collection('users').insertOne(newUser);

        res.status(201).json({
            success: true,
            message: 'Admin account registered successfully!',
            user: { soldierId: newUser.soldierId, name: newUser.name, role: newUser.role }
        });

    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// 2. Military Login Route (Fixed to use native collection like register)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { soldierId, password } = req.body;
        
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection not established.');
        }

        // Find user by Army ID using native collection
        const user = await db.collection('users').findOne({ soldierId });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Soldier ID or credentials.' });
        }

        // Direct comparison since password in DB is plain text
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Invalid Soldier ID or credentials.' });
        }

        res.json({
            success: true,
            message: 'Authentication successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                soldierId: user.soldierId,
                role: user.role
            }
        });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// The API endpoint that receives the picture from your Admin form
app.post('/api/soldiers/upload', upload.single('soldierImage'), async (req: any, res: any) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Creates a web URL pointing to the uploaded image on your server
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        res.status(200).json({ 
            success: true, 
            message: 'Image uploaded successfully!', 
            imageUrl: imageUrl 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during upload.' });
    }
});

// 1. VERIFY RECOVERY IDENTITY (Army ID + Gmail Check)
app.post('/api/verify', async (req: Request, res: Response) => {
    try {
        const { soldierId, accessCode } = req.body;

        const soldier = await Soldier.findOne({ 
            soldierId: soldierId.trim(), 
            activeAccessCode: accessCode.trim() 
        });

        if (!soldier) {
            return res.status(404).json({ 
                success: false, 
                message: 'Invalid Soldier ID or expired Access Code.' 
            });
        }

        // Optional: Check if code has expired (codeExpiresAt) or already been used (isCodeUsed)
        if (soldier.isCodeUsed || (soldier.codeExpiresAt && new Date() > new Date(soldier.codeExpiresAt))) {
            return res.status(400).json({ 
                success: false, 
                message: 'This access code has already been used or has expired.' 
            });
        }

        // Optional: Mark code as used so it cannot be reused
        soldier.isCodeUsed = true;
        await soldier.save();

        res.status(200).json({ 
            success: true, 
            soldier 
        });
    } catch (error: unknown) {
        res.status(500).json({ success: false, message: 'Server error during verification.' });
    }
});


// 2. UPDATE PASSWORD ROUTE (Saves the new password permanently)
app.post('/api/auth/update-password', async (req: Request, res: Response) => {
    try {
        const { soldierId, newPassword } = req.body;

        const soldier = await Soldier.findOne({ soldierId: soldierId.trim() });
        if (!soldier) {
            return res.status(404).json({ success: false, message: 'Soldier record not found.' });
        }

        // Save the new password (note: in production, ensure you hash passwords using bcrypt)
        soldier.password = newPassword;
        await soldier.save();

        res.status(200).json({ 
            success: true, 
            message: 'Password successfully updated in database.' 
        });
    } catch (error: unknown) {
        res.status(500).json({ success: false, message: 'Server error updating password.' });
    }
});

// GET: Fetch all blog posts
app.get('/api/blog/posts', async (req, res) => {
    try {
        const posts = await BlogPost.find({}).sort({ date: -1 });
        res.json({ success: true, posts });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// POST: Create a new blog post (Protected for Admins)
app.post('/api/blog/posts', async (req, res) => {
    try {
        const { title, category, content, author, clearanceLevel, soldierId } = req.body;

        // Optional security check: Ensure only admin IDs can post
        const allowedAdminIds = ['USA-7628-LG', 'USA-9942-SV'];
        if (!allowedAdminIds.includes(soldierId)) {
            return res.status(403).json({ success: false, message: 'Unauthorized: Admin clearance required to broadcast dispatches.' });
        }

        const newPost = new BlogPost({
            title,
            category,
            content,
            author: author || 'COMMAND HQ',
            clearanceLevel: clearanceLevel || 'RESTRICTED'
        });

        await newPost.save();
        res.status(201).json({ success: true, message: 'Dispatch broadcasted successfully.', post: newPost });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// GET: Fetch individual soldier profile strictly by their unique Army ID code
app.get('/api/soldiers/verify/:soldierId', async (req: Request, res: Response): Promise<any> => {
    try {
        const { soldierId } = req.params;
        const soldier = await Soldier.findOne({ soldierId: soldierId });

        if (!soldier) {
            return res.status(404).json({ success: false, message: 'Invalid Army ID code. Record not found.' });
        }

        res.status(200).json({ success: true, data: soldier });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// POST: Verify and fetch soldier details using BOTH Army ID and Access Code
app.post('/api/soldiers/verify-secure', async (req: Request, res: Response): Promise<any> => {
    try {
        const { soldierId, accessCode } = req.body;

        // Searches for a record where BOTH match
        const soldier = await Soldier.findOne({ 
            soldierId: soldierId.trim(), 
            accessCode: accessCode.trim() 
        });

        if (!soldier) {
            return res.status(404).json({ 
                success: false, 
                message: 'Invalid Army ID or access code combination. Verification failed.' 
            });
        }

        res.status(200).json({ success: true, data: soldier });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// 5. SECURE VERIFICATION ROUTE: Checks the single-use access code, verifies expiration, and burns it
app.post('/api/soldiers/verify-secure', async (req: Request, res: Response): Promise<any> => {
    try {
        const { soldierId, accessCode } = req.body;

        // Find the soldier by their unique Army ID
        const soldier = await Soldier.findOne({ soldierId: soldierId.trim() });

        if (!soldier) {
            return res.status(404).json({ success: false, message: 'Invalid Army ID.' });
        }

        // Check if the code matches either the permanent accessCode OR the active single-use code
        const isValidCode = (soldier.accessCode === accessCode) || 
                            (soldier.activeAccessCode === accessCode && !soldier.isCodeUsed);

        if (!isValidCode) {
            return res.status(400).json({ success: false, message: 'Invalid access code.' });
        }

        // If it's the temporary active code, check expiration and burn it
        if (soldier.activeAccessCode === accessCode) {
            if (soldier.codeExpiresAt && new Date() > new Date(soldier.codeExpiresAt)) {
                return res.status(400).json({ success: false, message: 'Access code has expired.' });
            }

            // Burn the code so it can never be used again
            soldier.isCodeUsed = true;
            soldier.activeAccessCode = null;
            await soldier.save();
        }

        // Verification successful, return the soldier's details
        res.status(200).json({ success: true, data: soldier });
    } catch (err: unknown) {
        res.status(500).json({ success: false, error: (err as Error).message });
    }
});

// 2. The POST route that matches your frontend fetch call
app.post('/api/support/messages', async (req: Request, res: Response): Promise<any> => {
    try {
        let { ticketId, soldierId, message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message content is required.' });
        }

        let ticket;

        // If no ticketId exists yet, create a brand new session/ticket
        if (!ticketId) {
            ticketId = 'TICK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
            ticket = new SupportTicket({
                ticketId,
                soldierId: soldierId || 'ANONYMOUS',
                messages: [
                    { sender: 'ai', text: 'Secure U.S. Army Support line active. How can we assist your verification inquiry?' },
                    { sender: 'user', text: message }
                ]
            });
        } else {
            // Find existing ticket and push the new user message
            ticket = await SupportTicket.findOne({ ticketId });
            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Support session not found.' });
            }
            ticket.messages.push({ sender: 'user', text: message });
        }

        await ticket.save();

        // Return success along with the full message history so the UI syncs up
        return res.status(200).json({
            success: true,
            ticketId: ticket.ticketId,
            messages: ticket.messages
        });

    } catch (error: unknown) {
        console.error('Support dispatch error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// 3. GET route to populate your Admin Live Support Messages Queue (Section 2 on your Dashboard)
app.get('/api/support/messages', async (req: Request, res: Response): Promise<any> => {
    try {
        const tickets = await SupportTicket.find().sort({ 'messages.timestamp': -1 });
        res.status(200).json(tickets);
    } catch (error: unknown) {
        res.status(500).json({ success: false, message: 'Failed to retrieve support queue.' });
    }
});


// 1. Fetch all support tickets for the admin queue
app.get('/api/support/admin/tickets', async (req: Request, res: Response): Promise<any> => {
    try {
        const tickets = await SupportTicket.find().sort({ 'messages.timestamp': -1 });
        return res.status(200).json({ success: true, tickets });
    } catch (error: unknown) {
        console.error('Error fetching admin tickets:', error);
        return res.status(500).json({ success: false, message: 'Failed to load tickets.' });
    }
});

// 2. Handle admin reply submission
app.post('/api/support/admin/reply', async (req: Request, res: Response): Promise<any> => {
    try {
        const { ticketId, replyText } = req.body;

        if (!ticketId || !replyText) {
            return res.status(400).json({ success: false, message: 'Ticket ID and reply text are required.' });
        }

        const ticket = await SupportTicket.findOne({ ticketId });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Support ticket not found.' });
        }

        // Push the admin message into the thread history
        ticket.messages.push({
            sender: 'admin',
            text: replyText,
            timestamp: new Date()
        });

        await ticket.save();

        return res.status(200).json({ success: true, message: 'Reply sent successfully.' });
    } catch (error: unknown) {
        console.error('Admin reply dispatch error:', error);
        return res.status(500).json({ success: false, message: 'Error submitting reply.' });
    }
});
// Global Express Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error("--- EXPRESS GLOBAL ERROR CAUGHT ---");
    console.error(err.stack || err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error', 
        error: err.message 
    });
});

// Update Soldier Certificate Route (Admin)
app.put('/api/soldiers/:id/certificate', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { certificate } = req.body;

        const updatedSoldier = await Soldier.findByIdAndUpdate(
            id,
            { $set: { certificate } },
            { new: true, runValidators: true }
        );

        if (!updatedSoldier) {
            return res.status(404).json({ success: false, message: 'Soldier record not found.' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Certificate updated successfully.',
            soldier: updatedSoldier 
        });
    } catch (error: unknown) {
        console.error('Certificate update error:', error);
        return res.status(500).json({ success: false, message: 'Error updating certificate record.' });
    }
});

// Update soldier profile route (handles general details & custom fields)
app.put('/api/soldiers/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params; // Can be _id or soldierId depending on your setup
        
        // Find and update the soldier record
        const updatedSoldier = await Soldier.findOneAndUpdate(
            { $or: [{ _id: id }, { soldierId: id }] },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedSoldier) {
            return res.status(404).json({ success: false, message: 'Soldier record not found.' });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Personnel record updated successfully.',
            data: updatedSoldier 
        });
    } catch (error: unknown) {
        console.error('Update error:', error);
        return res.status(500).json({ success: false, message: 'Server error during update.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
